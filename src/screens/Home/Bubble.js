import React from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

import SearchBoxBrighter from "../../components/SeachBoxBrighter";
import useBackground from "../../hooks/useBackground";
import bubbleStyles from "./utils/bubbleStyles";
import { ScrollView } from "react-native-gesture-handler";
import useIcon from "../../hooks/useIcon";
import MiniBubble from "../../components/MiniBubble";

const Bubble = () => {  
  const bgImg = useBackground("bubbles");
  const addBubbleIcon = useIcon("addBubbleIcon");

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView style={bubbleStyles.container}>
      <Image source={bgImg} style={bubbleStyles.bgImg} />
      <View style={bubbleStyles.headerContainerShadow}>
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
            <SearchBoxBrighter setValue={setSearchQuery} value={searchQuery} />
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
