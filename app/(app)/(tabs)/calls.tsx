import { FlatList, StyleSheet, View } from 'react-native';

import CallListItem from '@/components/CallListItem';
import ContactsGate from '@/components/ContactsGate';
import { colors, spacing } from '@/constants/theme';
import { calls } from '@/constants/mockData';
import { useContacts } from '@/contexts/ContactsContext';

function CallsScreenContent() {
  const { contacts } = useContacts();
  return (
    <View style={styles.container}>
      <FlatList
        data={calls}
        keyExtractor={(call) => call.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => {
          const contact = contacts.find((c) => c.id === item.contactId);
          if (!contact) return null;
          return (
            <CallListItem
              name={contact.name}
              avatarColor={contact.avatarColor}
              avatarUri={contact.photoUrl}
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

export default function CallsScreen() {
  return (
    <ContactsGate>
      <CallsScreenContent />
    </ContactsGate>
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
  listContent: {
    paddingVertical: spacing.xs,
  },
});
