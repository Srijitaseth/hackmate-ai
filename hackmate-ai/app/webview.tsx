import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

export default function WebviewScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Analytics</Text>

        <TouchableOpacity style={styles.refresh}>
          <Ionicons name="refresh" size={18} color="#94a3b8" />
        </TouchableOpacity>
      </View>

      {/* FILTERS */}
      <View style={styles.filters}>
        {['Today', 'Week', 'Month'].map((f, i) => (
          <View key={i} style={i === 1 ? styles.activeFilter : styles.filter}>
            <Text style={styles.filterText}>{f}</Text>
          </View>
        ))}
      </View>

      {/* STATS */}
      <View style={styles.statsRow}>
        {[
          { label: 'Matches', value: '124', icon: 'people' },
          { label: 'Projects', value: '32', icon: 'grid' },
          { label: 'Messages', value: '89', icon: 'chatbubble' },
        ].map((item, i) => (
          <View key={i} style={styles.card}>
            <Ionicons name={item.icon as any} size={18} color="#38bdf8" />
            <Text style={styles.cardValue}>{item.value}</Text>
            <Text style={styles.cardLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* CHART */}
      <View style={styles.chartCard}>
        <Text style={styles.sectionTitle}>Growth Overview</Text>

        <View style={styles.chartMock}>
          <View style={styles.barRow}>
            {[30, 60, 45, 80, 55].map((h, i) => (
              <View key={i} style={[styles.bar, { height: h }]} />
            ))}
          </View>
        </View>
      </View>

      {/* WEBVIEW */}
      <View style={styles.webCard}>
        <Text style={styles.sectionTitle}>Live Dashboard</Text>

        <View style={styles.webContainer}>
          {Platform.OS === 'web' ? (
            <View style={styles.webFallback}>
              <Text style={styles.fallbackText}>
                WebView not supported on browser
              </Text>
              <Text style={styles.fallbackSub}>
                Open in Expo Go (mobile)
              </Text>
            </View>
          ) : (
            <WebView
              source={{ uri: 'https://dhanush-s-portfolio.vercel.app/' }} // ✅ FIXED URL
              style={styles.webview}
            />
          )}
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    padding: 18,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
  },

  refresh: {
    backgroundColor: '#0f172a',
    padding: 10,
    borderRadius: 10,
  },

  filters: {
    flexDirection: 'row',
    marginTop: 16,
  },

  filter: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },

  activeFilter: {
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },

  filterText: {
    color: '#fff',
    fontSize: 12,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  card: {
    backgroundColor: '#0f172a',
    width: '30%',
    padding: 14,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1e293b',
    gap: 6,
  },

  cardValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  cardLabel: {
    color: '#64748b',
    fontSize: 11,
  },

  chartCard: {
    backgroundColor: '#0f172a',
    padding: 16,
    borderRadius: 18,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#1e293b',
  },

  chartMock: {
    height: 120,
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: '#020617',
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
  },

  barRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 100,
  },

  bar: {
    width: 12,
    backgroundColor: '#0ea5e9',
    borderRadius: 4,
  },

  webCard: {
    backgroundColor: '#0f172a',
    padding: 16,
    borderRadius: 18,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#1e293b',
  },

  sectionTitle: {
    color: '#fff',
    fontWeight: '600',
  },

  webContainer: {
    height: 300,
    marginTop: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },

  webview: {
    flex: 1,
  },

  webFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#020617',
  },

  fallbackText: {
    color: '#64748b',
  },

  fallbackSub: {
    color: '#38bdf8',
    marginTop: 6,
  },
});