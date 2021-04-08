import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { filterContext } from '../context/filter-context/filter-context';

const TasksFilter = ({ onFilterChange }) => {
  const filter = useContext(filterContext);

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
  onFilterChange: PropTypes.func.isRequired,
};

export default TasksFilter;
