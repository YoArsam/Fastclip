import React, { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '@/navigation/types';
import { Screen } from '@/components/Screen';
import { PrimaryButton } from '@/components/PrimaryButton';
import { theme } from '@/theme';
import { useProject } from '@/state/ProjectStore';
import type { BrollAsset, BrollPlacement } from '@/state/types';

type Props = NativeStackScreenProps<RootStackParamList, 'AIGeneratedVideo'>;

export function AIGeneratedVideoScreen({ navigation }: Props) {
  const { state } = useProject();
  const [status, setStatus] = useState<'idle' | 'generating' | 'done'>('idle');

  const p = state.activeProject;

  const selectedBrollLabels = useMemo(() => {
    const map = new Map(state.brollLibrary.map((b: BrollAsset) => [b.id, b.label ?? 'B-roll'] as const));
    return p.brollPlacements.map((pl: BrollPlacement) => ({
      id: pl.id,
      label: map.get(pl.brollId) ?? 'B-roll',
      range: `${pl.startSeconds}s→${pl.endSeconds}s`,
    }));
  }, [p.brollPlacements, state.brollLibrary]);

  async function generate() {
    setStatus('generating');
    await new Promise((r) => setTimeout(r, 1200));
    setStatus('done');
  }

  return (
    <Screen>
      <View style={styles.card}>
        <Text style={styles.page}>Page 8</Text>
        <Text style={styles.title}>AI generated video</Text>
        <Text style={styles.hint}>
          Next: hook up the real pipeline (transcription → subtitles → zooms → b-roll → export). This screen currently simulates generation.
        </Text>

        <View style={styles.summary}>
          <Text style={styles.meta}>Clips: {p.clips.length}</Text>
          <Text style={styles.meta}>Idea: {p.selectedIdea?.title ?? '—'}</Text>
          <Text style={styles.meta}>B-roll placements: {p.brollPlacements.length}</Text>
        </View>

        <PrimaryButton
          title={status === 'generating' ? 'Generating…' : status === 'done' ? 'Regenerate' : 'Generate'}
          onPress={generate}
          disabled={status === 'generating'}
        />

        {status === 'generating' ? (
          <View style={styles.loading}>
            <ActivityIndicator />
            <Text style={styles.meta}>Editing your video…</Text>
          </View>
        ) : null}

        <PrimaryButton title="Back to Home" variant="secondary" onPress={() => navigation.navigate('Home')} />
      </View>

      <Text style={styles.sectionTitle}>What will be applied</Text>
      <FlatList
        data={[
          { id: 'sub', text: 'Subtitles (auto-generated)' },
          { id: 'zoom', text: 'Zoom in/out punch-ins (auto)' },
          { id: 'broll', text: 'B-roll overlays (from your library)' },
        ]}
        keyExtractor={(i: { id: string; text: string }) => i.id}
        contentContainerStyle={{ gap: theme.spacing.sm }}
        renderItem={({ item }: { item: { id: string; text: string } }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.text}</Text>
          </View>
        )}
      />

      <Text style={styles.sectionTitle}>Selected b-roll</Text>
      <FlatList
        data={selectedBrollLabels}
        keyExtractor={(i: { id: string; label: string; range: string }) => i.id}
        contentContainerStyle={{ gap: theme.spacing.sm }}
        renderItem={({ item }: { item: { id: string; label: string; range: string } }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.label}</Text>
            <Text style={styles.itemMeta}>{item.range}</Text>
          </View>
        )}
      />
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
  page: {
    color: theme.colors.muted,
    fontWeight: '700',
  },
  title: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  hint: {
    color: theme.colors.muted,
    lineHeight: 20,
  },
  summary: {
    gap: 4,
  },
  meta: {
    color: theme.colors.muted,
  },
  loading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  sectionTitle: {
    marginTop: theme.spacing.md,
    color: theme.colors.text,
    fontWeight: '800',
    fontSize: 14,
  },
  item: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    gap: 6,
  },
  itemTitle: {
    color: theme.colors.text,
    fontWeight: '700',
  },
  itemMeta: {
    color: theme.colors.muted,
    fontSize: 12,
  },
});
