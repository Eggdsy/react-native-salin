import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  TouchableOpacity 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Updated categories with a modern, softer color palette
const DICTIONARY_CATEGORIES = [
  { id: '1', title: 'Alphabet', icon: 'text-outline', color: '#F59E0B' }, // Amber
  { id: '2', title: 'Numbers', icon: 'calculator-outline', color: '#10B981' }, // Emerald
  { id: '3', title: 'Greetings', icon: 'hand-left-outline', color: '#3B82F6' }, // Blue
  { id: '4', title: 'Emotions', icon: 'happy-outline', color: '#8B5CF6' }, // Violet
  { id: '5', title: 'Emergency', icon: 'warning-outline', color: '#EF4444' }, // Red
  { id: '6', title: 'Family', icon: 'people-outline', color: '#EC4899' }, // Pink
];

export default function DictionaryScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const renderCategoryItem = ({ item }: { item: typeof DICTIONARY_CATEGORIES[0] }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={[styles.iconCircle, { backgroundColor: item.color + '15' }]}>
        <Ionicons name={item.icon as any} size={32} color={item.color} />
      </View>
      <Text style={styles.cardTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dictionary</Text>
        <Text style={styles.subtitle}>Explore the FSL vocabulary.</Text>
        
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a sign..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
        </View>
      </View>

      <FlatList
        data={DICTIONARY_CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        numColumns={2} 
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', // Soft off-white
  },
  header: {
    padding: 24,
    paddingTop: 40,
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
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6', // Light gray input background
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  listContent: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
});