import React, { useState } from 'react';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

import filterTasks from '../../utils/filter-tasks';

import '../../style.css';

const App = () => {
  const timerList = [];
  let maxId = 1;

  function createTask(taskText, timeLeft) {
    const id = maxId;
    maxId += 1;

    return {
      id,
      isCompleted: false,
      isTimerStopped: true,
      startTime: new Date(),
      taskText,
      timeLeft,
    };
  }

  const [tasks, setTasks] = useState([createTask('First', 60), createTask('Second', 60), createTask('Third', 60)]);

  const [filter, setFilter] = useState('all');

  function getTaskIndexById(id) {
    return tasks.findIndex((task) => task.id === id);
  }

  function deleteTask(id) {
    setTasks(() => {
      const index = getTaskIndexById(id);
      const oldTask = tasks[index];
      const { isTimerStopped } = oldTask;

      if (!isTimerStopped) {
        clearInterval(timerList[id]);
      }

      return [...tasks.slice(0, index), ...tasks.slice(index + 1)];
    });
  }

  function deleteAllCompleted() {
    setTasks(() => tasks.filter((task) => !task.isCompleted));
  }

  function addTask(taskText, timeLeft) {
    const newTask = createTask(taskText, timeLeft);
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

  function onFilterChange(filterText) {
    setFilter(filterText);
  }

  function reduceTimeLeft(id) {
    setTasks(() => {
      const index = getTaskIndexById(id);
      const oldTask = tasks[index];

      let { timeLeft } = oldTask;
      timeLeft -= 1;

      if (timeLeft === 0) {
        clearInterval(timerList[id]);
      }

      const isTimerStopped = false;
      const newTask = { ...oldTask, isTimerStopped, timeLeft };

      return [...tasks.slice(0, index), newTask, ...tasks.slice(index + 1)];
    });
  }

  function onTimerPlay(id) {
    timerList[id] = setInterval(() => reduceTimeLeft(id), 1000);
  }

  function onPause(id) {
    clearInterval(timerList[id]);

    setTasks(() => {
      const index = getTaskIndexById(id);
      const oldTask = tasks[index];
      const newTask = { ...oldTask, isTimerStopped: true };
      return [...tasks.slice(0, index), newTask, ...tasks.slice(index + 1)];
    });
  }

  const visibleTasks = filterTasks(tasks, filter);
  const todoCount = tasks.filter((task) => !task.isCompleted).length;

  return (
    <section className="todoapp">
      <NewTaskForm onTaskAdded={addTask} />
      <section className="main">
        <TaskList
          tasks={visibleTasks}
          onPause={onPause}
          onPlay={onTimerPlay}
          onTaskTextEdited={editTaskText}
          onTaskDeleted={deleteTask}
          onToggleCompleted={onToggleCompleted}
        />
        <Footer toDo={todoCount} onDeleted={deleteAllCompleted} onFilterChange={onFilterChange} filter={filter} />
      </section>
    </section>
  );
};

export default App;

// import React, { useState } from 'react';
// import NewTaskForm from '../new-task-form';
// import TaskList from '../task-list';
// import Footer from '../footer';
//
// import filterTasks from '../../utils/filter-tasks';
//
// import '../../style.css';
//
// const App = () => {
//   maxId = 1;
//
//   // state = {
//   //   tasks: [this.createTask('First', 60), this.createTask('Second', 60), this.createTask('Third', 60)],
//   //   filter: 'all',
//   // };
//
//   const [ tasks, setTasks ] = useState( [
//     createTask('First', 60),
//     createTask('Second', 60),
//     createTask('Third', 60),
//   ] );
//   const [ filter, setFilter ] = useState('all');
//
//
//   getIndex = (tasks, id) => {
//     return tasks.findIndex((task) => task.id === id);
//   };
//
//   deleteTask = (id) => {
//     this.setState(({ tasks }) => {
//       const index = this.getIndex(tasks, id);
//       const oldTask = tasks[index];
//
//       const { isTimerStopped } = oldTask;
//       if (!isTimerStopped) {
//         const timer = `timer${id}`;
//         clearInterval(this[timer]);
//       }
//
//       const newTasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];
//
//       return {
//         tasks: newTasks,
//       };
//     });
//   };
//
//   deleteAllCompleted = () => {
//     this.setState(({ tasks }) => {
//       const newTasks = tasks.filter((task) => !task.isCompleted);
//
//       return {
//         tasks: newTasks,
//       };
//     });
//   };
//
//   addTask = (taskText, timeLeft) => {
//     const newTask = this.createTask(taskText, timeLeft);
//
//     this.setState(({ tasks }) => {
//       const newTasks = [...tasks, newTask];
//
//       return {
//         tasks: newTasks,
//       };
//     });
//   };
//
//   editStateField = (id, name, value) => {
//     this.setState(({ tasks }) => {
//       const index = this.getIndex(tasks, id);
//       const oldTask = tasks[index];
//       const newTask = { ...oldTask, [name]: value };
//       const newTasks = [...tasks.slice(0, index), newTask, ...tasks.slice(index + 1)];
//
//       return {
//         tasks: newTasks,
//       };
//     });
//   };
//
//   editTaskText = (id, taskText) => {
//     this.editStateField(id, 'taskText', taskText);
//   };
//
//   onToggleCompleted = (id) => {
//     this.setState(({ tasks }) => {
//       const index = this.getIndex(tasks, id);
//       const oldTask = tasks[index];
//
//       const newTask = { ...oldTask, isCompleted: !oldTask.isCompleted };
//       const newTasks = [...tasks.slice(0, index), newTask, ...tasks.slice(index + 1)];
//
//       return {
//         tasks: newTasks,
//       };
//     });
//   };
//
//   onFilterChange = (filter) => {
//     this.setState({ filter });
//   };
//
//   onTimerPlay = (id) => {
//     const timer = `timer${id}`;
//     this[timer] = setInterval(() => this.reduceTimeLeft(id), 1000);
//   };
//
//   reduceTimeLeft = (id) => {
//     this.setState(({ tasks }) => {
//       const index = this.getIndex(tasks, id);
//       const oldTask = tasks[index];
//       let { timeLeft } = oldTask;
//
//       timeLeft -= 1;
//
//       if (timeLeft === 0) {
//         const timer = `timer${id}`;
//         clearInterval(this[timer]);
//       }
//
//       const isTimerStopped = false;
//       const newTask = { ...oldTask, isTimerStopped, timeLeft };
//       const newTasks = [...tasks.slice(0, index), newTask, ...tasks.slice(index + 1)];
//
//       return {
//         tasks: newTasks,
//       };
//     });
//   };
//
//   onPause = (id) => {
//     const timer = `timer${id}`;
//     clearInterval(this[timer]);
//
//     this.editStateField(id, 'isTimerStopped', true);
//   };
//
//   createTask(taskText, timeLeft) {
//     const id = this.maxId;
//     this.maxId += 1;
//
//     return {
//       id,
//       isCompleted: false,
//       isTimerStopped: true,
//       startTime: new Date(),
//       taskText,
//       timeLeft,
//     };
//   }
//
//   render() {
//     const { tasks, filter } = this.state;
//     const visibleTasks = filterTasks(tasks, filter);
//     const todoCount = tasks.filter((task) => !task.isCompleted).length;
//
//     return (
//       <section className="todoapp">
//         <NewTaskForm onTaskAdded={this.addTask} />
//         <section className="main">
//           <TaskList
//             tasks={visibleTasks}
//             onPause={this.onPause}
//             onPlay={this.onTimerPlay}
//             onTaskTextEdited={this.editTaskText}
//             onTaskDeleted={this.deleteTask}
//             onToggleCompleted={this.onToggleCompleted}
//           />
//           <Footer
//             toDo={todoCount}
//             onDeleted={this.deleteAllCompleted}
//             onFilterChange={this.onFilterChange}
//             filter={filter}
//           />
//         </section>
//       </section>
//     );
//   }
// }
