import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CastScreen() {
  return (
    <View style={styles.container}>
      <TextInput
        multiline={true}
        numberOfLines={3}
        spellCheck={false}
        autoCorrect={false}
        style={styles.input}
      />
      <TouchableOpacity activeOpacity={0.8} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Cast</Text>
      </TouchableOpacity>
    </View >
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
  input: {
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
    paddingBottom: 20,
    fontFamily: 'Courier'
  },
  submitButton: {
    marginTop: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 24,
    borderRadius: 4
  },
  submitButtonText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Courier'
  }
});
