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
import useFetchBubbleMembers from "../hooks/useFetchBubbleMembers";

const AudienceBox = (props) => {
  const editIcon = useIcon("editIcon");
  const trashIcon = useIcon("trashIcon");
  const openIcon = useIcon("openIcon");
  const closeIcon = useIcon("closeIcon");

  const [isStatusMessageVisible, setStatusMessageVisible] = useState(false);
  const [isExcludeContainerVisible, setExcludeContainerVisible] =
    useState(false);
  const [isExcludePersonVisible, setExcludePersonVisible] = useState(false);

  const [isExcludeMorePersonVisible, setExcludeMorePersonVisible] =
    useState(true);

  const openCloseIcon = isExcludePersonVisible ? openIcon : closeIcon;

  //console.log(props.members);
  const [excludeMembers, setExcludeMembers] = useState([]);
  const [statusForMessage, setStatusForMessage] = useState("");
  const [indicator, setIndicator] = useState("");

  const dictionary = {
    "Open to Chat": "openToChat",
    "Be Right Back": "idle",
    "Do Not Disturb": "doNotDisturb",
    Invisible: "invisible",
  };

  useEffect(() => {
    const bubbleRef = doc(database, "bubbles", props.bubbleID);
    const q = query(
      collection(database, "bubble_members"),
      where("bubbleID", "==", bubbleRef)
    );

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const bubbleMembersArray = [];
      const excludeMembersArray = [];
      let counter = 0;

      if (querySnapshot.empty) return;

      setExcludeContainerVisible(false);

      querySnapshot.forEach(async (doc) => {
        counter++;
        const userRef = doc.data().memberID;
        const dataSnap = await getDoc(userRef);

        const bubbles = await useFetchBubbleMembers(bubbleRef, userRef);
        console.log("List of bubbles with memberID: " + bubbles);

        bubbles.map(async (item) => {
          console.log("BUBBEID " + item.bubbleID);
          console.log("Statu " + JSON.stringify(item.statusID));
          console.log(
            "Audience Ind " + JSON.stringify(props.audienceIndicator)
          );
          if (
            item.computerGenerated &&
            JSON.stringify(item.statusID) !=
              JSON.stringify(props.audienceIndicator)
          ) {
            const bubbleCreator = await getDoc(item.creatorID);
            console.log("bubbleCreator " + bubbleCreator.data().userID);
            if (bubbleCreator.data().userID == auth.currentUser.uid) {
              console.log("BUBBEstatus " + item.computerGenerated);
              excludeMembersArray.push(dataSnap.data().name);
              setExcludeContainerVisible(true);
            }
          }
        });

        bubbleMembersArray.push(dataSnap.data().name);

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

          setExcludeMembers(excludeMembersArray);
        }
      });

      const osiSnap = await getDoc(props.audienceIndicator);
      console.log("props.audienceIndicator()");
      console.log(osiSnap.data());
      setIndicator(useIndicator(dictionary[osiSnap.data().osi]));
    });

    return () => unsubscribe();
  }, []);

  console.log("excludeMembers");
  console.log(excludeMembers);

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

            {isExcludeContainerVisible ? (
              <View style={audienceBoxStyles.audienceBoxExcludeHeaderContainer}>
                <Image
                  source={openCloseIcon}
                  style={audienceBoxStyles.audienceBoxExcludeOpenCloseIcon}
                />

                <Text style={audienceBoxStyles.audienceBoxExcludeHeaderText}>
                  Excluding
                </Text>
              </View>
            ) : null}
          </View>
        </TouchableWithoutFeedback>

        {isExcludeContainerVisible ? (
          <View style={audienceBoxStyles.audienceBoxExcludeContainer}>
            {isExcludePersonVisible ? (
              <View style={audienceBoxStyles.audienceBoxExlcudePersonContainer}>
                {excludeMembers.map((item) => {
                  return (
                    <Text
                      style={audienceBoxStyles.audienceBoxExcludePersonText}
                    >
                      {item}
                    </Text>
                  );
                })}

                {/* SEE MORE */}
                {/* {isExcludeMorePersonVisible ? (
                  <TouchableWithoutFeedback
                    onPress={() =>
                      setExcludeMorePersonVisible(!isExcludeMorePersonVisible)
                    }
                  >
                    <Text
                      style={
                        audienceBoxStyles.audienceBoxExcludeSeeMoreLessText
                      }
                    >
                      See 4 more
                    </Text>
                  </TouchableWithoutFeedback>
                ) : (
                  <View>
                    <Text
                      style={audienceBoxStyles.audienceBoxExcludePersonText}
                    >
                      person A
                    </Text>
                    <Text
                      style={audienceBoxStyles.audienceBoxExcludePersonText}
                    >
                      person B
                    </Text>
                    <Text
                      style={audienceBoxStyles.audienceBoxExcludePersonText}
                    >
                      person C
                    </Text>
                    <TouchableWithoutFeedback
                      onPress={() =>
                        setExcludeMorePersonVisible(!isExcludeMorePersonVisible)
                      }
                    >
                      <Text
                        style={
                          audienceBoxStyles.audienceBoxExcludeSeeMoreLessText
                        }
                      >
                        See Less
                      </Text>
                    </TouchableWithoutFeedback>
                  </View>
                )} */}
              </View>
            ) : null}
          </View>
        ) : null}

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

        <TouchableOpacity
          onPress={() => {
            props.bubbleSelectedFunction(props.bubbleID);
            props.bubbleTitleSelectedFunction(props.title);

            props.resetModal(true);
          }}
        >
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
