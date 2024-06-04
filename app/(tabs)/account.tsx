import { Screen } from '@/components/Screen';
import { View, Text } from 'react-native';
import { useStore } from '@/lib/store';
import { styles } from '@/lib/styles';

export default function AccountScreen() {
  const userPubkey = useStore(state => state.userPubkey);
  return (
    <Screen title="Account">
      <View style={{ padding: 30 }}>
        {userPubkey ? <Text style={styles.text}>Your Public Key: {userPubkey}</Text> : <Text style={styles.text}>Loading...</Text>}
      </View>
    </Screen>
  );
}
