import React, { useState } from 'react';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

import { FilterProvider } from '../context/filter-context';

import filterTasks from '../../utils/filter-tasks';

import '../../style.css';

let nextId = 1;
// const timers = [];

const App = () => {
  const createTask = (taskText, timeLeft) => {
    const id = nextId;
    nextId += 1;

    return {
      id,
      isCompleted: false,
      isTimerStopped: true,
      startTime: new Date(),
      taskText,
      timeLeft,
    };
  };

  const [tasks, setTasks] = useState([createTask('First', 60), createTask('Second', 60), createTask('Third', 60)]);

  const [filter, setFilter] = useState('all');

  const getTaskIndexById = (id) => {
    return tasks.findIndex((task) => task.id === id);
  };

  const deleteTask = (id) => {
    setTasks(() => {
      const index = getTaskIndexById(id);

      return [...tasks.slice(0, index), ...tasks.slice(index + 1)];
    });
  };

  const addTask = (taskText, timeLeft) => {
    const newTask = createTask(taskText, timeLeft);

    setTasks(() => [...tasks, newTask]);
  };

  const editTaskText = (id, taskText) => {
    setTasks(() => {
      const index = getTaskIndexById(id);
      const oldTask = tasks[index];
      const newTask = { ...oldTask, taskText };

      return [...tasks.slice(0, index), newTask, ...tasks.slice(index + 1)];
    });
  };

  const onToggleCompleted = (id) => {
    setTasks(() => {
      const index = getTaskIndexById(id);
      const oldTask = tasks[index];
      const newTask = { ...oldTask, isCompleted: !oldTask.isCompleted };

      return [...tasks.slice(0, index), newTask, ...tasks.slice(index + 1)];
    });
  };

  const deleteAllCompleted = () => {
    setTasks(() => tasks.filter((task) => !task.isCompleted));
  };

  const onFilterChange = (filterText) => {
    setFilter(filterText);
  };

  const reduceSecondsLeft = (id) => {
    console.log(id);
    // setTasks(() => {
    //   const index = getTaskIndexById(id);
    //   console.log(id);
    //   const oldTask = tasks[index];
    //
    //   let { timeLeft } = oldTask;
    //   timeLeft -= 1;
    //
    //   if (timeLeft === 0) {
    //     clearInterval(timers[id]);
    //   }
    //
    //   const isTimerStopped = false;
    //   const newTask = { ...oldTask, isTimerStopped, timeLeft };
    //
    //   return [...tasks.slice(0, index), newTask, ...tasks.slice(index + 1)];
    // });
  };

  //   setSecondsLeft((sec) => {
  //     if (sec === 1) {
  //       clearInterval(timers[id]);
  //       setIsTimerStopped(true);
  //     }
  //
  //     return sec - 1;
  //   });
  // };

  const onPlayClick = (id) => {
    reduceSecondsLeft(id);
    // timers[id] = setInterval(reduceSecondsLeft, 1000);

    //   const isTarget = event.target.tagName === 'IMG';
    //
    //   if (secondsLeft && isTarget && isTimerStopped) {
    //     timers[id] = setInterval(reduceSecondsLeft, 1000);
    //     setIsTimerStopped(false);
    //   }
  };

  // const onPauseClick = (event) => {
  //   const isTarget = event.target.tagName === 'IMG';
  //
  //   if (isTarget && !isTimerStopped) {
  //     clearInterval(timers[id]);
  //     setIsTimerStopped(true);
  //   }
  // };

  const visibleTasks = filterTasks(tasks, filter);
  const tasksLeftCounter = tasks.filter((task) => !task.isCompleted).length;

  return (
    <FilterProvider value={filter}>
      <section className="todoapp">
        <NewTaskForm onTaskAdded={addTask} />
        <section className="main">
          <TaskList
            tasks={visibleTasks}
            onPlayClick={onPlayClick}
            onTaskTextEdited={editTaskText}
            onTaskDeleted={deleteTask}
            onToggleCompleted={onToggleCompleted}
          />
          <Footer tasksLeft={tasksLeftCounter} onDeleted={deleteAllCompleted} onFilterChange={onFilterChange} />
        </section>
      </section>
    </FilterProvider>
  );
};

export default App;
