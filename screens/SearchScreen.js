import React, { useState } from "react";
import { FlatList, View } from "react-native";
import StoreListing from "../listings/StoreListing";
import ProductListing from "../listings/ProductListing";
import productList from "../local_data/list_product.json";
import storeList from "../local_data/list_store.json";

export default function SearchScreen({ navigation, keyword }) {
  const matchedStores = storeList.stores.filter((store) =>
    store.name.toLowerCase().includes(keyword.toLowerCase())
  );
  const matchedProducts = productList.list.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase())
  );

  const listings = [...matchedStores, ...matchedProducts];

  const renderItem = ({ item }) => {
    if (item.type == "store")
      return <StoreListing item={item} navigation={navigation} />;
    else return <ProductListing item={item} navigation={navigation} />;
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <FlatList
        fadingEdgeLength={20}
        style={{ marginTop: 30, paddingTop: 20 }}
        numColumns={2}
        data={listings}
        renderItem={renderItem}
        keyExtractor={(item) => item.type + item.id}
      />
    </View>
  );
}
