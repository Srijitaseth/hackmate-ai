import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useThemeCustom } from '@/context/theme';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const { theme } = useThemeCustom();

  const isDark = theme === 'dark';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    return parts[0][0] + (parts[1]?.[0] || '');
  };

  // 🎨 Theme colors
  const bg = isDark ? '#020617' : '#f8fafc';
  const card = isDark ? '#0f172a' : '#ffffff';
  const text = isDark ? '#fff' : '#000';
  const sub = isDark ? '#64748b' : '#475569';
  const border = isDark ? '#1e293b' : '#e2e8f0';

  // 🧱 Skeleton
  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: bg }]}>
        {[1, 2, 3, 4, 5].map((_, i) => (
          <View key={i} style={[styles.skeleton, { backgroundColor: card }]} />
        ))}
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: bg }]}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: sub }]}>Good morning</Text>
          <Text style={[styles.name, { color: text }]}>Dhanush</Text>
        </View>
        
        <View style={styles.avatar}>
            <Text style={styles.avatarText}>DH</Text>
          </View>

          <TouchableOpacity
              onPress={() => router.push('/(auth)/auth')}
              activeOpacity={0.8}
              style={styles.loginBtn}
            >
                    <Ionicons name="person" size={18} color="#06b6d4" />
                          <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
      </View>

      {/* SEARCH */}
      <View style={[styles.searchBox, { backgroundColor: card, borderColor: border }]}>
        <Ionicons name="search" size={18} color={sub} />
        <TextInput
          placeholder="Search projects, skills, people..."
          placeholderTextColor={sub}
          style={[styles.input, { color: text }]}
        />
      </View>

      {/* STATS */}
      <View style={styles.statsRow}>
        {[
          { value: '12', label: 'Matches', icon: 'people' },
          { value: '5', label: 'Projects', icon: 'grid' },
          { value: '3', label: 'Messages', icon: 'chatbubble' },
        ].map((item, i) => (
          <View
            key={i}
            style={[styles.statCard, { backgroundColor: card, borderColor: border }]}
          >
            <Ionicons name={item.icon as any} size={20} color="#38bdf8" />
            <Text style={[styles.statNumber, { color: text }]}>{item.value}</Text>
            <Text style={[styles.statLabel, { color: sub }]}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* TRENDING */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: text }]}>
          Trending Projects
        </Text>
        <Text style={styles.seeAll}>See all</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[
          {
            title: 'MediSync AI',
            desc: 'AI-powered platform connecting patients',
            tags: ['Python', 'LLMs', 'React'],
            owner: 'Priya Sharma',
            members: '2/4',
          },
          {
            title: 'GreenChain',
            desc: 'Blockchain marketplace solution',
            tags: ['Solidity', 'React'],
            owner: 'Kai Thompson',
            members: '3/5',
          },
        ].map((p, i) => (
          <View
            key={i}
            style={[
              styles.projectCard,
              { backgroundColor: card, borderColor: border, marginLeft: i ? 12 : 0 },
            ]}
          >
            <View style={styles.trendingRow}>
              <Ionicons name="trending-up" size={12} color="#38bdf8" />
              <Text style={styles.trending}> TRENDING</Text>
            </View>

            <Text style={[styles.projectTitle, { color: text }]}>
              {p.title}
            </Text>

            <Text style={[styles.projectDesc, { color: sub }]}>
              {p.desc}
            </Text>

            <View style={styles.tags}>
              {p.tags.map((t, j) => (
                <Text key={j} style={styles.tag}>
                  {t}
                </Text>
              ))}
            </View>

            <View style={styles.projectFooter}>
              <Text style={[styles.owner, { color: sub }]}>{p.owner}</Text>
              <View style={styles.members}>
                <Text style={styles.membersText}>{p.members}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* RECOMMENDED */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: text }]}>
          Recommended for You
        </Text>
      </View>

      {[
        { name: 'Priya Sharma', role: 'ML Engineer', score: '94%', color: '#06b6d4' },
        { name: 'Marcus Chen', role: 'Product Designer', score: '91%', color: '#8b5cf6' },
        { name: 'Sofia Garcia', role: 'Backend Engineer', score: '88%', color: '#f97316' },
      ].map((user, i) => (
        <View
          key={i}
          style={[
            styles.userCard,
            { backgroundColor: card, borderColor: border },
          ]}
        >
          <View style={[styles.avatarSmall, { backgroundColor: user.color }]}>
            <Text style={styles.avatarTextSmall}>
              {getInitials(user.name)}
            </Text>
          </View>

          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[styles.userName, { color: text }]}>
              {user.name}
            </Text>
            <Text style={[styles.userRole, { color: sub }]}>
              {user.role}
            </Text>
          </View>

          <View style={styles.score}>
            <Text style={styles.scoreText}>{user.score}</Text>
          </View>
        </View>
      ))}

      {/* AI CTA */}
      <TouchableOpacity
        style={styles.aiCard}
        activeOpacity={0.85}
        onPress={() => router.push('/webview')}
      >
        <Text style={styles.aiTitle}>AI Team Builder</Text>
        <Text style={styles.aiDesc}>
          View analytics & smart insights
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 10,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  greeting: {
    fontSize: 14,
  },

  name: {
    fontSize: 28,
    fontWeight: '700',
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: '#06b6d4',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#06b6d4',
    fontWeight: 'bold',
  },

  searchBox: {
    marginTop: 20,
    flexDirection: 'row',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
  },

  input: {
    marginLeft: 10,
    flex: 1,
  },

  statsRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },

  statCard: {
    paddingVertical: 18,
    borderRadius: 16,
    width: '30%',
    alignItems: 'center',
    borderWidth: 1,
    gap: 6,
  },

  statNumber: {
    fontSize: 18,
    fontWeight: '700',
  },

  statLabel: {
    fontSize: 12,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },

  seeAll: {
    color: '#06b6d4',
    fontSize: 13,
  },

  projectCard: {
    padding: 16,
    borderRadius: 18,
    width: 240,
    borderWidth: 1,
  },

  trendingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  trending: {
    color: '#06b6d4',
    fontSize: 10,
    marginLeft: 4,
  },

  projectTitle: {
    fontSize: 16,
    marginTop: 6,
    fontWeight: '700',
  },

  projectDesc: {
    fontSize: 12,
    marginTop: 6,
  },

  tags: {
    flexDirection: 'row',
    marginTop: 10,
  },

  tag: {
    backgroundColor: '#0f36e2ff',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 6,
    fontSize: 10,
  },

  projectFooter: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  owner: {
    fontSize: 12,
  },

  members: {
    backgroundColor: '#09cb9dff',
    color: 'white',
    paddingHorizontal: 8,
    borderRadius: 8,
  },

  membersText: {
    color: '#dce6e0ff',
    fontSize: 12,
  },

  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
  },

  avatarSmall: {
    width: 38,
    height: 38,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarTextSmall: {
    color: '#fff',
    fontWeight: 'bold',
  },

  userName: {
    fontWeight: '600',
  },

  userRole: {
    fontSize: 12,
  },

  score: {
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },

  scoreText: {
    color: '#020617',
    fontWeight: '700',
  },

  aiCard: {
    marginTop: 20,
    borderRadius: 18,
    padding: 18,
    backgroundColor: '#0ea5e9',
  },

  aiTitle: {
    color: '#020617',
    fontSize: 16,
    fontWeight: '700',
  },

  aiDesc: {
    color: '#020617',
    marginTop: 4,
  },

  skeleton: {
    height: 80,
    borderRadius: 16,
    marginBottom: 12,
  },

  loginBtn: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#0f172a',
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#1e293b',
},

loginText: {
  color: '#06b6d4',
  fontSize: 12,
  fontWeight: '600',
},

});