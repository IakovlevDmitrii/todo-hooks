const filterTasks = (tasks, filter) => {
  switch (filter) {
    case 'all':
      return tasks;

    case 'active':
      return tasks.filter((task) => !task.isCompleted);

    case 'completed':
      return tasks.filter((task) => task.isCompleted);

    default:
      return tasks;
  }
};

export default filterTasks;
