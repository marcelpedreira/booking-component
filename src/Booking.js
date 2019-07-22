import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PassengersSelector from './PassengersSelector';
import FlightTypeSelector from './FlightTypeSelector';
import TravelClassSelector from './TravelClassSelector';
import Travel from './Travel';
import './Booking.css';

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flight_type: 'Round-trip',
      passengers_selector: {
        title: '1 Adult',
        error_message: ''
      },
      passengers: {
        adults: 1,
        seniors: 0,
        youth: 0,
        child: 0,
        seat_infant: 0,
        lap_infant: 0
      },
      travels: [
        {
          id: Math.floor(Math.random() * 1000),
          class: 'Economy',
          origin: '',
          destination: '',
          departure_date: new Date(),
          return_date: new Date()
        }
      ],
      destinations_inverted: false
    };
  }

  // Passenger operations
  // Receive a new passenger count and update the state after validations
  updatePassengers = value => {
    this.setState(prevState => {
      const passengers = Object.assign({}, prevState.passengers, value);
      const {
        adults,
        seniors,
        youth,
        child,
        seat_infant,
        lap_infant
      } = passengers;
      const total_adults = adults + seniors;
      const total_childs = youth + child + seat_infant + lap_infant;
      const total = total_adults + total_childs;
      if (total > 16) {
        const passengers_selector = Object.assign(
          {},
          prevState.passengers_selector,
          { error_message: 'Searches cannot have more than 16 travelers' }
        );
        return {
          passengers_selector
        };
      }
      if (total === 0) {
        const passengers_selector = Object.assign(
          {},
          prevState.passengers_selector,
          { error_message: 'Searches need at least 1 traveler' }
        );
        return {
          passengers_selector
        };
      }
      if (total_adults > 9) {
        const passengers_selector = Object.assign(
          {},
          prevState.passengers_selector,
          { error_message: 'Searches cannot have more than 9 adults' }
        );
        return {
          passengers_selector
        };
      }
      if (total_childs > 7) {
        const passengers_selector = Object.assign(
          {},
          prevState.passengers_selector,
          { error_message: 'Searches cannot have more than 7 children' }
        );
        return {
          passengers_selector
        };
      }

      if (total_adults < lap_infant) {
        const passengers_selector = Object.assign(
          {},
          prevState.passengers_selector,
          { error_message: 'Searches cannot have more lap infants than adults' }
        );
        return {
          passengers_selector
        };
      }

      if (total_adults < 1) {
        const passengers_selector = Object.assign(
          {},
          prevState.passengers_selector,
          {
            error_message: 'KAYAK cannot run searches for unaccompanied minors'
          }
        );
        return {
          passengers_selector
        };
      }
      let title;
      if (adults === 1 && total_childs + seniors === 0) title = '1 Adult';
      else if (seniors === 1 && total_childs + adults === 0) title = '1 Senior';
      else title = `${total} Travellers`;
      const passengers_selector = Object.assign(
        {},
        prevState.passengers_selector,
        { title, error_message: '' }
      );
      return { passengers, passengers_selector };
    });
  };

  // Event triggered from PassengerSelector component when a passenger count is changed
  // Receive the passenger type and the new passenger count and call
  // UpdatePassenger function to update the state after validations
  setPassengers = (type, value) => {
    if (value < 0) return;
    switch (type) {
      case 'adult':
        this.updatePassengers({ adults: value });
        break;

      case 'senior':
        this.updatePassengers({ seniors: value });
        break;

      case 'youth':
        this.updatePassengers({ youth: value });
        break;

      case 'child':
        this.updatePassengers({ child: value });
        break;

      case 'seat_infant':
        this.updatePassengers({ seat_infant: value });
        break;

      case 'lap_infant':
        this.updatePassengers({ lap_infant: value });
        break;

      default:
        this.updatePassengers({ adults: value });
        break;
    }
  };

  // Event triggered from FlightTypeSelector component when the flight type is changed
  // Receive the new flight type and update the state
  setFlightType = flight_type => {
    this.setState(prevState => {
      if (prevState.flight_type == flight_type) return prevState;
      if (flight_type == 'Multi-city') {
        const travels = [
          ...prevState.travels,
          this.generateTravel(),
          this.generateTravel()
        ];
        return { flight_type, travels };
      }
      if (prevState.flight_type == 'Multi-city') {
        const travels = [this.generateTravel()];
        return { flight_type, travels };
      }
      return { flight_type };
    });
  };

  // Travel operations
  generateTravel = () => ({
    id: Math.floor(Math.random() * 1000),
    class: 'Economy',
    origin: '',
    destination: '',
    departure_date: new Date(),
    return_date: new Date()
  });

  // Event triggered from Travel component when a travel is changed
  // It's triggered from TravelClassSelector component too when
  // the travel class is changed and the flight type is not setted to Multi-city
  // Receive the travel id, the field to be changed and the new value
  setTravel = ({ travel_id, field }, value) => {
    this.setState(prevState => {
      const index = prevState.travels.findIndex(
        travel => travel.id == travel_id
      );

      const newTravel = { ...prevState.travels[index] };
      newTravel[field] = value;

      const travels = [
        ...prevState.travels.slice(0, index),
        newTravel,
        ...prevState.travels.slice(index + 1, prevState.travels.length)
      ];

      return { travels };
    });
  };

  // Event triggered from Travel component when SW button is pressed
  // Receive the travel id and update the state after required modification
  swapTravelDestinations = travel_id => {
    this.setState(prevState => {
      const destinations_inverted = !prevState.destinations_inverted;

      const index = prevState.travels.findIndex(
        travel => travel.id == travel_id
      );

      const newTravel = Object.assign({}, prevState.travels[index], {
        origin: prevState.travels[index].destination,
        destination: prevState.travels[index].origin
      });

      const travels = [
        ...prevState.travels.slice(0, index),
        newTravel,
        ...prevState.travels.slice(index + 1, prevState.travels.length)
      ];

      return { travels, destinations_inverted };
    });
  };

  // Callback for onClick event of the Add travel button
  // Generate a blank travel and add it to the state.
  addTravel = () => {
    this.setState(prevState => {
      if (prevState.travels.length == 6) return prevState;
      const travels = [...prevState.travels, this.generateTravel()];

      return { travels };
    });
  };

  // Event triggered from Travel component when Delete button is pressed
  // Receive the travel id and update the state after required modification
  removeTravel = travel_id => {
    this.setState(prevState => {
      if (prevState.travels.length == 1) return prevState;
      const index = prevState.travels.findIndex(
        travel => travel.id == travel_id
      );

      const travels = [
        ...prevState.travels.slice(0, index),
        ...prevState.travels.slice(index + 1, prevState.travels.length)
      ];

      return { travels };
    });
  };

  // Callback for onClick event of the clear all button
  // Update the state with blank travels
  clearAll = () => {
    this.setState(prevState => {
      const travels = prevState.travels.map(this.generateTravel);
      return { travels };
    });
  };

  // Callback for onClick event of the Go button
  onSubmit = () => {
    console.log(this.state);
  };

  render() {
    return (
      <div className="container">
        <h3 style={{ padding: '10px 0 10px 0' }}>{this.props.title}</h3>

        {/* Navbar */}
        <ul className="nav">
          <FlightTypeSelector
            setFlightType={this.setFlightType}
            flight_type={this.state.flight_type}
          />

          <PassengersSelector
            setPassengers={this.setPassengers}
            passengers={this.state.passengers}
            title={this.state.passengers_selector.title}
            error_message={this.state.passengers_selector.error_message}
          />

          {this.state.flight_type != 'Multi-city' ? (
            <TravelClassSelector
              flight_type={this.state.flight_type}
              setTravel={this.setTravel}
              travel={this.state.travels[0]}
            />
          ) : null}
        </ul>

        {/* Travels container */}

        {this.state.travels.map(travel => (
          <Travel
            key={travel.id}
            travel={travel}
            flight_type={this.state.flight_type}
            destinations_inverted={this.state.destinations_inverted}
            onDelete={this.removeTravel}
            onChange={this.setTravel}
            onSwapDestinations={this.swapTravelDestinations}
            onSubmit={this.onSubmit}
          />
        ))}

        {this.state.flight_type == 'Multi-city' ? (
          <div className="row">
            <div className="col-md-11">
              <div className="row">
                <div className="col-md-3">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={this.addTravel}
                  >
                    + Add another flight
                  </button>
                </div>
                <div className="col-md-3">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={this.clearAll}
                  >
                    clear all
                  </button>
                </div>
                <div className="col-md-3 offset-3">
                  <button
                    type="button"
                    className="btn-custom btn-submit"
                    onClick={() => this.onSubmit()}
                  >
                    <span>
                      <svg className="icon">
                        <use
                          xlinkHref="/open-iconic/sprite/open-iconic.svg#magnifying-glass"
                          className="icon-magnifying-glass"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

Booking.propTypes = {
  title: PropTypes.string.isRequired
};

export default Booking;
