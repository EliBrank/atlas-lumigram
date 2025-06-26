import { Colors } from '@/constants/Colors';
import { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Pressable, View, Text } from 'react-native';

type ButtonVariants =
  | 'primary'
  | 'secondary'

type ButtonProps = {
  variant: ButtonVariants;
  label: string;
  includeImage?: true;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export function Button({ variant, label, includeImage, onPress, style }: ButtonProps) {
  const variantStyles = {
    primary: styles.buttonPrimary,
    secondary: styles.buttonSecondary,
  };

  return (
    <Pressable style={[variantStyles[variant], style]}>
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonPrimary: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.accent,
    paddingInline: 12,
    width: '100%',
    minHeight: 46,
    borderRadius: 4,
  },
  buttonSecondary: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingInline: 12,
    width: '100%',
    minHeight: 46,
    borderRadius: 4,
    outlineWidth: 1,
    outlineColor: '#000',
    backgroundColor: undefined,
  },
  buttonText: {
    color: Colors.dark.text,
  }
})
