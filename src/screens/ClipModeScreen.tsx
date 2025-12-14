import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '@/components/Screen';
import { PrimaryButton } from '@/components/PrimaryButton';
import type { RootStackParamList } from '@/navigation/types';
import { theme } from '@/theme';
import { useProject } from '@/state/ProjectStore';

type Props = NativeStackScreenProps<RootStackParamList, 'ClipMode'>;

export function ClipModeScreen({ navigation }: Props) {
  const { actions } = useProject();

  return (
    <Screen>
      <View style={styles.card}>
        <Text style={styles.title}>Page 2</Text>
        <Text style={styles.subtitle}>How do you want to record?</Text>

        <PrimaryButton
          title="Make multiple clips"
          onPress={() => {
            actions.setRecordingMode('multi');
            navigation.navigate('SourceMode');
          }}
        />
        <PrimaryButton
          title="Make 1 clip"
          variant="secondary"
          onPress={() => {
            actions.setRecordingMode('single');
            navigation.navigate('SourceMode');
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.md,
  },
  title: {
    color: theme.colors.muted,
    fontWeight: '700',
  },
  subtitle: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
});
