import { Screen } from '@/components/Screen';
import { View, Text } from 'react-native';
import { useStore } from '@/lib/store';

export default function AccountScreen() {
  const userPubkey = useStore(state => state.userPubkey);
  console.log('userPubkey', userPubkey)

  return (
    <Screen title="Account">
      <View style={{ padding: 30 }}>
        {userPubkey ? <Text style={{ color: 'white' }}>Your Public Key: {userPubkey}</Text> : <Text style={{ color: 'white' }}>Loading...</Text>}
      </View>
    </Screen>
  );
}
