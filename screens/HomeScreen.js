import { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import Airlines from "./Airlines";
import Passengers from "./Passengers";

function HomeScreen(props) {
  const [airlineSelected, setAirlineSelected] = useState(true);
  let showPage = airlineSelected ? <Airlines onPageChange={props.onPageChange}/> : <Passengers onPageChange={props.onPageChange}/>
  let buttonText = airlineSelected ? "Show Passengers" : "Show Airlines";
  function changePageOnClick() {
    airlineSelected ? setAirlineSelected(false) : setAirlineSelected(true);
  }
  return (
    <View style={styles.container}>
      <Button title={buttonText} onPress={changePageOnClick} />
      {showPage}
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginHorizontal: 8,
  },
});
