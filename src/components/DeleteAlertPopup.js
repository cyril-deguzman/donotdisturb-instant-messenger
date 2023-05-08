import React from "react";
import {
  Image,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import useIcon from "../hooks/useIcon";
import { Overlay } from "react-native-elements";
import popupStyles from "./utils/popupStyles";

const DeleteAlertPopup = ({
  is2ndModalVisible,
  set2ndModalVisible,
  set1stModalVisible,
  deleteWhatText,
  deleteFunction,
}) => {
  const deleteAlertIcon = useIcon("deleteAlertIcon");

  const isModalVisible = is2ndModalVisible;
  const setModalVisible = set2ndModalVisible;

  return (
    <View style={popupStyles.popupContainer}>
      <Overlay
        isVisible={isModalVisible}
        onBackdropPress={setModalVisible}
        children={Modal}
        overlayStyle={popupStyles.popupContentContainer}
        animationType="slide"
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      >
        <View style={popupStyles.popupDeleteDescriptionContainer}>
          <Image
            source={deleteAlertIcon}
            style={popupStyles.popupDeleteAlertIcon}
          />

          <Text style={popupStyles.popupDeleteDescriptionText}>
            Are you sure you want to {deleteWhatText}?
          </Text>
        </View>

        <View style={popupStyles.popupCancelDeleteButtonContainer}>
          <TouchableOpacity
            onPress={() => set1stModalVisible(false)}
            style={popupStyles.popupButtonContainer}
          >
            <View>
              <Text style={popupStyles.popupCancelText}>CANCEL</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              deleteFunction();
              set1stModalVisible(false);
            }}
            style={popupStyles.popupButtonContainer}
          >
            <View>
              <Text style={popupStyles.popupDeleteText}>DELETE</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Overlay>
    </View>
  );
};

export default DeleteAlertPopup;
