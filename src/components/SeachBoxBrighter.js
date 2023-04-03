import React from "react";
import { SearchBar } from "@rneui/base";
//import styles from "./utils/styles";
import { StyleSheet } from 'react-native';

const SearchBoxBrighter = ({ value, setValue }) => {
  const updateValue = (value) => {
    setValue(value);
  };

  return (
    <SearchBar
      placeholder="Search"
      onChangeText={updateValue}
      value={value}
      containerStyle={styles.searchBrighterContainer}
      inputContainerStyle={styles.searchBrighterInputContainer}
      inputStyle={styles.searchBrighterInput}
      placeholderTextColor="#AC9EFF"
      searchIcon={{color: "#AC9EFF"}}
    />
  );
};

const styles = StyleSheet.create({
    // search bar brighter version
    searchBrighterContainer: {
      borderTopWidth: 0,
      borderBottomWidth: 0,
      backgroundColor: "transparent",
      paddingLeft: 0,
      paddingRight: 0,
    },
    searchBrighterInputContainer: {
      borderRadius: 10,
      height: 30,
      backgroundColor: "#fff",
      
    },
    searchBrighterInput: { fontSize: 14 },  
});

export default SearchBoxBrighter;
