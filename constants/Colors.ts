/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const teal = "#1ED2AF";
const navy = "#00003C";
const crimson = "#FB3B4A";
const cream = "#FFFCF2";
const lightBlue = "#64648d";
const white = "#FFF";

const tintColorLight = teal;
const tintColorDark = white;

export const Colors = {
  accent: teal,
  notice: crimson,
  icon: lightBlue,
  tabIconDefault: lightBlue,
  light: {
    text: navy,
    background: cream,
    tint: tintColorLight,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: white,
    background: navy,
    tint: tintColorDark,
    tabIconSelected: tintColorDark,
  },
};
