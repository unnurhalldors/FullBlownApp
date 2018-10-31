import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 30
  },
  concertMainInfo: {
    flex: 1,
    alignItems: "center"
  },
  concertInfo: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(247,247,247,1.0)"
  },
  concertType: {
    color: "rgb(252, 158, 35)",
    fontWeight: "bold"
  },
  headerText: {
    color: "rgb(47, 49, 51)",
    fontWeight: "bold",
    fontFamily: "Arial",
    fontSize: 20,
    textAlign: "center"
  },
  imageView: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 1.2
  },
  image: {
    width: 300,
    height: 210,
    marginBottom: 20
  }
});

const DetailScreen = ({ navigation }) => (
  <View style={styles.container}>
    <View style={styles.imageView}>
      <Image
        style={styles.image}
        source={{ uri: navigation.state.params.imageSource }}
      />
    </View>
    <View style={styles.concertMainInfo}>
      <Text style={styles.headerText}>
        {navigation.state.params.eventDateName}
      </Text>
      <Text style={styles.concertType}>
        {navigation.state.params.name.toUpperCase()}
      </Text>
    </View>
    <View style={styles.concertInfo}>
      <Text>
        {new Date(navigation.state.params.dateOfShow).toLocaleString("is-IS")}
      </Text>
      <Text>{navigation.state.params.eventHallName}</Text>
      <Text>{navigation.state.params.userGroupName}</Text>
    </View>
  </View>
);

export default DetailScreen;
