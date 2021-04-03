import React, { useState } from 'react';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

import filterTasks from '../../utils/filter-tasks';

import '../../style.css';

let nextId = 1;

const App = () => {
  // const timerList = [];

  // function createTask(taskText, timeLeft) {
  function createTask(taskText) {
    const id = nextId;
    nextId += 1;

    return {
      id,
      isCompleted: false,
      // isTimerStopped: true,
      startTime: new Date(),
      taskText,
      // timeLeft,
      timeLeft: 100,
    };
  }

  // const [tasks, setTasks] = useState([createTask('First', 60), createTask('Second', 60), createTask('Third', 60)]);
  const [tasks, setTasks] = useState([createTask('First'), createTask('Second'), createTask('Third')]);

  const [filter, setFilter] = useState('all');

  function getTaskIndexById(id) {
    return tasks.findIndex((task) => task.id === id);
  }

  function deleteTask(id) {
    setTasks(() => {
      const index = getTaskIndexById(id);
      // const oldTask = tasks[index];
      // const { isTimerStopped } = oldTask;
      //
      // if (!isTimerStopped) {
      //   clearInterval(timerList[id]);
      // }

      return [...tasks.slice(0, index), ...tasks.slice(index + 1)];
    });
  }

  // function addTask(taskText, timeLeft) {
  //   const newTask = createTask(taskText, timeLeft);
  //   setTasks(() => [...tasks, newTask]);
  // }
  function addTask(taskText) {
    const newTask = createTask(taskText);

    setTasks(() => [...tasks, newTask]);
  }

  function editTaskText(id, taskText) {
    setTasks(() => {
      const index = getTaskIndexById(id);
      const oldTask = tasks[index];
      const newTask = { ...oldTask, taskText };

      return [...tasks.slice(0, index), newTask, ...tasks.slice(index + 1)];
    });
  }

  function onToggleCompleted(id) {
    setTasks(() => {
      const index = getTaskIndexById(id);
      const oldTask = tasks[index];
      const newTask = { ...oldTask, isCompleted: !oldTask.isCompleted };

      return [...tasks.slice(0, index), newTask, ...tasks.slice(index + 1)];
    });
  }

  // function reduceTimeLeft(id) {
  //   setTasks(() => {
  //     const index = getTaskIndexById(id);
  //     const oldTask = tasks[index];
  //
  //     let { timeLeft } = oldTask;
  //     timeLeft -= 1;
  //
  //     if (timeLeft === 0) {
  //       clearInterval(timerList[id]);
  //     }
  //
  //     const isTimerStopped = false;
  //     const newTask = { ...oldTask, isTimerStopped, timeLeft };
  //
  //     return [...tasks.slice(0, index), newTask, ...tasks.slice(index + 1)];
  //   });
  // }

  // function onTimerPlay(id) {
  //   timerList[id] = setInterval(() => reduceTimeLeft(id), 1000);
  // }

  // function onPause(id) {
  //   clearInterval(timerList[id]);
  //
  //   setTasks(() => {
  //     const index = getTaskIndexById(id);
  //     const oldTask = tasks[index];
  //     const newTask = { ...oldTask, isTimerStopped: true };
  //     return [...tasks.slice(0, index), newTask, ...tasks.slice(index + 1)];
  //   });
  // }

  function deleteAllCompleted() {
    setTasks(() => tasks.filter((task) => !task.isCompleted));
  }

  function onFilterChange(filterText) {
    setFilter(filterText);
  }

  const visibleTasks = filterTasks(tasks, filter);

  const tasksLeftCounter = tasks.filter((task) => !task.isCompleted).length;

  return (
    <section className="todoapp">
      <NewTaskForm onTaskAdded={addTask} />
      <section className="main">
        <TaskList
          tasks={visibleTasks}
          // onPause={onPause}
          // onPlay={onTimerPlay}
          onTaskTextEdited={editTaskText}
          onTaskDeleted={deleteTask}
          onToggleCompleted={onToggleCompleted}
        />
        <Footer
          tasksLeft={tasksLeftCounter}
          onDeleted={deleteAllCompleted}
          onFilterChange={onFilterChange}
          filter={filter}
        />
      </section>
    </section>
  );
};

export default App;
