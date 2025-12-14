import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';

import { theme } from '@/theme';

export function PrimaryButton({
  title,
  onPress,
  variant = 'primary',
  disabled,
  style,
}: {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  style?: ViewStyle;
}) {
  const backgroundColor =
    variant === 'danger' ? theme.colors.danger : variant === 'secondary' ? theme.colors.card : theme.colors.primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }: { pressed: boolean }) => [
        styles.base,
        { backgroundColor, opacity: disabled ? 0.5 : pressed ? 0.9 : 1 },
        style,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.lg,
    alignItems: 'center',
  },
  text: {
    color: theme.colors.text,
    fontWeight: '700',
    fontSize: 16,
  },
});
