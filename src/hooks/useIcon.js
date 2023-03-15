const messagePencilIcon = require("../assets/icons/message-pencil-icon.png");
const audienceIcon = require("../assets/icons/audience-icon.png");
const messagesIcon = require("../assets/icons/messages-icon.png");
const settingsIcon = require("../assets/icons/settings-icon.png");

const useIcon = (option) => {
  const icons = {
    messagePencilIcon: messagePencilIcon,
    audienceIcon: audienceIcon,
    messagesIcon: messagesIcon,
    settingsIcon: settingsIcon,
  };

  return icons[option];
};

export default useIcon;
