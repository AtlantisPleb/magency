import { StyleSheet, TextInput, View } from 'react-native';

export default function CastScreen() {
  return (
    <View style={styles.container}>
      <TextInput
        multiline={true}
        numberOfLines={3}
        spellCheck={false}
        autoCorrect={false}
        style={{
          backgroundColor: '#0a0a0a',
          width: '100%',
          textAlign: "center",
          borderRadius: 15,
          borderColor: '#444',
          borderWidth: 1,
          color: 'white',
          fontSize: 18,
          lineHeight: 23,
          paddingTop: 18,
          paddingHorizontal: 24,
          paddingBottom: 22,
          fontFamily: 'Courier'
        }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14
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
