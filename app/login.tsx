import { Link, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function Login() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
      <Text style={{ color: '#999' }}>Login</Text>
      <Link href='/register' replace>
        <Text>Create a new account</Text>
      </Link>

      <Pressable
        onPress={() => {
          router.replace('/(tabs)');
        }}
      >
        <Text>Sign in</Text>
      </Pressable>
    </View>
  );
}
