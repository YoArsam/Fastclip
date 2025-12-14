import React, { useState } from 'react';
import { Alert, FlatList, Text, TextInput, View, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';

import type { RootStackParamList } from '@/navigation/types';
import { Screen } from '@/components/Screen';
import { PrimaryButton } from '@/components/PrimaryButton';
import { theme } from '@/theme';
import { useProject } from '@/state/ProjectStore';
import { makeId } from '@/utils/id';
import type { BrollAsset } from '@/state/types';

type Props = NativeStackScreenProps<RootStackParamList, 'BrollLibrary'>;

export function BrollLibraryScreen({ navigation }: Props) {
  const { state, actions } = useProject();
  const [label, setLabel] = useState('');
  const [busy, setBusy] = useState(false);

  async function addBroll() {
    setBusy(true);
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        quality: 1,
      });
      if (res.canceled) return;

      const asset = res.assets[0];
      if (!asset?.uri) {
        Alert.alert('No video selected');
        return;
      }

      actions.addBrollToLibrary({ id: makeId('broll'), uri: asset.uri, label: label.trim() || undefined, createdAt: Date.now() });
      setLabel('');
    } finally {
      setBusy(false);
    }
  }

  return (
    <Screen>
      <View style={styles.card}>
        <Text style={styles.title}>Your b-roll</Text>
        <Text style={styles.hint}>Add b-roll once, then reuse it inside projects.</Text>

        <TextInput
          value={label}
          onChangeText={setLabel}
          placeholder="Optional label (e.g. 'coffee pour', 'screen recording')"
          placeholderTextColor={theme.colors.muted}
          style={styles.input}
        />

        <PrimaryButton title={busy ? 'Adding…' : 'Import b-roll video'} onPress={addBroll} disabled={busy} />
        <PrimaryButton title="Back to Home" variant="secondary" onPress={() => navigation.navigate('Home')} />
      </View>

      <FlatList
        data={state.brollLibrary}
        keyExtractor={(i: BrollAsset) => i.id}
        contentContainerStyle={{ gap: theme.spacing.sm }}
        renderItem={({ item }: { item: BrollAsset }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.label ?? 'B-roll clip'}</Text>
            <Text style={styles.itemMeta} numberOfLines={1}>
              {item.uri}
            </Text>
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
  title: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  hint: {
    color: theme.colors.muted,
    lineHeight: 20,
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
