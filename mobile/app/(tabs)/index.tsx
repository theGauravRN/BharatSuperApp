import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bharat Super App</Text>
      <Text style={styles.subtitle}>भारत सुपर ऐप</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.tagline} lightColor="#64748b" darkColor="#94a3b8">
        One app for every Indian — in their language, at their pace, for every need.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginTop: 4,
  },
  separator: {
    marginVertical: 24,
    height: 1,
    width: '80%',
  },
  tagline: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
