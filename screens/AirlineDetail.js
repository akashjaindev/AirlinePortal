import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, Image, StyleSheet, Text, View } from "react-native";

const client = axios.create({
  baseURL: "https://api.instantwebtools.net/v1/airlines/1",
});
function AirlineDetail(props) {
  const [airline, setAirline] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [onLoadImage, setLoadImage] = useState(false);

  const imageLoading = () => {
    setLoadImage(true);
  };

  async function getAirlineDetail() {
    try {
      await client.get().then((response) => {
        setAirline(response.data)
        setIsLoading(false);
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAirlineDetail();
  }, []);

  return (
    <View style={styles.mainContainer}>
      {isLoading ? (
        <ActivityIndicator style={styles.loader} size={"large"} />
      ) : (
        <View style={styles.container}>
          <Image
            style={styles.image}
            onLoad={() => imageLoading()}
            defaultSource={require("../assets/images/airplane.png")}
            resizeMode="stretch"
            source={
              onLoadImage && airline.logo !== ""
                ? { uri: airline.logo, cache: "reload" }
                : require("../assets/images/airplane.png")
            }
          />
          <View style={styles.textContainer}>
            <Text style={styles.textLabel}>Name</Text>
            <Text style={styles.textValue}>{airline.name}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textLabel}>Country</Text>
            <Text style={styles.textValue}>{airline.country}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textLabel}>Established</Text>
            <Text style={styles.textValue}>{airline.established}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textLabel}>Slogan</Text>
            <Text style={styles.textValue}>{airline.slogan}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textLabel}>Head Quaters</Text>
            <Text style={styles.textValue}>{airline.head_quaters}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textLabel}>Website</Text>
            <Text style={styles.textValue}>{airline.website}</Text>
          </View>
          <Button title="Load Home Page" onPress={()=> props.onPageChange(1)}/>
        </View>
      )}
    </View>
  );
}

export default AirlineDetail;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    paddingTop: 16,
    marginTop: 80,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  loader: {
    flex: 1,
  },
  textContainer: {
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  textLabel: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  textValue: {
    color: "black",
    fontSize: 14,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom:24
  },
});
