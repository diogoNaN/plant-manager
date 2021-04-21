import { StyleSheet } from "react-native";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.green,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.heading,
  },
});

export { styles };