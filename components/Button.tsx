import { Colors } from '@/constants/Colors';
import { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Pressable, View, Text } from 'react-native';

type ButtonVariants =
  | 'primary'
  | 'secondary'
  | 'plain'

type ButtonProps = {
  variant: ButtonVariants;
  label: string;
  includeImage?: true;
  onPress: () => void;
  textInvert?: true;
  style?: StyleProp<ViewStyle>;
}

export function Button({ variant, label, includeImage, onPress, textInvert, style }: ButtonProps) {
  const variantStyles = {
    primary: styles.buttonPrimary,
    secondary: styles.buttonSecondary,
    plain: styles.buttonPlain,
  };

  return (
    <Pressable
      style={[variantStyles[variant], style]}
      onPress={onPress}
    >
      <Text style={textInvert ? styles.buttonTextInverted : styles.buttonText}>{label}</Text>
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
  },
  buttonPlain: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingInline: 12,
    width: '100%',
    minHeight: 46,
  },
  buttonText: {
    color: Colors.dark.text,
  },
  buttonTextInverted: {
    color: Colors.light.text,
  }
})
