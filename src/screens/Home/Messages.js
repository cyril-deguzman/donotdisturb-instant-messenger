import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import messagesStyles from "./utils/messagesStyles";

const Messages = () => {
  return (
    <View style={messagesStyles.container}>
      <View style={messagesStyles.messageContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Messages</Text>
      </View>
    </View>
  );
};

export default Messages;
