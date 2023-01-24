import { useEffect, useState } from "react";
import axios from "axios";
import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PassengerItem from "../components/PassengerItem";
import { ActivityIndicator, FAB, Searchbar } from "react-native-paper";

const client = axios.create({
  baseURL: "https://api.instantwebtools.net/v1",
});

function Passengers(props) {
  const [passengers, setPassengers] = useState([]);
  const [filteredPassengers, setFilteredPassengers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMorePages, setMorePages] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  function onChangeSearch(query) {
    setSearchQuery(query);
    if (query.trim() == "") {
      setFilteredPassengers(
        passengers.filter((item) => {
          return true;
        })
      )
    } else {
      setFilteredPassengers(
        passengers.filter((item) => {
          const itemData = item.name
            ? item.name.toUpperCase()
            : "".toUpperCase();
          const textData = query.toUpperCase();
          const result = itemData.startsWith(textData);
          return result;
        })
      );
    }
  }

  function deletePassengerItem(passengerId) {
    Alert.alert("Passenger deleted!");
  }

  async function getPassengers() {
    try {
      await client.get("passenger?size=100&page=" + page).then((response) => {
        setPassengers((list) => [...list, ...response.data.data])
        setFilteredPassengers((list) => [...list, ...response.data.data])
        // onChangeSearch(searchQuery);
        setIsLoading(false);
        if (response.data.totalPages > page) {
          setMorePages(true);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getPassengers();
  }, [page]);

  function fetchMoreData() {
    if (hasMorePages) {
      setPage(page + 1);
    }
  }

  const renderHeader = ()=>(
    <View style={styles.headerText}>
    <Searchbar
      placeholder="Search Passenger"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
    <Text style={styles.text}>List of Passengers</Text>
  </View>
  )

  const renderFooter = ()=>(
    <View style={styles.footerText}>
    {hasMorePages ? (
      <Text>Loading Data</Text>
    ) : (
      <Text>No more Passengers at the moment</Text>
    )}
  </View>
  )

  const renderEmpty = () => (
    <View style={styles.emptyText}>
      <Text>No Data at the moment</Text>
      <Button
        onPress={() => {
          setPage(0);
          setIsLoading(true);
          setSearchQuery("");
          getPassengers();
        }}
        title="Refresh"
      />
    </View>
  );
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={styles.loader} color='blue' size={"large"} />
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            stickyHeaderIndices={[0]}
            contentContainerStyle={{ flexGrow: 1 }}
            data={filteredPassengers}
            keyExtractor={(item, index) => {
              return item.toString() + index;
            }}
            renderItem={(passenger) => {
              return (
                <PassengerItem
                  id={passenger.item._id}
                  name={passenger.item.name}
                  trips={passenger.item.trips}
                  onPageChange={props.onPageChange}
                  deletePassengerItem={deletePassengerItem}
                />
              );
            }}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
            onEndReachedThreshold={0.2}
            onEndReached={fetchMoreData}
          />
        </View>
      )}
      <FAB
      icon="plus"
      style={styles.fab}
      onPress={() => Alert.alert("Add Passenger Screen is not implemented") }
  />
    </View>
  );
}

export default Passengers;

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
    marginVertical: 8,
  },
  footerText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  headerText: {
    backgroundColor: "white",
  },
  emptyText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
