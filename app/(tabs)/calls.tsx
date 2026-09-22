import { StyleSheet, Text, View } from 'react-native';

export default function CallsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chamadas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
  },
});
