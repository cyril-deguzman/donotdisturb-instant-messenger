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

const deleteIcon = require("../assets/icons/delete-icon.png");
const muteNotificationsIcon = require("../assets/icons/mute-notifications-icon.png");
const changeHowTheySeeYouIcon = require("../assets/icons/change-how-they-see-you-icon.png");
const blockIcon = require("../assets/icons/block-icon.png");
const addMembersIcon = require("../assets/icons/add-members-icon.png");
const leaveIcon = require("../assets/icons/leave-icon.png");

const toggleOffIcon = require("../assets/icons/toggle-off-icon.png");
const toggleOnIcon = require("../assets/icons/toggle-on-icon.png");
const trashIcon = require("../assets/icons/trash-icon.png");

const nextButton = require("../assets/icons/next-button.png");
const saveButton = require("../assets/icons/save-button.png");
const muteIcon = require("../assets/icons/mute-icon.png");
const changeStatusIcon = require("../assets/icons/change-status-icon.png");
const seeMembersIcon = require("../assets/icons/see-members-icon.png");

const deleteAlertIcon = require("../assets/icons/delete-alert-icon.png");

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
    deleteIcon: deleteIcon,
    muteNotificationsIcon: muteNotificationsIcon,
    changeHowTheySeeYouIcon: changeHowTheySeeYouIcon,
    blockIcon: blockIcon,
    addMembersIcon: addMembersIcon,
    leaveIcon: leaveIcon,
    toggleOffIcon: toggleOffIcon,
    toggleOnIcon: toggleOnIcon,
    trashIcon: trashIcon,
    infoIcon: infoIcon,
    nextButton: nextButton,
    saveButton: saveButton,
    muteIcon: muteIcon,
    changeStatusIcon: changeStatusIcon,
    seeMembersIcon: seeMembersIcon,
    deleteAlertIcon: deleteAlertIcon,
  };

  return icons[option];
};

export default useIcon;
