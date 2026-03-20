import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useThemeCustom } from '@/context/theme';
import { useEffect, useState } from 'react';
import { getUserProfile } from '@/services/userService';

export default function ProjectDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { theme } = useThemeCustom();

  const isDark = theme === 'dark';
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await getUserProfile(String(id));
      setUser(response.data || null);
    } catch (error) {
      console.error('USER DETAIL ERROR:', error);
    } finally {
      setLoading(false);
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

  if (!user) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: bg,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <Text style={{ color: text, fontSize: 18, fontWeight: '700' }}>
          User not found
        </Text>

        <TouchableOpacity
          style={[styles.button, { marginTop: 20 }]}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const initials =
    user.name
      ?.split(' ')
      .map((part: string) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'U';

  return (
    <ScrollView style={[styles.container, { backgroundColor: bg }]}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={22} color={text} />
      </TouchableOpacity>

      <View style={styles.center}>
        <View style={[styles.avatar, { borderColor: '#38bdf8' }]}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

        <Text style={[styles.title, { color: text }]}>{user.name}</Text>
        <Text style={[styles.role, { color: sub }]}>
          {user.preferredRoles?.join(', ') || 'Teammate'}
        </Text>

        <View style={styles.metaRow}>
          <Text style={[styles.meta, { color: sub }]}>
            {user.college || 'Unknown College'}
          </Text>
          <Text style={[styles.meta, { color: sub }]}>•</Text>
          <Text style={[styles.meta, { color: sub }]}>
            {user.year || 'Unknown Year'}
          </Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
        <Text style={[styles.section, { color: sub }]}>ABOUT</Text>

        <Text style={[styles.text, { color: text }]}>
          {user.bio || 'No bio available'}
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
        <Text style={[styles.section, { color: sub }]}>EXPERIENCE</Text>

        <Text style={[styles.big, { color: text }]}>
          {user.experienceLevel || 'Not specified'}
        </Text>

        <Text style={[styles.small, { color: sub }]}>
          Availability: {user.availability || 'Not specified'}
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
        <Text style={[styles.section, { color: sub }]}>SKILLS</Text>

        <View style={styles.tags}>
          {(user.skills || []).map((t: string, i: number) => (
            <Text
              key={i}
              style={[
                styles.tag,
                {
                  backgroundColor: isDark ? '#020617' : '#e2e8f0',
                  color: '#38bdf8',
                },
              ]}
            >
              {t}
            </Text>
          ))}
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
        <Text style={[styles.section, { color: sub }]}>INTERESTS</Text>

        <View style={styles.tags}>
          {(user.interests || []).map((t: string, i: number) => (
            <Text
              key={i}
              style={[
                styles.tag,
                {
                  backgroundColor: isDark ? '#020617' : '#e2e8f0',
                  color: '#22c55e',
                },
              ]}
            >
              {t}
            </Text>
          ))}
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
        <Text style={[styles.section, { color: sub }]}>HACKATHON GOALS</Text>

        <View style={styles.tags}>
          {(user.hackathonGoals || []).map((t: string, i: number) => (
            <Text
              key={i}
              style={[
                styles.tag,
                {
                  backgroundColor: isDark ? '#020617' : '#e2e8f0',
                  color: '#f97316',
                },
              ]}
            >
              {t}
            </Text>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.85}
        onPress={() =>
          router.push({
            pathname: '/chat',
            params: {
              userId: String(user.id),
              name: user.name || 'Teammate',
            },
          })
        }
      >
        <Text style={styles.buttonText}>Start Chat</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  backBtn: {
    marginBottom: 10,
  },

  center: {
    alignItems: 'center',
    marginBottom: 10,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 24,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  avatarText: {
    color: '#38bdf8',
    fontSize: 28,
    fontWeight: '700',
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    marginTop: 12,
  },

  role: {
    fontSize: 13,
    marginTop: 4,
  },

  metaRow: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },

  meta: {
    fontSize: 12,
  },

  card: {
    padding: 16,
    borderRadius: 16,
    marginTop: 15,
    borderWidth: 1,
  },

  section: {
    fontSize: 12,
    marginBottom: 8,
  },

  text: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 18,
  },

  big: {
    fontSize: 22,
    marginTop: 6,
    fontWeight: '700',
  },

  small: {
    fontSize: 12,
    marginTop: 4,
  },

  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },

  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 6,
    marginBottom: 6,
    fontSize: 10,
  },

  button: {
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: '#0ea5e9',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },

  buttonText: {
    color: '#020617',
    fontWeight: '700',
  },

  skeletonCard: {
    height: 80,
    borderRadius: 16,
    marginBottom: 12,
  },
});
