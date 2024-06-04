import { StyleSheet, Text, View } from 'react-native'

interface ScreenProps {
  title: string
  children: any
}

export const Screen = ({ title, children }: ScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  )
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
})
