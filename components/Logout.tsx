import { View, Text, Pressable } from 'react-native'
import { IconSymbol } from './ui/IconSymbol';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function Logout() {
  const router = useRouter();
  function logout() {
    router.replace('/login');
  }

  return (
    <Pressable onPress={logout}>
      <IconSymbol
        size={24}
        name='log-out-outline'
        color={Colors.accent}
        style={{ marginRight: 16 }}
      />
    </Pressable>
  );
}

