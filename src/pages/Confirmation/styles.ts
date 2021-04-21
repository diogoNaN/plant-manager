import { StyleSheet } from "react-native";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 30,
  },

  emoji: {
    fontSize: 78,
  },

  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    textAlign: "center",
    color: colors.heading,
    lineHeight: 38,
    marginTop: 15,
  },

  subtitle: {
    fontFamily: fonts.text,
    textAlign: "center",
    fontSize: 17,
    paddingVertical: 10,
    color: colors.heading,
  },

  buttonArea: {
    width: "100%",
    paddingHorizontal: 50,
    marginTop: 20
  },
});

export { styles };