import React, {useState,  useEffect} from "react";
import { View, Text, Image, TouchableOpacity} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import {firebase} from "../../../config/firebase";

import { ScrollView } from "react-native-gesture-handler";

import Header from "../../components/Header";

import useIndicator from "../../hooks/useIndicator";
import useBackground from "../../hooks/useBackground";
import useIcon from "../../hooks/useIcon";
import messagesStyles from "./utils/messagesStyles";
import statusForSpecificAudienceStyles from "./utils/statusForSpecificAudienceStyles"
import AudienceBox from "../../components/AudienceBox";
import { doc } from "firebase/firestore";

const StatusForSpecificAudience = ({navigation}) => {
  const bgImg = useBackground("topBubbles");
  const indicator = useIndicator("idle");
  const todoBubbles = firebase.firestore().collection('bubbles');
  const todoRefBubbleMembers = firebase.firestore().collection('bubble_members');
  const todoUserDefaultStatus = firebase.firestore().collection('users');
  const [bubbles, setBubbles] = useState([]);
  const [bubbleMembers, setBubbleMembers] = useState([]);

  const [defaultStatus, setDefaultStatus] = useState(null);
  

  useEffect(() => {
    const subscriber = todoUserDefaultStatus
      .doc("1")
      .onSnapshot(documentSnapshot => {
        console.log('OSI data: ', documentSnapshot.data());
        setDefaultStatus(documentSnapshot.data().statusID); 

      });

      return subscriber;


  }, []);


  const userDocRef = doc(firebase.firestore(), "users", "1");

  // useEffect(() => {
  //   const subscriber = todoRefBubbleMembers.doc(bubbleID).onSnapshot(querySnapshot => {
  //       console.log('Total bubbleMembers: ', querySnapshot.size);
  //       setBubbleMembers(
  //         querySnapshot.docs.map((doc) => (    
  //           {
  //           memberID: doc.data().memberID,

  //         }))
  //       );

  //     });

  //     return subscriber;

  // }, []);

  useEffect(() => {
    const subscriber = todoBubbles.where('creatorID', '==', userDocRef).onSnapshot(querySnapshot => {
        console.log('Total bubbles: ', querySnapshot.size);

        setBubbles(
          querySnapshot.docs.map((doc) => 
             

            // useEffect(() => {
            //   const subscriber = todoRefBubbleMembers.where('bubbleID', '==', bubbleDoc).onSnapshot(querySnapshot => {
            //       console.log('Total bubbleMembers: ', querySnapshot.size);
            //       setBubbleMembers(
            //         querySnapshot.docs.map((memberDoc) => (    
            //           {
            //           memberID: memberDoc.data().memberID,
            //         }))
            //       );
          
            //     });
          
            //     return subscriber;
          
            // }, []);
            

            (    
            {
            bubbleID: doc.data().bubbleID,
            creatorID: doc.data().creatorID,
            lastChanged: doc.data().lastChanged.toDate(),
            statusID: doc.data().statusID,
            title: doc.data().title,
            //members: {bubbleMembers},
            //status info: {}
          }))
        );

      });

      return subscriber;

  }, []);

  console.log("bubbles");
  console.log(bubbles);

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
              

              
              {bubbles.map((item) => {

                if(JSON.stringify(item.statusID) != JSON.stringify(defaultStatus))

                  return (
                      
                    <AudienceBox audienceIndicator={indicator} title={item.title}/>

                  );
              })}

            </View>
        </View>
    
    </SafeAreaView>
  )
};

export default StatusForSpecificAudience;
