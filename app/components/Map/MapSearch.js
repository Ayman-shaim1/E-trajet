import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import colors from "../../config/colors";
import axios from "axios";
import settings from "../../config/settings";
import TextInput from "../TextInput";
import Text from "../Text";

export default function MapSearch({ setDestinationLocation }) {
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [text, setText] = useState("");

  const pressGetAddressHandler = item => {
    setText(item.address);
    console.log(item.address);
    console.log(item.location);
    setDestinationLocation(item.location);
    setSearchResult([]);
  };

  const getAddressesHandler = async searchText => {
    setText(searchText);
    if (searchText && searchText !== "") {
      setLoading(true);
      setSearchResult([]);
      try {
        const apiUrl = `https://api.openrouteservice.org/geocode/search?api_key=${settings.openRouteApiKey}&text=${searchText}`;
        const { data } = await axios.get(apiUrl, {
          params: {
            "boundary.country": "MAR",
          },
        });
        if (data.features.length > 0) {
          const nresult = data.features.map(element => {
            return {
              address: element.properties.label,
              location: {
                latitude: element.geometry.coordinates[1],
                longitude: element.geometry.coordinates[0],
              },
            };
          });

          setSearchResult(nresult);
        }
        setLoading(false);
      } catch (error) {
        console.log("error:", error);
        setLoading(false);
        setSearchResult([]);
      }
    } else {
      setSearchResult([]);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder='search for your destination ...'
        value={text}
        onChangeText={text => getAddressesHandler(text)}
      />
      {text !== "" && searchResult.length > 0 && (
        <View style={styles.searchResultContainer}>
          <ScrollView>
            {loading && (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size='large' color={colors.primary} />
              </View>
            )}
            {searchResult.length > 0 &&
              searchResult.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.searchItem}
                  onPress={() => pressGetAddressHandler(item)}>
                  <Text style={styles.itemText}>{item.address}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "5%",
    zIndex: 3000,
    alignSelf: "center",
    marginHorizontal: 10,
  },
  searchResultContainer: {
    backgroundColor: colors.white,
    height: 280,
    justifyContent: "flex-start",
  },
  loaderContainer: {
    marginTop: "30%",
  },
  searchItem: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: colors.light,
    width: "100%",
  
  },
  itemText: {
    fontWeight: "bold",
    fontSize: 15,
  },
});
