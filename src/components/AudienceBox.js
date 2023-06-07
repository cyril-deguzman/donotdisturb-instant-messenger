import React, { useState, useLayoutEffect } from "react";
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
  const resetIcon = useIcon("resetIcon");
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

  const [excludeMembers, setExcludeMembers] = useState([]);
  const [bubbleMembers, setBubbleMembers] = useState([]);
  const [statusForMessage, setStatusForMessage] = useState("");
  const [indicator, setIndicator] = useState("");

  const dictionary = {
    "Open to Chat": "openToChat",
    "Be Right Back": "idle",
    "Do Not Disturb": "doNotDisturb",
    Invisible: "invisible",
  };

  useLayoutEffect(() => {
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

        bubbles.map(async (item) => {
          if (
            item.computerGenerated &&
            JSON.stringify(item.statusID) !=
              JSON.stringify(props.audienceIndicator)
          ) {
            const bubbleCreator = await getDoc(item.creatorID);

            if (bubbleCreator.data().userID == auth.currentUser.uid) {
              excludeMembersArray.push(dataSnap.data().name);
              //TO DO
              //setExcludeContainerVisible(true);
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

          //TO DO
          //setExcludeMembers(excludeMembersArray);
          setBubbleMembers(bubbleMembersArray);
        }
      });

      const osiSnap = await getDoc(props.audienceIndicator);

      setIndicator(useIndicator(dictionary[osiSnap.data().osi]));
    });

    return () => unsubscribe();
  }, []);

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
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate(props.route, {
              bubbleID: props.bubbleID,
              bubbleTitle: props.title,
            });
          }}
        >
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
            source={resetIcon}
            style={audienceBoxStyles.audienceBoxTrashIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AudienceBox;
