import React, {useState} from "react";
import { View, Text, Image, TouchableOpacity} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScrollView } from "react-native-gesture-handler";

import Header from "../../components/Header";

import useIndicator from "../../hooks/useIndicator";
import useBackground from "../../hooks/useBackground";
import useIcon from "../../hooks/useIcon";
import messagesStyles from "./utils/messagesStyles";
import statusForSpecificAudienceStyles from "./utils/statusForSpecificAudienceStyles"
import AudienceBox from "../../components/AudienceBox";

const StatusForSpecificAudience = ({navigation}) => {
  const bgImg = useBackground("topBubbles");
  const indicator = useIndicator("idle");

  return (
    <SafeAreaView style={statusForSpecificAudienceStyles.container}>
      <Image source={bgImg} style={messagesStyles.bgImg} />
      <Header title="Status for Specific Audience" navigation={navigation}/>

 
        <View style={statusForSpecificAudienceStyles.bgContainer}>
          
          
            <View style={statusForSpecificAudienceStyles.descriptionContainer}>
              <View style={statusForSpecificAudienceStyles.descriptionTextContainer}>
                <Text style={statusForSpecificAudienceStyles.descriptionTextHeader}>Set Status to Specific Audience</Text>
                <Text style={statusForSpecificAudienceStyles.descriptionTextContent}>You can create an audience to set them to a specific status that is different from your default status. If a duration is set, your status for that audience will return to your default status after the set duration.</Text>
              </View>
            </View>
        
          
            <View style={statusForSpecificAudienceStyles.audienceContainer}>
              <View style={statusForSpecificAudienceStyles.audienceContainerHeader}>
                <Text style={statusForSpecificAudienceStyles.audienceContainerTextHeader}>Select Audience</Text>

                <TouchableOpacity>
                  <View>
                    <Text>+ ADD</Text>
                  </View>
                </TouchableOpacity>
              </View>
              
              <AudienceBox audienceIndicator={indicator}/>

            </View>
        </View>
    
    </SafeAreaView>
  )
};

export default StatusForSpecificAudience;
