import { Screen } from '@/components/Screen';
import { useNDK } from '@/lib/useNDK';
import { useNostrUser } from '@/lib/useNostrUser';
import { NDKEvent } from '@nostr-dev-kit/ndk';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function CastScreen() {
  useNostrUser()
  const ndk = useNDK();
  const [spell, setSpell] = useState('What can you learn from the newest papers on arxiv?');
  const isSpellShort = spell.length < 10;

  const submitIt = async () => {
    if (!ndk) return
    console.log('submitting', spell);
    const ndkEvent = new NDKEvent(ndk);
    ndkEvent.kind = 38000;
    ndkEvent.content = spell;
    console.log("Publishing...");

    const publishedRelays = await ndkEvent.publish();
    console.log("Submitted")
  }

  return (
    <Screen title="Cast spells">
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
        onPress={submitIt}
      >
        <Text style={styles.submitButtonText}>Cast</Text>
      </TouchableOpacity>
    </Screen>
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
