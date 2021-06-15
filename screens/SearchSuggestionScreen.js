import React, { useState } from "react";
import { View, FlatList, Text } from "react-native";

export default function SearchSuggestionScreen({ keyword }) {
  function getData() {
    console.log(global.searchHistory.length);
    return [keyword, ...global.searchHistory];
  }

  const renderItem = ({ item }) => {
    return <Text>{item}</Text>;
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <View style={{ flex: 2 }} />
      <FlatList
        style={{ flex: 1 }}
        keyExtractor={(item) => item}
        data={getData()}
        renderItem={renderItem}
      />
    </View>
  );
}
