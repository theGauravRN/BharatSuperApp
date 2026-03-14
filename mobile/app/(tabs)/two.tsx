import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <Text style={styles.subtitle} lightColor="#64748b" darkColor="#94a3b8">
        13 modules — Social, Calling, News, FinTech, Agri, Commerce, EdTech, Health, Creator, EV, GovTech, Jobs, AI Assistant
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
  },
});
