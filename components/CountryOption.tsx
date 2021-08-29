import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { root } from "../css";
import formattedTitle from "../utils/formattedTitle";

interface schema {
  onPress: ({
    callingCode,
    emoji,
  }: {
    callingCode: string;
    emoji: string;
  }) => void;
  item: any;
}

const CountryOption = ({ onPress, item }: schema): JSX.Element => {
  const { callingCodes, emoji, name } = item;
  // console.log(name);

  return (
    <TouchableOpacity
      onPress={() => onPress({ callingCode: callingCodes[0], emoji })}
      style={styles.itemContainer}
    >
      <Text style={{ fontSize: 20 }}>{emoji}</Text>

      <Text style={styles.itemText}>{formattedTitle(name)}</Text>
    </TouchableOpacity>
  );
};

function checkProps() {
  return true;
}

export default memo(CountryOption, checkProps);

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    height: 50,
    width: "100%",
  },
  itemText: {
    color: root.textColor2,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightThin as any,
    marginLeft: 5,
  },
});
