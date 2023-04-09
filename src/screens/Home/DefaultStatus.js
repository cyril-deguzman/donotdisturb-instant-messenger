import React from "react";
import {firebase} from "../../../config/firebase";
//import { auth, database } from "../../config/firebase";

import { useState, useEffect  } from "react";
import { StyleSheet, Image, Text, View, ImageBackground, Button, TouchableOpacity, TextInput } from "react-native";
//import { useNavigation } from "@react-navigation/native";
//import RadioGroup from 'react-native-radio-buttons-group';
import useBackground from "../../hooks/useBackground";
import defaultStatusStyles from "./utils/defaultStatusStyles";
import HeaderSave from "../../components/HeaderSave";
import messagesStyles from "./utils/messagesStyles";

import RadioButton from "../../components/RadioButton";
import useIndicator from "../../hooks/useIndicator";

const profileImg = require("../../assets/profile-picture.png");


const DefaultStatus = ({navigation}) => {

  const todoRef = firebase.firestore().collection('online_statuses');

  
  const bgImg = useBackground("topBubbles");

  const [option, setOption] = useState(null);
  const [customMessageValue, onChangeText] = useState(null);


    useEffect(() => {
      const subscriber = todoRef
        .doc("1")
        .onSnapshot(documentSnapshot => {
          console.log('OSI data: ', documentSnapshot.data());
          setOption(documentSnapshot.data().osi); 
          onChangeText(documentSnapshot.data().message);
        });

        return subscriber;
  

    }, []);


  const data = [
    { value: 'Open to Chat', indicator: useIndicator("openToChat") },
    { value: 'Be Right Back', indicator: useIndicator("idle")},
    { value: 'Do Not Disturb', indicator: useIndicator("doNotDisturb") },
    { value: 'Invisible', indicator: useIndicator("invisible") },
  ];



  function updateUserStatusFunction(navigation)
  {

      const todoRef = firebase.firestore().collection('online_statuses');
      todoRef.doc("1").update({
        osi: option,
        message: customMessageValue,
      })
      .then(() => {
        console.log('Status updated!');
        navigation.goBack();
      }).catch(error => console.error(error));

      

  }


  todoRef.get().then(querySnapshot => {
    console.log('Total status: ', querySnapshot.size);

    querySnapshot.forEach(documentSnapshot => {
      console.log('Status: ', documentSnapshot.id, documentSnapshot.data());
    });
  });

  // todoRef.doc("1").get().then(documentSnapshot => getUsername(documentSnapshot))
  // .then(username => {
  //   console.log('Username is: ', username);
  // });

  function renderElement(){
    if(option == 'Open to Chat')
      return <Image
          style={defaultStatusStyles.CurrentStatusOSI}
          source={useIndicator("openToChat")}
        />;
      
    else if(option == 'Be Right Back')
        return <Image
        style={defaultStatusStyles.CurrentStatusOSI}
        source={useIndicator("idle")}
      />;

    else if(option == 'Do Not Disturb')
      return <Image
      style={defaultStatusStyles.CurrentStatusOSI}
      source={useIndicator("doNotDisturb")}
    />;

    else if(option == 'Invisible')
      return <Image
      style={defaultStatusStyles.CurrentStatusOSI}
      source={useIndicator("invisible")}
    />;
  
 };
 

  


  return <View style={defaultStatusStyles.HomeDefaultStatusInvisible}>

    <Image source={bgImg} style={messagesStyles.bgImg} />
    
    

    <HeaderSave title="Default Status" navigation={navigation} function={updateUserStatusFunction}/>
  <View style={defaultStatusStyles.TopHalf}>



    <View style={defaultStatusStyles.CurrentStatus}>

    

      <Image
        style={defaultStatusStyles.HeaderBG}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/n74etfy6woq-1300%3A15161?alt=media&token=cd037038-523d-4f2c-9e9d-2dcd78c5b6cd",
        }}
      />

      <Image
          style={defaultStatusStyles.ProfilePic}
          source= {profileImg}
        />
      
      
      {renderElement()}


      

      <Text style={defaultStatusStyles.UserName}>Leana Hyacinth Rebong</Text>
      <Text style={defaultStatusStyles.UserCustomMessage}>{customMessageValue}</Text>
    </View>
  </View>



  <View style={defaultStatusStyles.BottomHalf}>
    <Text style={defaultStatusStyles.SetYourDefaultStatusText}>Set Your Default Status</Text>
    <Text style={defaultStatusStyles.SetYourDefaultStatusDesc}>
      Lorem ipsum explanation, etc, etc. Lorem ipsum explanation, etc, etc.
      Lorem ipsum{" "}
    </Text>
    <Text style={defaultStatusStyles.DefaultStatusText}>Default Status</Text>


{/* /RADIO  BUTTON*/}
    <View style={defaultStatusStyles.Osilist}>
      <RadioButton data={data} onSelect={(value) => setOption(value)} current={option} /> 
      {/* <Text>{option}</Text> */}
    </View>


    <View style={defaultStatusStyles.SetStatusMessageGroup}>

        <View style={defaultStatusStyles.SetStatusMessageGroupHeader}>
          <Text style={defaultStatusStyles.SetStatusMessageText}>Set Status Message</Text>
          <Text style={defaultStatusStyles.OptionalText}>(optional)</Text>
        </View>

        <TextInput style={defaultStatusStyles.SetStatusMessageTextBox}
        editable
        multiline
        numberOfLines={1}
        maxLength={40}
        onChangeText={text => onChangeText(text)}
        value={customMessageValue}
        />

    </View>

  </View>
  
  
</View>

};



export default DefaultStatus;
