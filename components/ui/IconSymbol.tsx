import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

type IconSymbolProps = {
  name: string;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
}

export function IconSymbol({ name, size = 24, color, style }: IconSymbolProps) {
  return (
    <Ionicons
      // @ts-ignore
      name={name}
      size={size}
      color={color}
      style={style}
    />
  );
}
