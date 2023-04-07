import { StyleSheet } from "react-native";
import colors from "../../../colors";
import normalize from 'react-native-normalize';

const modalStyles = StyleSheet.create({
  //modal option box
  optionModalContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: "0.75%",
  },
  optionModalText: {
    color: "#383157",
    alignSelf: "center",
    font: normalize(16),
    fontWeight: "400",
  },
  optionModalIcon: {
    marginLeft: normalize(30),
    marginRight: normalize(20),
    marginTop: normalize(10),
    marginBottom: normalize(10),
    alignSelf: "flex-start",
    width: normalize(31), 
    height: normalize(31),
  },

  // slide up/down in modal
  modalSlideUpDownContainer: {
    justifyContent: "center",
    //alignSelf: "center",
    paddingTop: normalize(5),
    paddingBottom: normalize(20),
    width: "100%",
  },
  modalSlideUpDownButton: {
    width: normalize(100), 
    height: normalize(10), 
    alignSelf: "center",
  },
  modalOptionsContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },


  // modal See ALl container
  modalSeeAllContainer: {

  },
  modalSeeAllPeopleContainer: {
      borderTopLeftRadius: normalize(20),
      borderTopRightRadius: normalize(20),
      backgroundColor: "#F6F6FF",
      width: "100%",
      height: "60%",
      marginTop: "auto",
      paddingHorizontal: 0,
  },

  // modal container
  modalContainer: {
    
  },
  modalPeopleContainer: {
      borderTopLeftRadius: normalize(20),
      borderTopRightRadius: normalize(20),
      backgroundColor: "#F6F6FF",
      width: "100%",
      marginTop: "auto",
      paddingHorizontal: 0,
      paddingBottom: normalize(30),

      position: "absolute",
      bottom: 0,
  },


  // change how they see you modal
  modalStatusContainer: {
      borderTopLeftRadius: normalize(20),
      borderTopRightRadius: normalize(20),
      backgroundColor: "#F6F6FF",
      width: "100%",
      marginTop: "auto",
      paddingHorizontal: normalize(25),

      position: "absolute",
      bottom: 0,
  },
  modalHeaderText: {
    fontWeight: "900",
    color: "#4F457C",
    fontSize: normalize(24),
  },
  modalHeaderSubtext: {
    color: "#6D6D6D",
    fontSize: normalize(15),

    marginBottom: normalize(10),
  },
  modalSubheaderTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginVertical: normalize(10),
  },
  modalSubheaderText: {
    fontWeight: "700",
    color: "#4F457C",
    fontSize: normalize(18),
  },
  modalSubheaderNoteText: {
    color: "#6D6D6D",
    fontSize: normalize(13),
  },
  modalSubheaderSubtext: {
    color: "#4F457C",
    fontSize: normalize(16),
  },
  modalToggleIcon: {
    width: normalize(34),
    height: normalize(20),
  },
  modalSaveButtonContainer: {
    backgroundColor: "#7A6BBC",
    borderRadius: normalize(10),
    marginLeft: "20%",
    marginRight: "20%",
    alignItems: "center",
    marginBottom: "5%",
    marginTop: "10%",
  },
  modalSaveButtonText: {
    color: "#fff",
    fontWeight: "400",
    fontSize: normalize(17),
    padding: normalize(12),
  },
  modalTextInputContainer: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: normalize(10),

    marginBottom: normalize(15),
  },


  // radio button
  optionOSIContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 0,
    borderRadius: normalize(10),
  },
  optionOSIIndicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionIcon: {
    height: normalize(30),
    width: normalize(30),
    marginHorizontal: normalize(10),
    marginVertical: normalize(10),
  },
  modalRadioButtonContainer: {
    height: normalize(22),
    width: normalize(22),
    backgroundColor: "transparent",
    borderRadius: normalize(20),
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",

    marginHorizontal: normalize(15),
  },
  modalRadioButtonIcon: {
    height: normalize(15),
    width: normalize(15),
    borderRadius: normalize(20),
    backgroundColor: "#000",
  },

});

export default modalStyles;
