import { Platform, Dimensions } from "react-native";

const primaryThemeColor = "#c4a459";
const primaryThemeColorLite = "#efd9aa";
const defaultSpace = 15;
const { width, height } = Dimensions.get("window");

export const root = {
  primaryThemeColor,
  primaryThemeColorLite,
  secondaryThemeColor: "#886033",
  bgColor1: "#fff",
  bgColor2: "#d3d3d3",
  textColor1: "#fff",
  textColor2: "#000",
  textColor3: "#808080",
  textColor2Faded: "rgba(0, 0, 0, 0.3)",

  textSizeXLarge: 24,
  textSizeLarge: 20,
  textSizeNormal: 16,
  textSizeSmall: 14,

  textWeightThin: Platform.select({ ios: "300", android: "100" }),
  textWeightBold: "700",
  shadowColor1: "rgba(0, 0, 0, 0.4)",
  shadowColor2: "gray",
  width,
  height,
  itemWidth: Math.floor((width - defaultSpace * 2)/2),
  itemHeight: 300,
  servicesItemWidth: 240,
  servicesItemHeight: 300,
  bottomSheetHeight: height * 0.7,
  defaultSpace,
  defaultVerticalSpace: 25,
  navbarHeight: 80,
  tabsHeight: 60,
  messageMargin: 10,
  messagePadding: 10,
  quickChatHeight: 450,
  quickChatWidth: 350,
  animationDuration: 150,
  iconSize: 16,
  activeOpacity: 0.7,
  underlayColor: "#faf5e8",
  expandedHeight: 90,
  primaryTabsHeight: 90,
  primaryBadgeSize: 50,

  premium: [primaryThemeColor, primaryThemeColor, "#ddc995", primaryThemeColor],

  primaryThemeColorDarkGradient: [
    "#aa8a3e",
    primaryThemeColor,
    primaryThemeColor,
    primaryThemeColor,
    "#aa8a3e",
  ],
  showMoreGradient: [
    'rgba(255,255,255,1)',
    primaryThemeColorLite,
  ],
};
