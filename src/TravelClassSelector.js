import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const TravelClassSelectorMenu = props => {
  return (
    <div className="dropdown-menu">
      <a
        className="dropdown-item"
        style={
          props.travel.class == 'Economy'
            ? { backgroundColor: 'rgb(217, 225, 232)' }
            : null
        }
        href="#"
        onClick={() =>
          props.setTravel(
            { travel_id: props.travel.id, field: 'class' },
            'Economy'
          )
        }
      >
        Economy
      </a>
      <a
        href="#"
        className="dropdown-item"
        style={
          props.travel.class == 'Premium Economy'
            ? { backgroundColor: 'rgb(217, 225, 232)' }
            : null
        }
        onClick={() =>
          props.setTravel(
            { travel_id: props.travel.id, field: 'class' },
            'Premium Economy'
          )
        }
      >
        Premium Economy
      </a>
      <a
        href="#"
        className="dropdown-item"
        style={
          props.travel.class == 'Bussines'
            ? { backgroundColor: 'rgb(217, 225, 232)' }
            : null
        }
        onClick={() =>
          props.setTravel(
            { travel_id: props.travel.id, field: 'class' },
            'Bussines'
          )
        }
      >
        Bussines
      </a>
      <a
        href="#"
        className="dropdown-item"
        style={
          props.travel.class == 'First'
            ? { backgroundColor: 'rgb(217, 225, 232)' }
            : null
        }
        onClick={() =>
          props.setTravel(
            { travel_id: props.travel.id, field: 'class' },
            'First'
          )
        }
      >
        First
      </a>
      <a
        href="#"
        className="dropdown-item"
        style={
          props.travel.class == 'Multiple'
            ? { backgroundColor: 'rgb(217, 225, 232)' }
            : null
        }
        onClick={() =>
          props.setTravel(
            { travel_id: props.travel.id, field: 'class' },
            'Multiple'
          )
        }
      >
        Multiple
      </a>
    </div>
  );
};

const TravelClassSelector = props => {
  return (
    <Fragment>
      {props.flight_type == 'Multi-city' ? (
        <div className="class-selector">
          <button
            type="button"
            className="btn-custom"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {props.travel.class}
          </button>
          <TravelClassSelectorMenu
            travel={props.travel}
            setTravel={props.setTravel}
          />
        </div>
      ) : (
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            data-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {props.travel.class}
          </a>
          <TravelClassSelectorMenu
            travel={props.travel}
            setTravel={props.setTravel}
          />
        </li>
      )}
    </Fragment>
  );
};

TravelClassSelector.propTypes = {
  travel: PropTypes.object.isRequired,
  setTravel: PropTypes.func.isRequired,
  flight_type: PropTypes.string.isRequired
};

TravelClassSelectorMenu.propTypes = {
  travel: PropTypes.object.isRequired,
  setTravel: PropTypes.func.isRequired
};

export default TravelClassSelector;
