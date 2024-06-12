import { ThemeProps } from "./themeInterface";

export const theme: ThemeProps = {
  colors: {
    white: "#ffffff",
    offWhite: "#f0f0f0",
    black: "#000000",
    transparentBlack: "rgba(0, 0, 0, 0.5)",
    red: "#ff0000",
    grey: "#808080",
    // grey: "#FFB5DA",
    darkGrey: "#4b4b4b",
    accentGrey: "#7c7c7c",
    accentDark: "#313232",
    // primaryGreen: "#5da271",
    primaryGreen: "#7F27FF",
    secondaryGreen: "#437d53",
    accentGreen: "#437652",
    lightGreen: "#a1f0b7",
    lightOrange: "#f8e1a0",
    textLight: "#e3e3e3",
    textGrey: "#898989",
    hoverRed: "#a40000",
    borderColor: "#dedede",
  },

  sizes: {
    containerL: "1200px",
    containerXL: "1400px",
  },
};

export const devices = {
  mobileXS: "(max-width: 300px)",
  mobileS: "(max-width: 350px)",
  mobileM: "(max-width: 400px)",
  mobileL: "(max-width: 500px)",
  mobileXL: "(min-width: 520px)",
  tabletXS: "(min-width: 700px)",
  tabletS: "(min-width: 780px)",
  tabletM: "(min-width: 800px)",
};
