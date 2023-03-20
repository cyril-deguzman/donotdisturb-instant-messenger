import React from "react";
import { SearchBar } from "@rneui/base";
import styles from "./utils/styles";

const SearchBox = ({ value, setValue }) => {
  const updateValue = (value) => {
    setValue(value);
  };

  return (
    <SearchBar
      placeholder="Search"
      onChangeText={updateValue}
      value={value}
      containerStyle={styles.searchContainer}
      inputContainerStyle={styles.searchInputContainerWhite}
      inputStyle={styles.searchInput}
    />
  );
};

export default SearchBox;