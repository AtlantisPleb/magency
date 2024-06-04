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
          borderRadius: 15,
          borderColor: '#444',
          borderWidth: 1,
          color: 'white',
          fontSize: 18,
          padding: 18,
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
