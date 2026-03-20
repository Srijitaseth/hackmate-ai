import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect, useMemo } from 'react';
import { useThemeCustom } from '@/context/theme';

type ChatMessage = {
  id: number;
  text: string;
  time: string;
  sender: 'me' | 'other';
};

export default function ChatDetail() {
  const router = useRouter();
  const { id, name } = useLocalSearchParams();
  const { theme } = useThemeCustom();

  const isDark = theme === 'dark';
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setMessages([
        {
          id: 1,
          text: `Hey! I checked your profile and I think we'd make a strong hackathon team.`,
          time: '2m ago',
          sender: 'other',
        },
        {
          id: 2,
          text: `Awesome — I’d love to know more about your project idea and team needs.`,
          time: '1m ago',
          sender: 'me',
        },
      ]);
    }, 1200);

    return () => clearTimeout(timer);
  }, [id]);

  const bg = isDark ? '#020617' : '#f8fafc';
  const card = isDark ? '#0f172a' : '#ffffff';
  const text = isDark ? '#fff' : '#000';
  const sub = isDark ? '#64748b' : '#475569';
  const border = isDark ? '#1e293b' : '#e2e8f0';

  const teammateName = String(name || 'Teammate');

  const initials = useMemo(() => {
    return teammateName
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }, [teammateName]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now(),
      text: input.trim(),
      time: 'Now',
      sender: 'me',
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: bg }]}>
        {[1, 2, 3, 4].map((_, i) => (
          <View key={i} style={[styles.skeletonMsg, { backgroundColor: card }]} />
        ))}
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.header, { borderColor: border }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={text} />
        </TouchableOpacity>

        <View style={styles.user}>
          <View style={[styles.avatar, { backgroundColor: card }]}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>

          <View>
            <Text style={[styles.name, { color: text }]}>{teammateName}</Text>
            <Text style={styles.role}>Matched Teammate</Text>
          </View>
        </View>

        <Ionicons name="person" size={20} color={sub} />
      </View>

      <ScrollView style={styles.chat} contentContainerStyle={{ padding: 18 }}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.row,
              msg.sender === 'me' && { justifyContent: 'flex-end' },
            ]}
          >
            {msg.sender === 'other' && (
              <View style={[styles.avatarSmall, { backgroundColor: card }]}>
                <Text style={styles.avatarSmallText}>{initials}</Text>
              </View>
            )}

            <View style={[styles.msgBox, msg.sender === 'me' && { alignItems: 'flex-end' }]}>
              <View
                style={[
                  styles.bubble,
                  {
                    backgroundColor: msg.sender === 'me' ? '#0ea5e9' : card,
                    borderColor: msg.sender === 'me' ? '#0ea5e9' : border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    { color: msg.sender === 'me' ? '#020617' : text },
                  ]}
                >
                  {msg.text}
                </Text>
              </View>

              <Text style={[styles.time, { color: sub }]}>{msg.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.inputBar, { borderColor: border }]}>
        <TextInput
          placeholder={`Message ${teammateName}...`}
          placeholderTextColor={sub}
          value={input}
          onChangeText={setInput}
          style={[styles.input, { backgroundColor: card, color: text }]}
        />

        <TouchableOpacity style={styles.send} onPress={handleSend}>
          <Ionicons name="paper-plane" size={18} color="#020617" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 18,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },

  user: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#38bdf8',
    fontWeight: '700',
  },

  name: {
    fontWeight: '600',
  },

  role: {
    color: '#38bdf8',
    fontSize: 12,
  },

  chat: {
    flex: 1,
  },

  row: {
    flexDirection: 'row',
    marginBottom: 14,
  },

  avatarSmall: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  avatarSmallText: {
    color: '#38bdf8',
    fontSize: 11,
    fontWeight: '700',
  },

  msgBox: {
    flex: 1,
  },

  bubble: {
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    maxWidth: '95%',
  },

  messageText: {
    fontSize: 13,
    lineHeight: 18,
  },

  time: {
    fontSize: 10,
    marginTop: 4,
  },

  inputBar: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    alignItems: 'center',
  },

  input: {
    flex: 1,
    padding: 12,
    borderRadius: 14,
    marginRight: 10,
  },

  send: {
    backgroundColor: '#0ea5e9',
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  skeletonMsg: {
    height: 60,
    borderRadius: 14,
    marginBottom: 12,
  },
});
