import { StyleSheet } from "react-native";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flex: 1,
    width: "100%",
  },

  header: {
    width: "100%",
    paddingHorizontal: 30,
  },

  title: {
    fontSize: 17,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 20,
    marginTop: 15,
  },

  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    color: colors.heading,
    lineHeight: 20,
  },

  environmentList: {
    height: 40,
    justifyContent: "center",
    paddingBottom: 5,
    paddingHorizontal: 25,
    marginTop: 32,
  },

  plants: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },

  indicator: {
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  }

});

export { styles };