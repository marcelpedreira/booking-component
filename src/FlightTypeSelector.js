import React from 'react';
import PropTypes from 'prop-types';

const FlightTypeSelector = props => {
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
        {props.flight_type}
      </a>
      <div className="dropdown-menu">
        <a
          href="#"
          className="dropdown-item"
          style={
            props.flight_type == 'Round-trip'
              ? { backgroundColor: 'rgb(217, 225, 232)' }
              : null
          }
          onClick={() => props.setFlightType('Round-trip')}
        >
          Round-trip
        </a>
        <a
          href="#"
          className="dropdown-item"
          style={
            props.flight_type == 'One-way'
              ? { backgroundColor: 'rgb(217, 225, 232)' }
              : null
          }
          onClick={() => props.setFlightType('One-way')}
        >
          One-way
        </a>
        <a
          href="#"
          className="dropdown-item"
          style={
            props.flight_type == 'Multi-city'
              ? { backgroundColor: 'rgb(217, 225, 232)' }
              : null
          }
          onClick={() => props.setFlightType('Multi-city')}
        >
          Multi-city
        </a>
      </div>
    </li>
  );
};

FlightTypeSelector.propTypes = {
  flight_type: PropTypes.string.isRequired,
  setFlightType: PropTypes.func.isRequired
};

export default FlightTypeSelector;
