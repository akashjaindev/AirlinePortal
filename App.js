import { useState } from "react";
import { StyleSheet, View } from "react-native";
import AirlineDetail from "./screens/AirlineDetail";
import HomeScreen from "./screens/HomeScreen";
import PassengerDetail from "./screens/PassengerDetail";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);

  function setPage(page) {
    setCurrentPage(page);
  }

  let screen =
    currentPage == 1 ? (
      <HomeScreen onPageChange={setPage} />
    ) : currentPage == 2 ? (
      <AirlineDetail onPageChange={setPage}/>
    ) : (
      <PassengerDetail onPageChange={setPage}/>
    );

  return <View style={styles.container}>{screen}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
