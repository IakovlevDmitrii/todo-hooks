import React from 'react';
import PropTypes from 'prop-types';

import getMinutesAndSecondsFromSeconds from '../../utils/get-minutes-and-seconds-from-seconds';

import playImageSource from './play.png';
import pauseImageSource from './pause.png';

// const Timer = ({ id, onPauseClick, onPlayClick, timeLeft }) => {
const Timer = ({ onPlayClick, timeLeft }) => {
  // const [secondsLeft, setSecondsLeft] = useState(timeLeft);
  // const [isTimerStopped, setIsTimerStopped] = useState(true);

  const onPlay = () => {
    onPlayClick();

    //   const isTarget = event.target.tagName === 'IMG';
    //
    //   if (secondsLeft && isTarget && isTimerStopped) {
    //     timers[id] = setInterval(reduceSecondsLeft, 1000);
    //     setIsTimerStopped(false);
    //   }
  };

  // const onPause = (event) => {
  //   const isTarget = event.target.tagName === 'IMG';
  //
  //   if (isTarget && !isTimerStopped) {
  //     clearInterval(timers[id]);
  //     setIsTimerStopped(true);
  //   }
  // };

  // const playPauseButton = isTimerStopped ? (
  //   <button className="icon icon-play" onClick={onPlay} type="button" aria-label="play">
  //     <img src={playImageSource} alt="play" />
  //   </button>
  // ) : (
  //   <button className="icon icon-pause" onClick={onPause} type="button" aria-label="pause">
  //     <img src={pauseImageSource} alt="pause" />
  //   </button>
  // );

  const time = getMinutesAndSecondsFromSeconds(timeLeft);

  return (
    <span className="description">
      <button className="icon icon-play" onClick={onPlay} type="button" aria-label="play">
        <img src={playImageSource} alt="play" />
      </button>
      <button
        className="icon icon-pause"
        // onClick={onPause}
        type="button"
        aria-label="pause"
      >
        <img src={pauseImageSource} alt="pause" />
      </button>
      <span className="timer">{time}</span>
    </span>
  );
};

Timer.propTypes = {
  // id: PropTypes.number.isRequired,
  // onPauseClick: PropTypes.func.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  timeLeft: PropTypes.number.isRequired,
};

export default Timer;
