const messagePencilIcon = require("../assets/icons/message-pencil-icon.png");
const audienceIcon = require("../assets/icons/audience-icon.png");
const messagesIcon = require("../assets/icons/messages-icon.png");
const settingsIcon = require("../assets/icons/settings-icon.png");

const backIcon = require("../assets/icons/back-icon.png");

const defaultStatusIcon = require("../assets/icons/default-status-icon.png");
const specificStatusIcon = require("../assets/icons/specific-status-icon.png");
const notificationSoundsIcon = require("../assets/icons/notification-sounds-icon.png");
const accessibilityIcon = require("../assets/icons/accessibility-icon.png");
const privacySafetyIcon = require("../assets/icons/privacy-safety-icon.png");
const logoutIcon = require("../assets/icons/logout-icon.png");


const useIcon = (option) => {
  const icons = {
    messagePencilIcon: messagePencilIcon,
    audienceIcon: audienceIcon,
    messagesIcon: messagesIcon,
    settingsIcon: settingsIcon,

    defaultStatusIcon: defaultStatusIcon,
    specificStatusIcon: specificStatusIcon,
    notificationSoundsIcon: notificationSoundsIcon,
    accessibilityIcon: accessibilityIcon,
    privacySafetyIcon: privacySafetyIcon,
    logoutIcon: logoutIcon,
    backIcon: backIcon,
  };

  return icons[option];
};

export default useIcon;
