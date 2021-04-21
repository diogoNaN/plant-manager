import { Dimensions, StyleSheet } from "react-native";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: colors.white,
  },

  title: {
    fontSize: 32,
    textAlign: "center",
    color: colors.heading,
    marginTop: 38,
    fontFamily: fonts.heading,
    lineHeight: 38,
  },

  image: {
    height: Dimensions.get('window').width * 0.7,
    resizeMode: "contain",
  },

  subTitle: {
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text,
  },

  button: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },
});

export { styles };