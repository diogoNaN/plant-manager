import { StyleSheet } from "react-native";

import colors from "../../styles/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: colors.white,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: "center",
    color: colors.heading,
    marginTop: 38,
  },

  image: {
    width: 292,
    height: 284,
  },

  subTitle: {
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
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