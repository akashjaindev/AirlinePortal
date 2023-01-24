import { Button, StyleSheet, Text, View } from "react-native";

function PassengerDetail(props) {
  return (
    <View style={styles.container}>
    <Text>This is passenger detail page</Text>
    <Button title="Load Home Page" onPress={()=> props.onPageChange(1)}/>
    </View>
  );
}

export default PassengerDetail;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });