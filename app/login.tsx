import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { Button } from '@/components/Button';

export default function Login() {
  return (
    <View style={styles.container}>

      <Image
        source={require('@/assets/images/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.textTitle}>Login</Text>

      <View style={styles.credentials}>
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
      </View>

      <View style={styles.buttonContainer}>
        <Button
          variant="primary"
          label="Sign in"
          onPress={() => {
            router.replace('/(tabs)');
          }}
          style={{ marginBottom: 12 }}
        />
        <Button
          variant="secondary"
          label="Create a new account"
          onPress={() => {
            router.replace('/register');
          }}
        />
      </View>

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
    width: '70%',
    maxHeight: 100,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  textTitle: {
    color: Colors.dark.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  credentials: {
    marginBottom: 24,
    width: '100%',
  },
  inputContainer: {
    color: Colors.dark.text,
    justifyContent: 'center',
    borderColor: Colors.accent,
    borderWidth: 1,
    padding: 12,
    width: '100%',
    minHeight: 52,
    marginBottom: 10,
    borderRadius: 4,
  },
  buttonContainer: {
    width: '100%',
  },
});

