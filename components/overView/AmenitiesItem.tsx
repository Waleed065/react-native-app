import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { root } from "../../css";

interface schema {
  icon: JSX.Element;
  title: string;
  details: string;
}

export default function AmenitiesItem({
  icon,
  title,
  details,
}: schema): JSX.Element {
  return (
    <View style={styles.container}>
      {icon}
      <Text style={styles.heading}>{title}</Text>
      <Text style={styles.text}>{details}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "49%",
    marginBottom: root.defaultSpace,
    alignItems: "center",
  },
  heading: {
    marginTop: 5,
    color: root.textColor2,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightBold as any,
    textAlign: "center",
  },
  text: {
    marginTop: 5,
    color: root.textColor2,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightThin as any,
    textAlign: "center",
  },
});
