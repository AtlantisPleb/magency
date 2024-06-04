import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CastScreen() {
  const [spell, setSpell] = useState('');

  const isSpellShort = spell.length < 10;

  return (
    <View style={styles.container}>
      <TextInput
        multiline
        numberOfLines={3}
        spellCheck={false}
        autoCorrect={false}
        style={styles.input}
        onChangeText={setSpell}
        value={spell}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.submitButton, isSpellShort && styles.submitButtonDisabled]}
        disabled={isSpellShort}
      >
        <Text style={styles.submitButtonText}>Cast</Text>
      </TouchableOpacity>
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
  input: {
    backgroundColor: '#0a0a0a',
    width: '100%',
    borderRadius: 15,
    borderColor: '#444',
    borderWidth: 1,
    color: 'white',
    fontSize: 18,
    paddingVertical: 18,
    paddingHorizontal: 24,
    fontFamily: 'Courier'
  },
  submitButton: {
    marginTop: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 24,
    borderRadius: 4
  },
  submitButtonDisabled: {
    opacity: 0.5
  },
  submitButtonText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Courier'
  }
});
