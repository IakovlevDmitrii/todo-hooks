import React from 'react';
import PropTypes from 'prop-types';

const TasksFilter = ({ filter, onFilterChange }) => {
  let buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  buttons = buttons.map(({ name, label }) => {
    const isActive = filter === name;

    return (
      <li key={name}>
        <button className={isActive ? 'selected' : null} onClick={() => onFilterChange(name)} type="button">
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{buttons}</ul>;
};

TasksFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default TasksFilter;
