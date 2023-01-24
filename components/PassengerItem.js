import { useEffect, useState } from "react";
import axios from "axios";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const client = axios.create({
  baseURL: "https://api.instantwebtools.net/v1",
});

function PassengerItem(props) {
  const [onLoadImage, setLoadImage] = useState(false);

  const deletePassengerItem = () => {
    setLoadImage(true);
    client.delete("passenger/" + props.id).then((response) => {
      setLoadImage(false);
      if (response.status == 200) {
        props.deletePassengerItem(props.id);
      }
    });
  };

  return (
    <Pressable onPress={()=>props.onPageChange(3)}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          defaultSource={require("../assets/images/user.png")}
          source={require("../assets/images/user.png")}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.text}>{props.name}</Text>
          <Text style={styles.text}>{props.trips} Trips</Text>
        </View>
        {onLoadImage ? (
          <ActivityIndicator color="red" size={"small"} />
        ) : (
          <Pressable onPress={deletePassengerItem}>
            <Image
              style={styles.deleteImage}
              source={require("../assets/images/delete.png")}
            />
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}

export default PassengerItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    margin: 8,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
  },
  deleteImage: {
    width: 16,
    height: 16,
    marginEnd: 8,
  },
  text: {
    fontSize: 18,
    color: "black",
  },
});
