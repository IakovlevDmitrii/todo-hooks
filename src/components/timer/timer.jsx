import React, { Component } from 'react';
import PropTypes from 'prop-types';

import play from './play.png';
import pause from './pause.png';

export default class Timer extends Component {
  state = {
    timeLeft: 0,
    isTimerStopped: true,
  };

  componentDidMount() {
    const { isTimerStopped, timeLeft } = this.props;

    if (timeLeft) {
      this.updateStateField('isTimerStopped', isTimerStopped);
      this.updateStateField('timeLeft', timeLeft);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isTimerStopped, timeLeft } = this.props;

    if (timeLeft !== prevProps.timeLeft) {
      this.updateStateField('timeLeft', timeLeft);
    }

    if (isTimerStopped !== prevState.isTimerStopped) {
      this.updateStateField('isTimerStopped', isTimerStopped);
    }
  }

  updateStateField = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  onTimerPlay = (event) => {
    const { onPlay } = this.props;
    const { isTimerStopped } = this.state;
    const isTarget = event.target.tagName === 'IMG';

    if (isTarget && isTimerStopped) {
      onPlay();
    }
  };

  onTimerPause = () => {
    const { onPause } = this.props;
    onPause();
  };

  render() {
    const { timeLeft } = this.state;

    let minutes = Math.floor(timeLeft / 60);
    if (minutes < 10) {
      minutes = `0${String(minutes)}`;
    }

    let seconds = timeLeft - minutes * 60;
    if (seconds < 10) {
      seconds = `0${String(seconds)}`;
    }

    const time = `${minutes}:${seconds}`;

    return (
      <span className="description">
        <button
          className="icon icon-play"
          onClick={(event) => {
            this.onTimerPlay(event);
          }}
          type="button"
          aria-label="play"
        >
          <img src={play} alt="play" />
        </button>
        <button className="icon icon-pause" onClick={this.onTimerPause} type="button" aria-label="pause">
          <img src={pause} alt="pause" />
        </button>
        <span>{time}</span>
      </span>
    );
  }
}

Timer.propTypes = {
  isTimerStopped: PropTypes.bool.isRequired,
  onPause: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  timeLeft: PropTypes.number.isRequired,
};
