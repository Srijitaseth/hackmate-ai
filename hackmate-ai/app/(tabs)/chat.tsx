import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useThemeCustom } from '@/context/theme';
import { useEffect, useMemo, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function Chat() {
  const router = useRouter();
  const { userId, name } = useLocalSearchParams();
  const { theme } = useThemeCustom();

  const isDark = theme === 'dark';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const bg = isDark ? '#020617' : '#f8fafc';
  const card = isDark ? '#0f172a' : '#ffffff';
  const text = isDark ? '#fff' : '#000';
  const sub = isDark ? '#64748b' : '#475569';
  const border = isDark ? '#1e293b' : '#e2e8f0';

  const chats = useMemo(
    () => [
      {
        id: '1',
        name: 'Priya Sharma',
        role: 'ML Engineer',
        message: 'Hey! Saw your ML background, would love to connect.',
        time: '2m ago',
        unread: 2,
        color: '#06b6d4',
      },
      {
        id: '2',
        name: 'Marcus Chen',
        role: 'Product Designer',
        message: 'The design system looks great, can we hop on a call?',
        time: '1h ago',
        unread: 0,
        color: '#8b5cf6',
      },
      {
        id: '3',
        name: 'Sofia Garcia',
        role: 'Backend Engineer',
        message: 'Your Rust skills would be perfect for our backend.',
        time: '3h ago',
        unread: 1,
        color: '#f97316',
      },
      {
        id: '4',
        name: 'Kai Thompson',
        role: 'Blockchain Dev',
        message: "I'm building a DeFi protocol, want to join?",
        time: 'Yesterday',
        unread: 0,
        color: '#10b981',
      },
    ],
    []
  );

  const selectedChat =
    userId && name
      ? {
          id: String(userId),
          name: String(name),
          role: 'Matched Teammate',
          message: 'Tap to start your conversation.',
          time: 'Now',
          unread: 1,
          color: '#0ea5e9',
        }
      : null;

  const chatList = selectedChat
    ? [
        selectedChat,
        ...chats.filter(
          (chat) =>
            chat.id !== selectedChat.id &&
            chat.name.toLowerCase() !== selectedChat.name.toLowerCase()
        ),
      ]
    : chats;

  const unreadCount = chatList.reduce((sum, chat) => sum + chat.unread, 0);

  const getInitials = (fullName: string) => {
    const parts = fullName.split(' ');
    return (parts[0]?.[0] || '') + (parts[1]?.[0] || '');
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: bg }]}>
        {[1, 2, 3, 4, 5].map((_, i) => (
          <View key={i} style={[styles.skeletonCard, { backgroundColor: card }]} />
        ))}
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: bg }]}>
      <Text style={[styles.title, { color: text }]}>Messages</Text>
      <Text style={[styles.subtitle, { color: sub }]}>
        {unreadCount} unread message{unreadCount === 1 ? '' : 's'}
      </Text>

      {selectedChat && (
        <View style={[styles.banner, { backgroundColor: card, borderColor: border }]}>
          <Ionicons name="sparkles-outline" size={18} color="#38bdf8" />
          <Text style={[styles.bannerText, { color: text }]}>
            New teammate selected: {selectedChat.name}
          </Text>
        </View>
      )}

      {chatList.map((chat) => (
        <TouchableOpacity
          key={chat.id}
          style={[styles.card, { backgroundColor: card, borderColor: border }]}
          activeOpacity={0.85}
          onPress={() =>
            router.push({
              pathname: '/chat/[id]',
              params: { id: chat.id, name: chat.name },
            })
          }
        >
          <View style={[styles.avatar, { backgroundColor: chat.color }]}>
            <Text style={styles.avatarText}>{getInitials(chat.name)}</Text>
          </View>

          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[styles.name, { color: text }]}>{chat.name}</Text>
            <Text style={styles.role}>{chat.role}</Text>
            <Text style={[styles.message, { color: sub }]} numberOfLines={1}>
              {chat.message}
            </Text>
          </View>

          <View style={styles.right}>
            <Text style={[styles.time, { color: sub }]}>{chat.time}</Text>

            {chat.unread > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{chat.unread}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
  },

  subtitle: {
    marginBottom: 20,
  },

  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 14,
  },

  bannerText: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#fff',
    fontWeight: '700',
  },

  name: {
    fontWeight: '600',
  },

  role: {
    color: '#38bdf8',
    fontSize: 12,
  },

  message: {
    fontSize: 12,
  },

  right: {
    alignItems: 'flex-end',
  },

  time: {
    fontSize: 11,
  },

  badge: {
    backgroundColor: '#0ea5e9',
    marginTop: 5,
    paddingHorizontal: 6,
    borderRadius: 10,
  },

  badgeText: {
    color: '#fff',
    fontSize: 10,
  },

  skeletonCard: {
    height: 70,
    borderRadius: 18,
    marginBottom: 10,
  },
});
