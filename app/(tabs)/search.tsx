import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Search() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
      <Text style={{ color: '#999' }}>Search</Text>
      <Link href='/profile/1'>
        <Text>Profile 1</Text>
      </Link>
    </View>
  );
}
