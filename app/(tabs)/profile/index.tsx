import { useAuth } from '@/components/AuthProvider';
import { Text, View } from 'react-native';

export default function Profile() {
  const auth = useAuth();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
      <Text style={{ color: '#999' }}>Profile of {auth.user?.email}</Text>
    </View>
  );
}
