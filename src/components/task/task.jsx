import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Since from '../since';
import Timer from '../timer/timer';

const Task = ({ onTaskDeleted, onTaskTextEdited, onToggleCompleted, task }) => {
  const { id, taskText, startTime, isCompleted, timeLeft } = task;

  const [editedText, setEditedText] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEditedText(taskText);
    return () => setEditedText(taskText);
  }, [taskText]);

  const onSubmit = (event) => {
    if (editedText) {
      onTaskTextEdited(id, editedText);
      setIsEditing(false);
    }
    event.preventDefault();
  };

  function getTaskClassName() {
    if (isEditing) return 'editing';
    if (isCompleted) return 'completed';

    return null;
  }

  return (
    <li className={getTaskClassName()}>
      <div className="view">
        <input className="toggle" onChange={onToggleCompleted} checked={isCompleted} type="checkbox" />
        <label>
          <span className="title">{taskText}</span>
          <Timer id={id} timeLeft={timeLeft} />
          <Since startTime={startTime} id={id} className="completed" />
        </label>
        <button className="icon icon-edit" onClick={() => setIsEditing(true)} type="button" aria-label="Edit button" />
        <button className="icon icon-destroy" onClick={onTaskDeleted} type="button" aria-label="Destroy button" />
      </div>
      <form onSubmit={onSubmit}>
        <input
          className="edit"
          value={editedText}
          type="text"
          onChange={(event) => setEditedText(event.target.value)}
        />
      </form>
    </li>
  );
};

Task.propTypes = {
  onTaskDeleted: PropTypes.func.isRequired,
  onTaskTextEdited: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    startTime: PropTypes.instanceOf(Date).isRequired,
    taskText: PropTypes.string.isRequired,
    timeLeft: PropTypes.number.isRequired,
  }).isRequired,
};

export default Task;
