import React from "react";
import { Image, View, Text } from "react-native";

import useIndicator from "../hooks/useIndicator";
import normalize from 'react-native-normalize';

const StatusBox = ({ userStatus }) => {
  const userIndicator = useIndicator(userStatus);

  /** TODO: optimize by utilizing colors.js */
  const borderColors = {
    openToChat: "#1EE33E",
    idle: "#D49A00",
    doNotDisturb: "#F62447",
    invisible: "#818181",
  };

  return (
    <View 
        style={{ 
            borderWidth: 1, 
            borderColor: borderColors[userStatus], 
            borderRadius: 5, 
            paddingHorizontal: 10, 
            paddingVertical: 2, 
            justifyContent: "center",
            alignItems: 'center',
            marginTop: 5,
            marginBottom: 30
        }}>
        <Text 
            style={{
                fontSize: normalize(14), 
                color: "#818181",
                textAlign: "center"
            }}>
            They see you as {' '}
            <Image 
                source={userIndicator} 
                style={{width: normalize(15), height: normalize(15)}}
            /> 
            {' '} until 8:30pm tomorrow
        </Text>
        <Text 
            style={{
                fontSize: normalize(14), 
                color: "#818181",
                textAlign: "center"
            }}>"Only Acads 4ever"</Text>
    </View>
  );
};

export default StatusBox;