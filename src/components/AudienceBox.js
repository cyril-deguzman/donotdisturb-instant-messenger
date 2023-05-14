import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import useIcon from "../hooks/useIcon";
import audienceBoxStyles from "./utils/audienceBoxStyles";
import useIndicator from "../hooks/useIndicator";

//import {firebase} from "../../../config/firebase";

import {
  collection,
  query,
  where,
  getDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { auth, database } from "../../config/firebase";

const AudienceBox = (props) => {
  const editIcon = useIcon("editIcon");
  const trashIcon = useIcon("trashIcon");
  const openIcon = useIcon("openIcon");
  const closeIcon = useIcon("closeIcon");

  const [isStatusMessageVisible, setStatusMessageVisible] = useState(false);
  const [isExcludeContainerVisible, setExcludeContainerVisible] =
    useState(true);
  const [isExcludePersonVisible, setExcludePersonVisible] = useState(false);

  const [isExcludeMorePersonVisible, setExcludeMorePersonVisible] =
    useState(true);

  const openCloseIcon = isExcludePersonVisible ? openIcon : closeIcon;

  //console.log(props.members);
  const [bubbleMembers, setBubbleMembers] = useState([]);
  const [statusForMessage, setStatusForMessage] = useState("");
  const [indicator, setIndicator] = useState("");

  useEffect(() => {
    const q = query(collection(database, "bubble_members"));

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const bubbleMembersArray = [];
      let counter = 0;

      if (querySnapshot.empty) return;

      querySnapshot.forEach(async (doc) => {
        counter++;
        const userRef = doc.data().memberID;
        const dataSnap = await getDoc(userRef);
        const bubbleSnap = await getDoc(doc.data().bubbleID);

        console.log("usee");
        // console.log(dataSnap.data());
        console.log(bubbleSnap.data().bubbleID);
        console.log(props.bubbleID);

        if (bubbleSnap.data().bubbleID == props.bubbleID) {
          bubbleMembersArray.push(dataSnap.data().name);
        }

        if (querySnapshot.size == counter) {
          if (bubbleMembersArray.length == 1)
            setStatusForMessage("Status for: " + bubbleMembersArray[0]);
          else if (bubbleMembersArray.length == 2)
            setStatusForMessage(
              "Status for: " +
                bubbleMembersArray[0] +
                ", " +
                bubbleMembersArray[1]
            );
          else
            setStatusForMessage(
              "Status for: " +
                bubbleMembersArray[0] +
                ", " +
                bubbleMembersArray[1] +
                ", and " +
                (bubbleMembersArray.length - 2).toString() +
                " more"
            );

          setBubbleMembers(bubbleMembersArray);
        }
      });

      const osiSnap = await getDoc(props.audienceIndicator);
      console.log("props.audienceIndicator()");
      console.log(osiSnap.data());
      if (osiSnap.data().osi == "Open To Chat")
        setIndicator(useIndicator("openToChat"));
      else if (osiSnap.data().osi == "Be Right Back")
        setIndicator(useIndicator("idle"));
      else if (osiSnap.data().osi == "Do Not Disturb")
        setIndicator(useIndicator("doNotDisturb"));
      else if (osiSnap.data().osi == "Invisible")
        setIndicator(useIndicator("invisible"));
    });

    // const osiSnap = getDoc(props.audienceIndicator);
    // console.log("osiSnap");
    // console.log(osiSnap);
    // if(osiSnap.data().osi == "Open To Chat")
    //     setIndicator("openToChat");

    // else if(osiSnap.data().osi == "Be Right Back")
    //     setIndicator("idle");

    // else if(osiSnap.data().osi == "Do Not Disturb")
    //     setIndicator("doNotDisturb");

    // else if(osiSnap.data().osi == "Invisible")
    //     setIndicator("invisible");

    return () => unsubscribe();
  }, []);

  console.log("bubbleMembers");
  console.log(statusForMessage);

  //   console.log("bubbleMembers");
  //   console.log(bubbleMembers);

  // const osiSnap = getDoc(props.audienceIndicator);
  //         console.log("osiSnap");
  //         console.log(osiSnap);

  return (
    <View style={audienceBoxStyles.audienceBoxContainer}>
      <View>
        <Image
          source={indicator}
          style={audienceBoxStyles.audienceBoxIndicator}
        />
      </View>
      <View style={audienceBoxStyles.audienceBoxTextContainer}>
        {isStatusMessageVisible ? (
          <Text style={audienceBoxStyles.audienceBoxStatusMessageText}>
            "Finals snz ;-;"
          </Text>
        ) : null}

        <Text style={audienceBoxStyles.audienceBoxAudienceNameText}>
          {props.title}
        </Text>
        {/* TO DO: Add exlude functionality */}
        <TouchableWithoutFeedback
          onPress={() => setExcludePersonVisible(!isExcludePersonVisible)}
        >
          <View>
            <Text style={audienceBoxStyles.audienceBoxNameListText}>
              {statusForMessage}
            </Text>

            {/* {isExcludeContainerVisible ? (
                            <View style={audienceBoxStyles.audienceBoxExcludeHeaderContainer}>
                                <Image
                                    source={openCloseIcon}
                                    style={audienceBoxStyles.audienceBoxExcludeOpenCloseIcon}
                                />

                                <Text style={audienceBoxStyles.audienceBoxExcludeHeaderText}>Excluding</Text>
                                
                            </View>
                        ) : null} */}
          </View>
        </TouchableWithoutFeedback>
        {/*
                {isExcludeContainerVisible ? (
                    <View style={audienceBoxStyles.audienceBoxExcludeContainer}>
                        {isExcludePersonVisible ? (
                            <View style={audienceBoxStyles.audienceBoxExlcudePersonContainer}>
                                <Text style={audienceBoxStyles.audienceBoxExcludePersonText}>person A</Text>
                                <Text style={audienceBoxStyles.audienceBoxExcludePersonText}>person B</Text>
                                <Text style={audienceBoxStyles.audienceBoxExcludePersonText}>person C</Text>

                                {isExcludeMorePersonVisible ? (
                                    <TouchableWithoutFeedback onPress={() => setExcludeMorePersonVisible(!isExcludeMorePersonVisible)}>
                                        <Text style={audienceBoxStyles.audienceBoxExcludeSeeMoreLessText}>See 4 more</Text>
                                    </TouchableWithoutFeedback>
                                ): (
                                    <View>
                                        <Text style={audienceBoxStyles.audienceBoxExcludePersonText}>person A</Text>
                                        <Text style={audienceBoxStyles.audienceBoxExcludePersonText}>person B</Text>
                                        <Text style={audienceBoxStyles.audienceBoxExcludePersonText}>person C</Text>
                                        <TouchableWithoutFeedback onPress={() => setExcludeMorePersonVisible(!isExcludeMorePersonVisible)}>
                                            <Text style={audienceBoxStyles.audienceBoxExcludeSeeMoreLessText}>See Less</Text>
                                        </TouchableWithoutFeedback>
                                    </View>
                                )}
                                
                                
                            </View>
                        ): null}
                        
                    </View>
                ): null} */}

        {/* TO DO: ADD STATUS CLEAR INFO  */}
        {/* <Text style={audienceBoxStyles.audienceBoxClearStatusText}>Status will clear after tomorrow 8:30 PM</Text> */}
      </View>
      <View style={audienceBoxStyles.audienceBoxIconsContainer}>
        <TouchableOpacity>
          <Image
            source={editIcon}
            style={audienceBoxStyles.audienceBoxEditIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={trashIcon}
            style={audienceBoxStyles.audienceBoxTrashIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AudienceBox;
