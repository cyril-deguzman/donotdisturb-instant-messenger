const topBubbles = require("../assets/backgrounds/top-bubbles-bg.png");
const bubbles = require("../assets/backgrounds/bubbles-bg.png");

const useBackground = (option) => {
  const backgrounds = {
    topBubbles: topBubbles,
    bubbles: bubbles,
  };

  return backgrounds[option];
};

export default useBackground;
