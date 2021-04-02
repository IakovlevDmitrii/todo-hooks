import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

const NewTaskForm = ({ onTaskAdded }) => {
  const [taskText, setTaskText] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const onSubmit = (event) => {
    if (taskText && minutes >= 0 && seconds >= 0) {
      const timeLeft = +minutes * 60 + +seconds;

      onTaskAdded(taskText, timeLeft);

      setTaskText('');
      setMinutes('');
      setSeconds('');
    }

    event.preventDefault();
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input
          className="new-todo"
          type="text"
          value={taskText}
          onChange={(event) => setTaskText(event.target.value)}
          placeholder="Task"
        />
        <input
          className="new-todo-form__timer"
          type="number"
          value={minutes}
          onChange={(event) => setMinutes(event.target.value)}
          placeholder="Min"
        />
        <input
          className="new-todo-form__timer"
          type="number"
          value={seconds}
          onChange={(event) => setSeconds(event.target.value)}
          placeholder="Sec"
        />
        <input className="task-submit" type="submit" value="" />
      </form>
    </header>
  );
};

NewTaskForm.propTypes = {
  onTaskAdded: PropTypes.func.isRequired,
};

export default NewTaskForm;
