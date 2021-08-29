import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { root } from "../css";

interface schema {
  loading: boolean;
  style?: any;
}
export default function LoadingIndicator({
  loading,
  style,
}: schema): JSX.Element {
  return (
    <>
      {loading && (
        <View style={[styles.container, style]}>
          <ActivityIndicator
            animating={loading}
            color={root.primaryThemeColor}
            size={50}
            hidesWhenStopped={true}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
    zIndex: 10000000,
  },
});
