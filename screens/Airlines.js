import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, FAB } from "react-native-paper";
import AirLineListItem from "../components/AirLineListItem";

const client = axios.create({
  baseURL: "https://api.instantwebtools.net/v1/airlines",
});

function Airlines(props) {
  const [airlines, setAirlines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  async function getAirlines() {
    try {
      await client.get().then((response) => {
        setAirlines(response.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getAirlines();
  }, []);
  return (
    <View style={styles.container}>
      {isLoading && (
        <ActivityIndicator style={styles.loader} color="blue" size={"large"} />
      )}
      {!isLoading && <Text style={styles.text}>List of Airlines</Text>}
      {!isLoading && (
        <View style={{ flex: 1 }}>
          <FlatList
            data={airlines}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            renderItem={(airline) => {
              return (
                <AirLineListItem
                  name={airline.item.name}
                  logo={airline.item.logo}
                  onPageChange={props.onPageChange}
                  slogan={airline.item.slogan}
                />
              );
            }}
          />
        </View>
      )}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => Alert.alert("Add Airline Screen is not implemented")}
      />
    </View>
  );
}

export default Airlines;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 16,
  },
  loader: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
