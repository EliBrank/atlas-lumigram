import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Register() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
      <Text style={{ color: '#999' }}>Register</Text>
      <Link href='/login' replace>
        <Text>Log into existing account</Text>
      </Link>
    </View>
  );
}
