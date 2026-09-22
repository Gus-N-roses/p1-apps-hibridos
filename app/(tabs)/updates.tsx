import { StyleSheet, Text, View } from 'react-native';

export default function UpdatesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Status</Text>
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
