import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import useBackground from "../../hooks/useBackground";
import WhiteSearchBox from "../../components/WhiteSearchBox";
import ProfileCheckBox from "../../components/ProfileCheckBox";

const backIcon = require("../../assets/icons/back-icon.png");
const nextButton = require("../../assets/icons/next-button.png");

const NewMessage = ({ navigation }) => {
    const bgImg = useBackground("topBubbles");
    const [searchQuery, setSearchQuery] = useState("");

  return (
    <View style={styles.container}>
      <Image source={bgImg} style={styles.backImage} />
      
      <View style={styles.topContainer} >
        <View style={styles.row}>
            <View style={styles.together}>
                <TouchableOpacity onPress={() => navigation.navigate("Messages")}>
                    <Image source={backIcon} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 5}}>New Message</Text>
            </View>
            <Image source={nextButton} style={styles.nextButton} />
        </View>
        {/** Insert search bar made by cy */}
        
        <View style={{marginTop: 15, marginHorizontal: 10}}>
            <WhiteSearchBox setValue={setSearchQuery} value={searchQuery} />
        </View>
      </View>

      {/** Make a component for displaying profile img + osi, name, icon */}
      <View style={styles.messageContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#4F457C", marginLeft: 5 }}>Suggested</Text>
          <ProfileCheckBox userStatus="idle" />
          <ProfileCheckBox userStatus="doNotDisturb" />
          <ProfileCheckBox userStatus="openToChat" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  indicator: {
    width: 20,
    height: 20,
    position: "absolute",
    bottom: -5,
    right: -5
  },
  rowSpace: {
    flexDirection: "row",
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent:"space-between"
  },
  topContainer:{
    marginHorizontal: 20
  },
  profileImg: {
    width: 60,
    height: 60,
    borderRadius: 50
  },
  together: {
    flexDirection: "row",
    alignItems: "center"
  },
  column: {
    flexDirection: "column"
  },
  nextStyle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 5
  },
  nextButton: {
    width: 77,
    height: 35,
    marginTop: 8, 
    justifyContent: "flex-end"
  },
  backIcon : {
    width: 20,
    height: 20,
    marginTop: 8,
    marginRight: 20
  },
  row: {
    flexDirection: "row",
    marginTop: 40,
    alignItems: "center",
    justifyContent:"space-between"
  },
  messageContainer: {
    width: "100%",
    height: "80%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: "hidden",
    paddingTop: 35,
    paddingLeft: 20,
    paddingRight: 10
  },
  backImage: {
    width: "100%",
    height: "120%",
    position: "absolute",
    top: 0,
    resizeMode: "cover",
  }
});

export default NewMessage;