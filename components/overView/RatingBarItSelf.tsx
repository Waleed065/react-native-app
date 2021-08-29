import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { root } from "../../css";
import { abbreviateNumber } from "../../utils";

interface schema {
  barNumber: number;
  totalReviews: number;
  recievedReviews: number;
}

export default function ReviewBar({
  barNumber,
  totalReviews,
  recievedReviews,
}: schema): JSX.Element {
  const animatedBarWidth = useRef(new Animated.Value(0)).current;
  const [barWidth, setBarWidth] = useState(0);

  const barWidthPercent: number =
    recievedReviews && recievedReviews <= totalReviews
      ? (recievedReviews / totalReviews) * 100
      : 0;

  useEffect(() => {
    if (barWidthPercent > 100 || barWidthPercent < 0) return;
    const newValue = 2.4 * barWidthPercent;
    Animated.timing(animatedBarWidth, {
      toValue: newValue,
      duration: 400,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  }, [barWidth]);

  useEffect(() => {
    setBarWidth(barWidthPercent);
  }, [barWidthPercent]);

  return (
    <View style={styles.container}>
      <View style={styles.rightMargin}>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode={"tail"}>
          {barNumber} Stars
        </Text>
      </View>
      <View
        style={styles.barContainer}
        onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}
      >
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [{ translateX: animatedBarWidth }],
            },
          ]}
        />
      </View>
      <View style={styles.leftMargin}>
        <Text
          style={styles.text}
          numberOfLines={1}
          ellipsizeMode={"tail"}
        >{`(${abbreviateNumber(recievedReviews)})`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    color: root.textColor2,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightThin as any,
  },
  rightMargin: {
    marginRight: 5,
    width: 60,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  leftMargin: {
    marginLeft: 5,
    width: 50,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  barContainer: {
    flex: 1,
    width: 240,
    height: root.textSizeNormal,
    borderRadius: 1000,
    backgroundColor: root.bgColor2,
    zIndex: 0,
    overflow: "hidden",
  },
  bar: {
    position: "absolute",
    left: "-100%",
    height: "100%",
    top: 0,
    width: "100%",
    zIndex: 1,
    borderRadius: 1000,
    backgroundColor: root.primaryThemeColor,
  },
});
