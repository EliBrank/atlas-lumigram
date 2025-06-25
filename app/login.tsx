import { Colors } from '@/constants/Colors';
import { Link, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View, TextInput, Image } from 'react-native';

export default function Login() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <Image
        source={require('@/assets/images/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.textTitle}>Login</Text>

      <TextInput
        placeholder='Email'
        placeholderTextColor={Colors.dark.text}
        style={styles.inputContainer}
      />

      <TextInput
        placeholder='Password'
        placeholderTextColor={Colors.dark.text}
        style={styles.inputContainer}
      />

      <Link href='/register' replace>
        <Text style={styles.textDefault}>Create a new account</Text>
      </Link>

      <Pressable
        onPress={() => {
          router.replace('/(tabs)');
        }}
      >
        <Text style={styles.textDefault}>Sign in</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
    paddingInline: 20,
  },
  logo: {
    width: '50%',
    maxHeight: 100,
    resizeMode: 'contain',
  },
  textDefault: {
    color: Colors.dark.text,
  },
  textTitle: {
    color: Colors.dark.text,
    fontSize: 24,
  },
  inputContainer: {
    justifyContent: 'center',
    borderColor: Colors.accent,
    borderWidth: 2,
    padding: 16,
    width: '100%',
    minHeight: 40,
    marginBottom: 10,
    borderRadius: 4,
  }
});

