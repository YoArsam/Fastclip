import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';

import type { RootStackParamList } from '@/navigation/types';
import { Screen } from '@/components/Screen';
import { PrimaryButton } from '@/components/PrimaryButton';
import { theme } from '@/theme';
import { useProject } from '@/state/ProjectStore';
import { makeId } from '@/utils/id';

type Props = NativeStackScreenProps<RootStackParamList, 'Record'>;

export function RecordScreen({ navigation }: Props) {
  const { state, actions } = useProject();
  const [busy, setBusy] = useState(false);

  async function pickVideoAsClip() {
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

      actions.addClip({ id: makeId('clip'), uri: asset.uri, createdAt: Date.now() });
    } finally {
      setBusy(false);
    }
  }

  return (
    <Screen>
      <View style={styles.card}>
        <Text style={styles.page}>Page 6</Text>
        <Text style={styles.title}>Record</Text>
        <Text style={styles.hint}>
          Next step: real selfie camera recorder. For now, pick a video from your Photos as a “recorded clip”.
        </Text>

        <PrimaryButton
          title={busy ? 'Picking…' : state.activeProject.recordingMode === 'multi' ? 'Add clip (pick video)' : 'Select clip video'}
          onPress={pickVideoAsClip}
          disabled={busy}
        />

        <Text style={styles.meta}>Current clips: {state.activeProject.clips.length}</Text>

        <PrimaryButton title="Continue to add b-roll" variant="secondary" onPress={() => navigation.navigate('AddBrollToProject')} />
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
  meta: {
    color: theme.colors.muted,
  },
});
