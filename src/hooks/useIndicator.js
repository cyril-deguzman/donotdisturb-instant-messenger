const openToChat = require("../assets/osis/open-to-chat.png");
const idle = require("../assets/osis/idle.png");
const doNotDisturb = require("../assets/osis/do-not-disturb.png");
const invisible = require("../assets/osis/invisible.png");

const useIndicator = (status) => {
  const indicators = {
    openToChat: openToChat,
    idle: idle,
    doNotDisturb: doNotDisturb,
    invisible: invisible,
  };

  return indicators[status];
};

export default useIndicator;
