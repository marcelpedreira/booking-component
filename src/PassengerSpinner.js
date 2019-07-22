import React from 'react';
import PropTypes from 'prop-types';
import './PassengerSpinner.css';

const button_style = {
  width: '1.2rem',
  height: '100%',
  display: 'inline-block',
  padding: 0,
  borderWidth: 0,
  backgroundColor: 'rgb(241, 244, 247)',
  color: 'blue',
  fontWeight: 'bold'
};

const PassengerSpinner = props => {
  const { setPassengers, passengers_count, passenger_type } = props;
  return (
    <div className="spinner-group">
      <button
        type="button"
        className="spinner-button"
        onClick={() => setPassengers(passenger_type, passengers_count - 1)}
      >
        -
      </button>

      <div className="px-3" style={{ display: 'inline-block', height: '100%' }}>
        {passengers_count}
      </div>

      <button
        type="button"
        className="spinner-button"
        onClick={() => setPassengers(passenger_type, passengers_count + 1)}
      >
        +
      </button>
    </div>
  );
};

export default PassengerSpinner;

PassengerSpinner.propTypes = {
  passengers_count: PropTypes.number.isRequired,
  passenger_type: PropTypes.string.isRequired,
  setPassengers: PropTypes.func.isRequired
};
