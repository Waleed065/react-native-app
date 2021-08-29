import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { root } from "../../css";

interface aboutThisPlaceSchema {
  about: string;
}
export default function AboutThisPlace({
  about,
}: aboutThisPlaceSchema): JSX.Element {
  const [readMore, setReadMore] = useState(false);

  return (
    <View style={styles.aboutContainer}>
      <Text style={styles.heading}>About</Text>
      <Text
        style={styles.text}
        numberOfLines={!readMore ? 5 : undefined}
        ellipsizeMode={"tail"}
      >
        {about}
      </Text>
      <TouchableOpacity
        activeOpacity={root.activeOpacity}
        onPress={() => setReadMore(!readMore)}
      >
        <Text style={styles.smallFont}>
          {!readMore ? "Read More" : "Read Less"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  aboutContainer: {
    padding: root.defaultSpace,
  },
  heading: {
    color: root.textColor2,
    fontSize: root.textSizeLarge,

    fontWeight: root.textWeightBold as any,
  },

  text: {
    marginTop: 5,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightThin as any,
    color: root.textColor2,
  },
  smallFont: {
    marginTop: 5,
    fontSize: root.textSizeSmall,
    fontWeight: root.textWeightThin as any,
    color: root.textColor3,
  },
});
