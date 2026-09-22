import { FlatList, StyleSheet, View } from 'react-native';

import CallListItem from '@/components/CallListItem';
import { colors } from '@/constants/theme';
import { calls, contacts } from '@/constants/mockData';

export default function CallsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={calls}
        keyExtractor={(call) => call.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => {
          const contact = contacts.find((c) => c.id === item.contactId);
          if (!contact) return null;
          return (
            <CallListItem
              name={contact.name}
              avatarColor={contact.avatarColor}
              type={item.type}
              direction={item.direction}
              timestamp={item.timestamp}
              onPress={() => {}}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginLeft: 76,
  },
});
