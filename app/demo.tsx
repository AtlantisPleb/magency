import { StatusBar, StyleSheet, View } from 'react-native'

export default function Demo() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
