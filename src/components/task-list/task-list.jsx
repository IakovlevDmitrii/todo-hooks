import React from 'react';
import PropTypes from 'prop-types';
import Task from '../task';

const TaskList = ({ tasks, onPlayClick, onTaskDeleted, onTaskTextEdited, onToggleCompleted }) => {
  const tasksList = tasks.map((task) => {
    const { id } = task;
    return (
      <Task
        key={id}
        task={task}
        onPlayClick={onPlayClick}
        onTaskDeleted={() => onTaskDeleted(id)}
        onTaskTextEdited={onTaskTextEdited}
        onToggleCompleted={() => onToggleCompleted(id)}
      />
    );
  });

  return <ul className="todo-list">{tasksList}</ul>;
};

TaskList.propTypes = {
  onPlayClick: PropTypes.func.isRequired,
  onTaskDeleted: PropTypes.func.isRequired,
  onTaskTextEdited: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      isCompleted: PropTypes.bool.isRequired,
      startTime: PropTypes.instanceOf(Date).isRequired,
      taskText: PropTypes.string.isRequired,
      timeLeft: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};

export default TaskList;
