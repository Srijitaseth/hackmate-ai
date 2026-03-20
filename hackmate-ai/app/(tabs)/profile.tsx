import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useThemeCustom } from '@/context/theme';
import { saveUserProfile } from '@/services/userService';
import { CURRENT_USER_ID } from '@/constants/user';

export default function Profile() {
  const [statusIndex, setStatusIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { theme, toggleTheme } = useThemeCustom();

  const isDark = theme === 'dark';

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const statuses = [
    { label: 'Available', color: '#22c55e', bg: '#022c22' },
    { label: 'Busy', color: '#f97316', bg: '#3b1a0a' },
    { label: 'Open', color: '#0ea5e9', bg: '#0c2a3a' },
  ];

  const currentStatus = statuses[statusIndex];

  const toggleStatus = () => {
    setStatusIndex((prev) => (prev + 1) % statuses.length);
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);

      const response = await saveUserProfile({
        userId: CURRENT_USER_ID,
        name: 'Alex Rivera',
        email: 'alex@example.com',
        college: 'SRM',
        year: '3rd Year',
        bio: 'Building products that matter. Passionate about clean code and UX.',
        skills: ['React Native', 'TypeScript', 'Node.js', 'GraphQL', 'Python'],
        interests: ['AI', 'Startups', 'Hackathons'],
        preferredRoles: ['Frontend', 'Designer'],
        experienceLevel: 'Intermediate',
        availability: currentStatus.label,
        hackathonGoals: ['Win hackathons', 'Build startup ideas'],
      });

      Alert.alert('Success', response.message || 'Profile saved successfully');
    } catch (error: any) {
      Alert.alert('Error', error?.response?.data?.error || error.message);
    } finally {
      setSaving(false);
    }
  };

  const bg = isDark ? '#020617' : '#f8fafc';
  const card = isDark ? '#0f172a' : '#ffffff';
  const text = isDark ? '#fff' : '#000';
  const sub = isDark ? '#64748b' : '#475569';
  const border = isDark ? '#1e293b' : '#e2e8f0';

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: bg }]}>
        {[1, 2, 3, 4].map((_, i) => (
          <View key={i} style={[styles.skeletonCard, { backgroundColor: card }]} />
        ))}
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: bg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: text }]}>Profile</Text>

        <TouchableOpacity style={[styles.settings, { backgroundColor: card }]}>
          <Ionicons name="settings-outline" size={18} color={sub} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.themeBtn, { backgroundColor: card }]}
        onPress={toggleTheme}
      >
        <Text style={[styles.themeText, { color: '#38bdf8' }]}>
          {isDark ? 'Switch to Light' : 'Switch to Dark'}
        </Text>
      </TouchableOpacity>

      <View style={styles.center}>
        <View style={[styles.avatar, { borderColor: '#38bdf8' }]}>
          <Text style={styles.avatarText}>AR</Text>
        </View>

        <Text style={[styles.name, { color: text }]}>Alex Rivera</Text>
        <Text style={[styles.role, { color: sub }]}>Full Stack Engineer</Text>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color={sub} />
          <Text style={[styles.location, { color: sub }]}>San Francisco, CA</Text>
        </View>

        <TouchableOpacity
          style={[styles.statusBtn, { backgroundColor: currentStatus.bg }]}
          onPress={toggleStatus}
        >
          <View style={[styles.dot, { backgroundColor: currentStatus.color }]} />
          <Text style={[styles.statusText, { color: currentStatus.color }]}>
            {currentStatus.label}
          </Text>
          <Ionicons name="chevron-forward" size={14} color={currentStatus.color} />
        </TouchableOpacity>
      </View>

      <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
        <Text style={[styles.section, { color: sub }]}>ABOUT</Text>
        <Text style={[styles.text, { color: text }]}>
          Building products that matter. Passionate about clean code and UX.
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
        <View style={styles.rowBetween}>
          <Text style={[styles.section, { color: sub }]}>SKILLS</Text>
          <Ionicons name="add" size={16} color="#38bdf8" />
        </View>

        <View style={styles.tags}>
          {['React Native', 'TypeScript', 'Node.js', 'GraphQL', 'Python'].map(
            (t, i) => (
              <Text key={i} style={styles.tag}>
                {t}
              </Text>
            )
          )}
        </View>
      </View>

      <View style={styles.statsRow}>
        {[
          { label: 'Hackathons', value: '8', icon: 'trophy-outline' },
          { label: 'Projects', value: '3', icon: 'grid-outline' },
          { label: 'Matches', value: '24', icon: 'people-outline' },
        ].map((item, i) => (
          <View
            key={i}
            style={[
              styles.statCard,
              { backgroundColor: card, borderColor: border },
            ]}
          >
            <Ionicons name={item.icon as any} size={18} color="#38bdf8" />
            <Text style={[styles.statNumber, { color: text }]}>{item.value}</Text>
            <Text style={[styles.statLabel, { color: sub }]}>{item.label}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.cta} onPress={handleSaveProfile} disabled={saving}>
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Text style={styles.ctaText}>Save Profile</Text>
            <Ionicons name="cloud-upload-outline" size={18} color="#fff" />
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
  },

  settings: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  center: {
    alignItems: 'center',
    marginTop: 20,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 24,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#38bdf8',
    fontSize: 28,
    fontWeight: '700',
  },

  name: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: '600',
  },

  role: {
    fontSize: 12,
  },

  locationRow: {
    flexDirection: 'row',
    marginTop: 4,
  },

  location: {
    fontSize: 12,
  },

  statusBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 10,
    gap: 6,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 10,
  },

  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },

  card: {
    padding: 16,
    borderRadius: 18,
    marginTop: 15,
    borderWidth: 1,
  },

  section: {
    fontSize: 12,
    marginBottom: 8,
  },

  text: {
    fontSize: 13,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  tag: {
    backgroundColor: '#0ea5e9',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 6,
    marginBottom: 6,
    fontSize: 11,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  statCard: {
    paddingVertical: 16,
    borderRadius: 18,
    width: '30%',
    alignItems: 'center',
    borderWidth: 1,
  },

  statNumber: {
    fontSize: 20,
    fontWeight: '700',
  },

  statLabel: {
    fontSize: 11,
  },

  cta: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#0ea5e9',
    padding: 16,
    borderRadius: 18,
  },

  ctaText: {
    color: '#fff',
    fontWeight: '700',
    marginRight: 6,
  },

  themeBtn: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },

  themeText: {
    fontSize: 12,
  },

  skeletonCard: {
    height: 80,
    borderRadius: 16,
    marginBottom: 12,
  },
});
