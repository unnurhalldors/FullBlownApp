import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16
  },
  header_text: {
    color: "black",
    fontSize: 30,
    fontFamily: "Verdana"
  },
  avatar: {
    width: 210,
    height: 210,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgb(193, 193, 193)",
    backgroundColor: "white",
    marginBottom: 10
  }
});

const DetailScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text>hello</Text>
  </View>
);

export default DetailScreen;
