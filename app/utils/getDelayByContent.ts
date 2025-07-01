type Content = {
  description: string;
  points: [{ label: string; value: string }];
};

const getDelayByContent = (content: Content) => {
  if (!content) return 3000;
  const charsPerSecond = 15;
  let estimatedDelay;
  let totalPoints;
  if (content.description)
    estimatedDelay = (content.description.length / charsPerSecond) * 1000;
  else if (content.points) {
    totalPoints = content.points.reduce((sum, item) => {
      return sum + item.label.length + item.value.length;
    }, 0);
    estimatedDelay = (totalPoints / charsPerSecond) * 1000;
  }

  return estimatedDelay;
};

export default getDelayByContent;
