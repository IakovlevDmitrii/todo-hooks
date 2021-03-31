const filterItems = (items, filter) => {
  switch (filter) {
    case 'all':
      return items;

    case 'active':
      return items.filter((item) => !item.isCompleted);

    case 'completed':
      return items.filter((item) => item.isCompleted);

    default:
      return items;
  }
};

export default filterItems;
