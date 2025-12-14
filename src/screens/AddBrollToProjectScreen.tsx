import React, { useMemo, useState } from 'react';
import { FlatList, Text, TextInput, View, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '@/navigation/types';
import { Screen } from '@/components/Screen';
import { PrimaryButton } from '@/components/PrimaryButton';
import { theme } from '@/theme';
import { useProject } from '@/state/ProjectStore';
import type { BrollAsset, BrollPlacement } from '@/state/types';

type Props = NativeStackScreenProps<RootStackParamList, 'AddBrollToProject'>;

export function AddBrollToProjectScreen({ navigation }: Props) {
  const { state, actions } = useProject();
  const [startSeconds, setStartSeconds] = useState('0');
  const [endSeconds, setEndSeconds] = useState('2');

  const placements = state.activeProject.brollPlacements;

  const libraryById = useMemo(() => {
    const map = new Map<string, { label?: string; uri: string }>();
    for (const b of state.brollLibrary) map.set(b.id, { label: b.label, uri: b.uri });
    return map;
  }, [state.brollLibrary]);

  return (
    <Screen>
      <View style={styles.card}>
        <Text style={styles.page}>Page 7</Text>
        <Text style={styles.title}>Add b-roll</Text>
        <Text style={styles.hint}>MVP: pick a b-roll item and place it by time range (seconds).</Text>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Start</Text>
            <TextInput
              value={startSeconds}
              onChangeText={setStartSeconds}
              keyboardType="decimal-pad"
              placeholderTextColor={theme.colors.muted}
              style={styles.input}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>End</Text>
            <TextInput
              value={endSeconds}
              onChangeText={setEndSeconds}
              keyboardType="decimal-pad"
              placeholderTextColor={theme.colors.muted}
              style={styles.input}
            />
          </View>
        </View>

        <PrimaryButton title="Continue to AI video" onPress={() => navigation.navigate('AIGeneratedVideo')} />
      </View>

      <Text style={styles.sectionTitle}>Your b-roll library</Text>
      <FlatList
        data={state.brollLibrary}
        keyExtractor={(i: BrollAsset) => i.id}
        contentContainerStyle={{ gap: theme.spacing.sm }}
        renderItem={({ item }: { item: BrollAsset }) => (
          <View style={styles.itemRow}>
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={styles.itemTitle}>{item.label ?? 'B-roll clip'}</Text>
              <Text style={styles.itemMeta} numberOfLines={1}>
                {item.uri}
              </Text>
            </View>
            <PrimaryButton
              title="Use"
              onPress={() => {
                const start = Number(startSeconds) || 0;
                const end = Math.max(start, Number(endSeconds) || start + 1);
                actions.addBrollPlacement({ brollId: item.id, startSeconds: start, endSeconds: end });
              }}
              style={{ width: 90 }}
            />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.itemTitle}>No b-roll yet</Text>
            <Text style={styles.itemMeta}>Go to Home → Add B-Roll to import your first clips.</Text>
          </View>
        }
      />

      <Text style={styles.sectionTitle}>Placements</Text>
      <FlatList
        data={placements}
        keyExtractor={(i: BrollPlacement) => i.id}
        contentContainerStyle={{ gap: theme.spacing.sm }}
        renderItem={({ item }: { item: BrollPlacement }) => {
          const meta = libraryById.get(item.brollId);
          return (
            <View style={styles.placement}>
              <Text style={styles.itemTitle}>{meta?.label ?? 'B-roll'}</Text>
              <Text style={styles.itemMeta}>
                {item.startSeconds}s → {item.endSeconds}s
              </Text>
            </View>
          );
        }}
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
  row: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  label: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    color: theme.colors.text,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  sectionTitle: {
    marginTop: theme.spacing.md,
    color: theme.colors.text,
    fontWeight: '800',
    fontSize: 14,
  },
  itemRow: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  itemTitle: {
    color: theme.colors.text,
    fontWeight: '700',
  },
  itemMeta: {
    color: theme.colors.muted,
    fontSize: 12,
  },
  empty: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    gap: 6,
  },
  placement: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    gap: 6,
  },
});
