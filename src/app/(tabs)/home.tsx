import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Expanded mock data with a larger variety of FSL translations for scroll testing
const INITIAL_HISTORY = [
  { id: '1', translation: 'Good morning', date: 'Today, 9:00 AM', saved: false },
  { id: '2', translation: 'Thank you very much', date: 'Today, 8:45 AM', saved: true },
  { id: '3', translation: 'How much is this?', date: 'Today, 8:15 AM', saved: false },
  { id: '4', translation: 'Please sign slower', date: 'Yesterday', saved: true },
  { id: '5', translation: 'Where is the hospital?', date: 'Yesterday', saved: true },
  { id: '6', translation: 'What is your name?', date: 'Tuesday', saved: false },
  { id: '7', translation: 'Nice to meet you', date: 'Monday', saved: false },
  { id: '8', translation: 'I need help', date: 'Sunday', saved: false },
  { id: '9', translation: 'Yes, I understand', date: 'Last Week', saved: true },
  { id: '10', translation: 'No, I do not understand', date: 'Last Week', saved: false },
  { id: '11', translation: 'Excuse me', date: 'Last Week', saved: false },
  { id: '12', translation: 'Where is the bathroom?', date: 'Last Month', saved: true },
  { id: '13', translation: 'Good afternoon', date: 'Last Month', saved: false },
  { id: '14', translation: 'See you later', date: 'Last Month', saved: false },
  { id: '15', translation: 'I am a student', date: 'Last Month', saved: true },
];

export default function HomeScreen() {
  const [history, setHistory] = useState(INITIAL_HISTORY);

  const toggleSave = (id: string) => {
    setHistory(currentHistory => 
      currentHistory.map(item => 
        item.id === id ? { ...item, saved: !item.saved } : item
      )
    );
  };

  const renderHistoryItem = ({ item }: { item: typeof INITIAL_HISTORY[0] }) => (
    <View style={styles.historyCard}>
      <View style={styles.textContainer}>
        <Text style={styles.translationText}>{item.translation}</Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.iconContainer} 
        onPress={() => toggleSave(item.id)}
        activeOpacity={0.6}
      >
        <Ionicons 
          name={item.saved ? "bookmark" : "bookmark-outline"} 
          size={24} 
          color={item.saved ? "#4F46E5" : "#9CA3AF"} 
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
        <Text style={styles.subtitle}>Review or save your recent FSL translations.</Text>
      </View>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={renderHistoryItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', 
  },
  header: {
    padding: 24,
    paddingTop: 60, 
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
  },
  listContent: {
    padding: 16,
    paddingBottom: 20, // Added padding to the bottom so the last item clears the tab bar nicely
  },
  historyCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  translationText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  iconContainer: {
    padding: 8,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
});