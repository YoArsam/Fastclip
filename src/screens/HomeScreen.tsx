import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '@/navigation/types';
import { Screen } from '@/components/Screen';
import { PrimaryButton } from '@/components/PrimaryButton';
import { theme } from '@/theme';
import { useProject } from '@/state/ProjectStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const { state, actions } = useProject();
  const p = state.activeProject;

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Fast Clip</Text>
        <Text style={styles.subtitle}>Shoot selfie-style videos faster with guidance + AI edit.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Start</Text>
        <PrimaryButton title="Make content" onPress={() => navigation.navigate('ClipMode')} />
        <PrimaryButton title="Add B-Roll" variant="secondary" onPress={() => navigation.navigate('BrollLibrary')} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Current draft</Text>
        <Text style={styles.meta}>Mode: {p.recordingMode ?? '—'}</Text>
        <Text style={styles.meta}>Style: {p.sourceMode ?? '—'}</Text>
        <Text style={styles.meta}>Idea: {p.selectedIdea?.title ?? '—'}</Text>
        <Text style={styles.meta}>Clips: {p.clips.length}</Text>
        <Text style={styles.meta}>B-roll placements: {p.brollPlacements.length}</Text>
        <PrimaryButton title="Reset project" variant="danger" onPress={actions.resetProject} />
      </View>

      <View style={{ flex: 1 }} />

      <Text style={styles.footer}>MVP scaffold: recording + AI render will be wired next.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: theme.spacing.xs,
  },
  title: {
    color: theme.colors.text,
    fontSize: 34,
    fontWeight: '800',
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 15,
    lineHeight: 20,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: theme.spacing.xs,
  },
  meta: {
    color: theme.colors.muted,
    fontSize: 14,
  },
  footer: {
    color: theme.colors.muted,
    fontSize: 12,
    textAlign: 'center',
  },
});
