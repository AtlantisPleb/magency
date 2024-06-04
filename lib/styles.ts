import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 20,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace'
  }
})
