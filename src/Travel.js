import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import Autosuggest from 'react-autosuggest';

import 'react-datepicker/dist/react-datepicker.css';
import './Travel.css';
import TravelClassSelector from './TravelClassSelector';
import { destinations } from './destinations.json';

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : destinations.filter(
        destination =>
          destination.city.toLowerCase().slice(0, inputLength) === inputValue
      );
};

const getSuggestionValue = suggestion =>
  `${suggestion.city} (${suggestion.id})`;

const renderSuggestion = suggestion => (
  <div>{`${suggestion.city.toUpperCase()} (${suggestion.state}) ${
    suggestion.airport
  }`}</div>
);

class Travel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      origin_focused: false,
      destination_focused: false
    };
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const {
      travel,
      flight_type,
      onDelete,
      onChange,
      onSubmit,
      onSwapDestinations,
      destinations_inverted
    } = this.props;

    const onDepartureDateChange = date => {
      if (date < new Date()) return;
      onChange({ travel_id: travel.id, field: 'departure_date' }, date);
    };

    const onReturnDateChange = date => {
      if (date < new Date()) return;
      onChange({ travel_id: travel.id, field: 'return_date' }, date);
    };

    const onOriginChange = (event, { newValue }) => {
      onChange({ travel_id: travel.id, field: 'origin' }, newValue);
    };

    const onDestinationChange = (event, { newValue }) => {
      onChange({ travel_id: travel.id, field: 'destination' }, newValue);
    };

    const { suggestions } = this.state;

    const originProps = {
      placeholder: 'From?',
      value: travel.origin,
      onChange: onOriginChange
    };

    const destinationProps = {
      placeholder: 'To?',
      value: travel.destination,
      onChange: onDestinationChange
    };

    return (
      <div className="travel-container">
        <div className="row">
          {/*
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              @
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
      */}

          <div className="col-md-12 col-lg-11">
            <div className="row">
              <div
                className={
                  flight_type == 'One-way'
                    ? 'col-md-12 col-lg-9'
                    : 'col-md-12 col-lg-6'
                }
              >
                <div className="row">
                  <div
                    className={
                      flight_type == 'Multi-city'
                        ? 'col-md-6 col-12'
                        : 'col-md-5 col-12'
                    }
                  >
                    <Autosuggest
                      suggestions={suggestions}
                      onSuggestionsFetchRequested={
                        this.onSuggestionsFetchRequested
                      }
                      onSuggestionsClearRequested={
                        this.onSuggestionsClearRequested
                      }
                      getSuggestionValue={getSuggestionValue}
                      renderSuggestion={renderSuggestion}
                      inputProps={originProps}
                    />
                  </div>
                  {flight_type != 'Multi-city' ? (
                    <div className="col-md-2 col-12">
                      <button
                        type="button"
                        className={
                          destinations_inverted
                            ? 'btn-custom btn-swap btn-swap-inverted'
                            : 'btn-custom btn-swap'
                        }
                        onClick={() => onSwapDestinations(travel.id)}
                      >
                        <svg className="icon">
                          <use
                            xlinkHref="/open-iconic/sprite/open-iconic.svg#loop"
                            className="icon-loop"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : null}
                  <div
                    className={
                      flight_type == 'Multi-city'
                        ? 'col-md-6 col-12'
                        : 'col-md-5 col-12'
                    }
                  >
                    <Autosuggest
                      suggestions={suggestions}
                      onSuggestionsFetchRequested={
                        this.onSuggestionsFetchRequested
                      }
                      onSuggestionsClearRequested={
                        this.onSuggestionsClearRequested
                      }
                      getSuggestionValue={getSuggestionValue}
                      renderSuggestion={renderSuggestion}
                      inputProps={destinationProps}
                    />
                  </div>
                </div>
              </div>

              {flight_type == 'Round-trip' ? (
                <div className="col-lg-6 col-md-12">
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <DatePicker
                        selected={travel.departure_date}
                        onChange={onDepartureDateChange}
                      />
                    </div>
                    <div className="col-md-6 col-12">
                      <DatePicker
                        selected={travel.return_date}
                        onChange={onReturnDateChange}
                      />
                    </div>
                  </div>
                </div>
              ) : null}

              {flight_type == 'One-way' ? (
                <div className="col-lg-3 col-12">
                  <DatePicker
                    selected={travel.departure_date}
                    onChange={onDepartureDateChange}
                  />
                </div>
              ) : null}

              {flight_type == 'Multi-city' ? (
                <div className="col-lg-6 col-12">
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <DatePicker
                        selected={travel.departure_date}
                        onChange={onDepartureDateChange}
                      />
                    </div>
                    <div className="col-md-6 col-12">
                      <TravelClassSelector
                        flight_type={flight_type}
                        setTravel={onChange}
                        travel={travel}
                      />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="col-md-12 col-lg-1">
            {flight_type == 'Multi-city' ? (
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={() => onDelete(travel.id)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            ) : (
              <button
                type="button"
                className="btn-custom btn-submit"
                onClick={() => onSubmit()}
              >
                <svg className="icon">
                  <use
                    xlinkHref="/open-iconic/sprite/open-iconic.svg#magnifying-glass"
                    className="icon-magnifying-glass"
                  />
                </svg>
              </button>
            )}
          </div>

          {/*
        
          */}
        </div>
      </div>
    );
  }
}

Travel.propTypes = {
  travel: PropTypes.object.isRequired,
  flight_type: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  onSwapDestinations: PropTypes.func
};

export default Travel;
