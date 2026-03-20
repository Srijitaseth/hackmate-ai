import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useThemeCustom } from '@/context/theme';
import { useEffect, useState } from 'react';
import { getMatches } from '@/services/matchService';
import { CURRENT_USER_ID } from '@/constants/user';

export default function Projects() {
  const router = useRouter();
  const { theme } = useThemeCustom();

  const isDark = theme === 'dark';
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      setRefreshing(true);
      const response = await getMatches(CURRENT_USER_ID);
      setMatches(response.data || []);
    } catch (error) {
      console.error('MATCH ERROR:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
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
    <View style={[styles.container, { backgroundColor: bg }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: text }]}>Teammate Matches</Text>
        <Text style={[styles.subtitle, { color: sub }]}>
          {matches.length} ranked teammate matches
        </Text>

        <TouchableOpacity
          style={[styles.refreshBtn, { backgroundColor: card, borderColor: border }]}
          onPress={fetchMatches}
          disabled={refreshing}
          activeOpacity={0.85}
        >
          {refreshing ? (
            <ActivityIndicator color="#38bdf8" />
          ) : (
            <>
              <Ionicons name="refresh" size={16} color="#38bdf8" />
              <Text style={styles.refreshText}> Refresh Matches</Text>
            </>
          )}
        </TouchableOpacity>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['All', 'Best Match', 'Frontend', 'Backend', 'Design'].map((item, i) => (
            <View
              key={i}
              style={[
                i === 0 ? styles.activeFilter : styles.filter,
                { backgroundColor: i === 0 ? '#0ea5e9' : card },
              ]}
            >
              <Text style={{ color: i === 0 ? '#020617' : text }}>
                {item}
              </Text>
            </View>
          ))}
        </ScrollView>

        {matches.map((match) => (
          <TouchableOpacity
            key={match.id}
            style={[styles.card, { backgroundColor: card, borderColor: border }]}
            onPress={() =>
              router.push({
                pathname: '/project/[id]',
                params: { id: match.id },
              })
            }
            activeOpacity={0.85}
          >
            <View style={styles.tagRow}>
              <View style={styles.categoryPill}>
                <Text style={styles.category}>
                  {match.preferredRoles?.[0] || 'Teammate'}
                </Text>
              </View>

              <View style={styles.hotRow}>
                <Ionicons name="star" size={12} color="#38bdf8" />
                <Text style={styles.hot}> Score {match.compatibilityScore}</Text>
              </View>
            </View>

            <Text style={[styles.projectTitle, { color: text }]}>
              {match.name}
            </Text>

            <Text style={[styles.desc, { color: sub }]}>
              {match.bio || 'No bio available'}
            </Text>

            <View style={styles.tags}>
              {(match.skills || []).map((t: string, i: number) => (
                <Text key={i} style={styles.tag}>{t}</Text>
              ))}
            </View>

            <View style={styles.footer}>
              <View style={styles.ownerRow}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {match.name
                      ?.split(' ')
                      .map((part: string) => part[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase() || 'U'}
                  </Text>
                </View>
                <View>
                  <Text style={[styles.owner, { color: text }]}>
                    {match.college || 'Unknown College'}
                  </Text>
                  <Text style={[styles.ownerSub, { color: sub }]}>
                    {match.year || 'Unknown Year'}
                  </Text>
                </View>
              </View>

              <View style={styles.open}>
                <Ionicons name="people" size={12} color="#f2f6f3ff" />
                <Text style={styles.openText}>
                  {' '}
                  {match.preferredRoles?.join(', ') || 'No roles'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {matches.length === 0 && (
          <View style={[styles.emptyCard, { backgroundColor: card, borderColor: border }]}>
            <Text style={[styles.emptyTitle, { color: text }]}>No matches found</Text>
            <Text style={[styles.emptySub, { color: sub }]}>
              Save your profile first, then refresh to load teammate matches.
            </Text>
          </View>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.fab} activeOpacity={0.8} onPress={fetchMatches}>
        <Ionicons name="refresh" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
  },

  subtitle: {
    marginBottom: 15,
  },

  refreshBtn: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  refreshText: {
    color: '#38bdf8',
    fontWeight: '600',
  },

  filter: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },

  activeFilter: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },

  card: {
    padding: 16,
    borderRadius: 18,
    marginTop: 15,
    borderWidth: 1,
  },

  tagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  categoryPill: {
    backgroundColor: '#0de2b1ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },

  category: {
    color: '#f6f8f7ff',
    fontSize: 11,
  },

  hotRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  hot: {
    color: '#38bdf8',
    fontSize: 11,
  },

  projectTitle: {
    fontSize: 18,
    marginTop: 8,
    fontWeight: '700',
  },

  desc: {
    fontSize: 13,
    marginTop: 6,
  },

  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },

  tag: {
    backgroundColor: '#1135d2ff',
    color: '#e8eff1ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 6,
    marginBottom: 6,
    fontSize: 10,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    alignItems: 'center',
  },

  ownerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 28,
    height: 28,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  avatarText: {
    color: '#e9f2f5ff',
    fontSize: 12,
    fontWeight: '700',
  },

  owner: {
    fontSize: 13,
    fontWeight: '600',
  },

  ownerSub: {
    fontSize: 11,
  },

  open: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0ceeb9ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    maxWidth: '45%',
  },

  openText: {
    color: '#f2f6f3ff',
    fontSize: 12,
  },

  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#0ea5e9',
    width: 62,
    height: 62,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  skeletonCard: {
    height: 120,
    borderRadius: 18,
    marginBottom: 12,
  },

  emptyCard: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },

  emptySub: {
    fontSize: 13,
  },
});
