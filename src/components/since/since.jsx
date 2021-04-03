import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

const timerList = [];

const Since = ({ startTime, id, updateInterval }) => {
  const [created, setCreated] = useState(null);

  const countdown = () => {
    setCreated(formatDistanceToNow(startTime, { includeSeconds: true }));
  };

  useEffect(() => {
    timerList[id] = setInterval(() => countdown(), updateInterval);

    return () => clearInterval(timerList[id]);
  });

  return <span className="created">created {created}</span>;
};

Since.propTypes = {
  id: PropTypes.number.isRequired,
  startTime: PropTypes.instanceOf(Date).isRequired,
  updateInterval: PropTypes.number,
};

Since.defaultProps = {
  updateInterval: 2000,
};

export default Since;
