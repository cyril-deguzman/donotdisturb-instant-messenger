import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import useBackground from "../../hooks/useBackground";
import WhiteSearchBox from "../../components/WhiteSearchBox";
import ProfileCheckBox from "../../components/ProfileCheckBox";
import normalize from "react-native-normalize";
import useIcon from "../../hooks/useIcon";

const AddBubble = ({ navigation }) => {
  const bgImg = useBackground("topBubbles");
  const [searchQuery, setSearchQuery] = useState("");

  const saveButton = useIcon("saveButton");
  const backIcon = useIcon("backIcon");

  return (
    <View style={styles.container}>
      <Image source={bgImg} style={styles.backImage} />

      <View style={styles.topContainer}>
        <View style={styles.row}>
          <View style={styles.together}>
            <TouchableOpacity onPress={() => navigation.navigate("Bubble")}>
              <Image source={backIcon} style={styles.backIcon} />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: normalize(20),
                fontWeight: "bold",
                marginTop: normalize(5),
              }}
            >
              Add Members
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Bubble")}>
            <Image source={saveButton} style={styles.nextButton} />
          </TouchableOpacity>
        </View>

        <View
          style={{ marginTop: normalize(15), marginHorizontal: normalize(10) }}
        >
          <WhiteSearchBox setValue={setSearchQuery} value={searchQuery} />
        </View>
      </View>

      {/** Make a component for displaying profile img + osi, name, icon */}
      <View style={styles.messageContainer}>
        <Text
          style={{
            fontSize: normalize(20),
            fontWeight: "bold",
            color: "#4F457C",
            marginLeft: normalize(5),
          }}
        >
          Suggested
        </Text>
        {/* <ProfileCheckBox userStatus="idle" />
          <ProfileCheckBox userStatus="doNotDisturb" />
          <ProfileCheckBox userStatus="openToChat" /> */}
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
    width: normalize(20),
    height: normalize(20),
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  rowSpace: {
    flexDirection: "row",
    marginTop: normalize(20),
    marginHorizontal: normalize(20),
    alignItems: "center",
    justifyContent: "space-between",
  },
  topContainer: {
    marginHorizontal: normalize(20),
  },
  profileImg: {
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(50),
  },
  together: {
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
  },
  nextStyle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: normalize(5),
  },
  nextButton: {
    width: normalize(77),
    height: normalize(35),
    marginTop: normalize(8),
    justifyContent: "flex-end",
  },
  backIcon: {
    width: normalize(20),
    height: normalize(20),
    marginTop: normalize(8),
    marginRight: normalize(20),
  },
  row: {
    flexDirection: "row",
    marginTop: normalize(40),
    alignItems: "center",
    justifyContent: "space-between",
  },
  messageContainer: {
    width: "100%",
    height: "80%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: normalize(50),
    borderTopRightRadius: normalize(50),
    overflow: "hidden",
    paddingTop: normalize(35),
    paddingLeft: normalize(20),
    paddingRight: normalize(10),
  },
  backImage: {
    width: "100%",
    height: "120%",
    position: "absolute",
    top: 0,
    resizeMode: "cover",
  },
});

export default AddBubble;
