import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function Profile() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
      <Text style={{ color: '#999' }}>Profile for: {id}</Text>
    </View>
  );
}
