import React from "react";
import { View, Text, StyleSheet } from "react-native";

/* All styles */
const styles = StyleSheet.create({
  footer: {
    flex: 1,
    backgroundColor: "rgba(247,247,247,1.0)",
    padding: 17,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    marginRight: 16
  },
  footerText: {
    color: "rgb(47, 49, 51)",
    fontFamily: "Arial",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center"
  },
  footerTextTwo: {
    color: "black",
    fontFamily: "Verdana",
    fontSize: 12,
    textAlign: "center"
  }
});

/* Just for decoration */
class ListFooter extends React.Component {
  render() {
    return (
      <View style={styles.footer}>
        <Text style={styles.footerText}>Genius is patience.</Text>
        <Text style={styles.footerTextTwo}>-Isaak Newton</Text>
      </View>
    );
  }
}

export default ListFooter;
