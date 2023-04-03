import { StyleSheet } from "react-native";
import colors from "../../../colors";
import normalize from 'react-native-normalize';

const modalStyles = StyleSheet.create({
  //modal option box
  optionModalHeaderContainer: {
    paddingLeft: normalize(27),
    paddingBottom: normalize(10),
  },
  optionModalHeaderText: {
    color: "#686868",  
    font: normalize(16),
  },
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
    paddingTop: normalize(15),
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
      //justifyContent: "flex-end",
      //padding: normalize(20),
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
      //justifyContent: "flex-end",
      //padding: normalize(20),
      borderTopLeftRadius: normalize(20),
      borderTopRightRadius: normalize(20),
      backgroundColor: "#F6F6FF",
      width: "100%",
      marginTop: "auto",
      paddingHorizontal: 0,
      paddingBottom: normalize(30),
  }


});

export default modalStyles;
