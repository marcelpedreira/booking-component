import React from 'react';
import PropTypes from 'prop-types';
import PassengerSpinner from './PassengerSpinner';
import './PassengerSelector.css';

const PassengersSelector = props => {
  const { setPassengers, passengers, title, error_message } = props;
  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        data-toggle="dropdown"
        href="#"
        role="button"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {title}
      </a>
      <div className="dropdown-menu">
        <form className="passenger-selector">
          <div className="passenger-row">
            <div className="passenger-label">
              <p style={{ marginBottom: 0 }}>
                Adults
                <small className="text-muted"> 18-64</small>
              </p>
            </div>

            <PassengerSpinner
              passenger_type="adult"
              setPassengers={setPassengers}
              passengers_count={passengers.adults}
            />
          </div>
          <div className="passenger-row">
            <div className="passenger-label">
              <p style={{ marginBottom: 0 }}>
                Seniors
                <small className="text-muted"> 65+</small>
              </p>
            </div>

            <PassengerSpinner
              passenger_type="senior"
              setPassengers={setPassengers}
              passengers_count={passengers.seniors}
            />
          </div>
          <div className="passenger-row">
            <div className="passenger-label">
              <p style={{ marginBottom: 0 }}>
                Youth
                <small className="text-muted"> 12-17</small>
              </p>
            </div>

            <PassengerSpinner
              passenger_type="youth"
              setPassengers={setPassengers}
              passengers_count={passengers.youth}
            />
          </div>
          <div className="passenger-row">
            <div className="passenger-label">
              <p style={{ marginBottom: 0 }}>
                Child
                <small className="text-muted"> 2-11</small>
              </p>
            </div>

            <PassengerSpinner
              passenger_type="child"
              setPassengers={setPassengers}
              passengers_count={passengers.child}
            />
          </div>
          <div className="passenger-row">
            <div className="passenger-label">
              <p style={{ marginBottom: 0 }}>
                Seat Infant
                <small className="text-muted"> under 2</small>
              </p>
            </div>

            <PassengerSpinner
              passenger_type="seat_infant"
              setPassengers={setPassengers}
              passengers_count={passengers.seat_infant}
            />
          </div>
          <div className="passenger-row">
            <div className="passenger-label">
              <p style={{ marginBottom: 0 }}>
                Lap Infant
                <small className="text-muted"> under 2</small>
              </p>
            </div>

            <PassengerSpinner
              passenger_type="lap_infant"
              setPassengers={setPassengers}
              passengers_count={passengers.lap_infant}
            />
          </div>
          {error_message !== '' ? <div className="dropdown-divider" /> : null}
          <div style={{ color: 'red' }}>{error_message}</div>
        </form>
      </div>
    </li>
  );
};

PassengersSelector.propTypes = {
  setPassengers: PropTypes.func.isRequired,
  passengers: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  error_message: PropTypes.string.isRequired
};

export default PassengersSelector;
