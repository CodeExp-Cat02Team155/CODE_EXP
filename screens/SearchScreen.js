import React, { useState } from "react";
import {
    View,
    FlatList,
    Text,
} from 'react-native'

export default function FavoritesScreen({navigation, keyword}) {

    const [listings, setListings] = useState([{
        type: "store",
        id: "S0001",
        name: "OPPO",
        iconUrl:
            "https://scontent.fsin9-2.fna.fbcdn.net/v/t1.6435-9/56711067_2371221246241957_3865632581156339712_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=uX6Icwxp5coAX_JQptE&_nc_ht=scontent.fsin9-2.fna&oh=39fb345cb548815b26d48b72901a09a9&oe=60CC7B51",
    },
    {
        type: "product",
        id: "P0001",
        name: "Realme 8",
        iconUrl: ""
    }])

    const renderItem = ({ item }) => {
        return (<View>

        </View>)
    }

    return (<View style={{flex: 1}}>
        <FlatList style={{paddingTop: 50}}
            numColumns={2}
            data={listings}
            keyExtractor={(item) => item.id}/>
    </View>)
}