import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>GPS</Text>
        <Text style={styles.subtitle}>Admin App</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" stroke="#666" width={20} height={20} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search members..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Feather name="users" color="#FFF" size={24} />
          <Text style={styles.actionText}>Members</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Feather name="award" color="#FFF" size={24} />
          <Text style={styles.actionText}>Scores</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Feather name="bell" color="#FFF" size={24} />
          <Text style={styles.actionText}>Notify</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {/* Groups Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Groups</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['Group A', 'Group B', 'Group C'].map((group) => (
              <TouchableOpacity key={group} style={styles.groupCard}>
                <Feather name="map-pin" color="#FF0000" size={20} />
                <Text style={styles.groupName}>{group}</Text>
                <Text style={styles.memberCount}>12 members</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {['Score added to Group A', 'New notification sent', 'Member updated'].map((activity) => (
            <View key={activity} style={styles.activityItem}>
              <Text style={styles.activityText}>{activity}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    backgroundColor: '#FF0000',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFF',
    opacity: 0.9,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    margin: 16,
    padding: 12,
    borderRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  actionButton: {
    backgroundColor: '#FF0000',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '30%',
  },
  actionText: {
    color: '#FFF',
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  groupCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    width: 120,
    alignItems: 'center',
    elevation: 2,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  memberCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  activityItem: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  activityText: {
    fontSize: 14,
    color: '#333',
  },
});