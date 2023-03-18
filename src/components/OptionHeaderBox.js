import React from "react";
import { View, Text} from "react-native";
import styles from "./utils/styles";

const OptionHeaderBox = props => {
    return (
      <View style={styles.optionHeaderContainer}>
        <Text style={styles.optionHeaderText}>
          {props.header}
        </Text>
      </View>
    )
  };

export default OptionHeaderBox;
