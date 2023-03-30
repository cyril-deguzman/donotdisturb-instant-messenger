const messagePencilIcon = require("../assets/icons/message-pencil-icon.png");
const bubbleIcon = require("../assets/icons/bubble-icon.png");
const messagesIcon = require("../assets/icons/messages-icon.png");
const settingsIcon = require("../assets/icons/settings-icon.png");

const backIcon = require("../assets/icons/back-icon.png");

const defaultStatusIcon = require("../assets/icons/default-status-icon.png");
const specificStatusIcon = require("../assets/icons/specific-status-icon.png");
const notificationSoundsIcon = require("../assets/icons/notification-sounds-icon.png");
const accessibilityIcon = require("../assets/icons/accessibility-icon.png");
const privacySafetyIcon = require("../assets/icons/privacy-safety-icon.png");
const logoutIcon = require("../assets/icons/logout-icon.png");
const infoIcon = require("../assets/icons/info-icon.png");
const addBubbleIcon = require("../assets/icons/add-bubble-icon.png");
const openIcon = require("../assets/icons/open-icon.png");
const closeIcon = require("../assets/icons/close-icon.png");
const editIcon = require("../assets/icons/edit-icon.png");

const slideUpDownIcon = require("../assets/icons/slide-up-down-icon.png");
const infoIcon = require("../assets/icons/info-icon.png");

const useIcon = (option) => {
  const icons = {
    messagePencilIcon: messagePencilIcon,
    bubbleIcon: bubbleIcon,
    messagesIcon: messagesIcon,
    settingsIcon: settingsIcon,

    defaultStatusIcon: defaultStatusIcon,
    specificStatusIcon: specificStatusIcon,
    notificationSoundsIcon: notificationSoundsIcon,
    accessibilityIcon: accessibilityIcon,
    privacySafetyIcon: privacySafetyIcon,
    logoutIcon: logoutIcon,
    backIcon: backIcon,

    addBubbleIcon: addBubbleIcon,
    openIcon: openIcon,
    closeIcon: closeIcon,
    editIcon: editIcon,

    slideUpDownIcon: slideUpDownIcon,
    infoIcon: infoIcon,
    infoIcon: infoIcon,
  };

  return icons[option];
};

export default useIcon;
