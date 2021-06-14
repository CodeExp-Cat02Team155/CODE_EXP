import React, { useState } from "react";
import { Image, FlatList, StyleSheet, Text, View } from "react-native";
import StoreListing from "../listings/StoreListing";
import ProductListing from "../listings/ProductListing";

export default function SearchScreen({ navigation, keyword }) {
  const [listings, setListings] = useState([
    {
      type: "store",
      id: "S0001",
      name: "OPPO",
      followers: 65000,
      iconUrl:
        "https://scontent.fsin9-2.fna.fbcdn.net/v/t1.6435-9/56711067_2371221246241957_3865632581156339712_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=uX6Icwxp5coAX_JQptE&_nc_ht=scontent.fsin9-2.fna&oh=39fb345cb548815b26d48b72901a09a9&oe=60CC7B51",
    },
    {
      type: "product",
      id: "P0001",
      name: "OPPO Reno 5 Pro",
      iconUrl:
        "https://laz-img-sg.alicdn.com/p/2af2af5550a6a6f199a7df742e0613ee.jpg_720x720q80.jpg_.webp",
      currentPrice: 819,
      rrp: 899,
    },
    {
      type: "product",
      id: "P0002",
      name: "OPPO Reno 5",
      iconUrl:
        "https://laz-img-sg.alicdn.com/p/a018a1db4a6fd13e414c369093de8de9.jpg_720x720q80.jpg_.webp",
      currentPrice: 559,
      rrp: 699,
    },
  ]);

  const renderItem = ({ item }) => {
    if (item.type == "store")
      return <StoreListing item={item} navigation={navigation} />;
    else return <ProductListing item={item} navigation={navigation} />;
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <FlatList
        fadingEdgeLength={50}
        style={{ marginTop: 30, paddingTop: 20 }}
        numColumns={2}
        data={listings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
