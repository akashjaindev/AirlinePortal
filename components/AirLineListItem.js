import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

function AirLineListItem(props) {
  const [onLoadImage, setLoadImage] = useState(false);

  const imageLoading = () => {
    setLoadImage(true);
  };
  return (
    <Pressable onPress={()=>props.onPageChange(2)}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          onLoad={() => imageLoading()}
          defaultSource={require("../assets/images/airplane.png")}
          resizeMode="stretch"
          source={
            onLoadImage && props.logo !== ""
              ? { uri: props.logo, cache: "reload" }
              : require("../assets/images/airplane.png")
          }
        />
        <View>
          <Text style={styles.text}>{props.name}</Text>
          <Text>{props.slogan}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default AirLineListItem;

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
  text: {
    fontSize: 16,
    color: "black",
  },
});
