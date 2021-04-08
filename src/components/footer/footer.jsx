import React from 'react';
import PropTypes from 'prop-types';
import TasksFilter from '../tasks-filter';

const Footer = ({ tasksLeft, onFilterChange, onDeleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count"> {tasksLeft} tasks left </span>
      <TasksFilter onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={onDeleted} type="button">
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  tasksLeft: PropTypes.number.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
};

export default Footer;
