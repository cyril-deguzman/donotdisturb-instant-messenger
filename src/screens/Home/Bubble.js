import React from "react";
import { View, TouchableOpacity, Text, Image, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';


import SearchBoxBrighter from "../../components/SeachBoxBrighter";
import MessageBox from "../../components/MessageBox";

import useBackground from "../../hooks/useBackground";
import bubbleStyles from "./utils/bubbleStyles";
import messagesStyles from "./utils/messagesStyles";
import { ScrollView } from "react-native-gesture-handler";
import useIcon from "../../hooks/useIcon";
import { Pressable } from "react-native";
import MiniBubble from "../../components/MiniBubble";

const Bubble = () => {  
  const bgImg = useBackground("bubbles");
  const addBubbleIcon = useIcon("addBubbleIcon");

  return (
    <SafeAreaView style={bubbleStyles.container}>
      <Image source={bgImg} style={bubbleStyles.bgImg} />
      <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
        <View style={bubbleStyles.headerContainer}>
          <View style={bubbleStyles.headerTextContainer}>
            <Text style={bubbleStyles.headerText}>Bubbles</Text>
            <Text style={bubbleStyles.headerSubtext}>Categorize conveniently</Text>
          </View>
          <View style={bubbleStyles.headerAddButtonContainer}>
            <Image 
              source={addBubbleIcon}
              style={bubbleStyles.headerAddButton}
            />
          </View>
        </View>
      </View>

      <View style={bubbleStyles.bubbleContainer}>
        
        <ScrollView>
          <View style={bubbleStyles.searchContainer}>
            <SearchBoxBrighter/>
          </View>
          
            
          <MiniBubble bubbleName="DLSU Friends"/>
          <MiniBubble bubbleName="La Familia"/>
          <MiniBubble bubbleName="Work"/>
            
        </ScrollView>
      </View>
    </SafeAreaView>

  );
};

export default Bubble;
