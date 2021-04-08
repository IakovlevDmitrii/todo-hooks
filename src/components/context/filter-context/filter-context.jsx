import React from 'react';

const filterContext = React.createContext();
const { Provider: FilterProvider, Consumer: FilterConsumer } = filterContext;

export { filterContext, FilterProvider, FilterConsumer };
