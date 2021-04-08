const transformMoments = (moments) => {
  return moments > 9 ? moments : `0${String(moments)}`;
};

const getMinutesAndSecondsFromSeconds = (allSeconds) => {
  const minutes = Math.floor(allSeconds / 60);
  const seconds = allSeconds - minutes * 60;

  return `${transformMoments(minutes)}:${transformMoments(seconds)}`;
};

export default getMinutesAndSecondsFromSeconds;
