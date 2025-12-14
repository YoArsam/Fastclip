import React from 'react';
import { Text, View, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '@/navigation/types';
import { Screen } from '@/components/Screen';
import { PrimaryButton } from '@/components/PrimaryButton';
import { theme } from '@/theme';
import { useProject } from '@/state/ProjectStore';

type Props = NativeStackScreenProps<RootStackParamList, 'BrainDump'>;

export function BrainDumpScreen({ navigation }: Props) {
  const { state, actions } = useProject();
  const { brainDump, selectedIdea } = state.activeProject;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Screen>
        <View style={styles.card}>
          <Text style={styles.page}>Page 5</Text>
          <Text style={styles.title}>Brain dump</Text>
          <Text style={styles.hint}>{selectedIdea ? `Idea: ${selectedIdea.title}` : 'Freestyle'}</Text>

          <Text style={styles.label}>Hook</Text>
          <TextInput
            value={brainDump.hook}
            onChangeText={(t: string) => actions.setBrainDump({ hook: t })}
            placeholder="Start with a punchy first line…"
            placeholderTextColor={theme.colors.muted}
            style={styles.input}
          />

          <Text style={styles.label}>Key points</Text>
          <TextInput
            value={brainDump.keyPoints}
            onChangeText={(t: string) => actions.setBrainDump({ keyPoints: t })}
            placeholder="Bullet points or short sentences…"
            placeholderTextColor={theme.colors.muted}
            style={[styles.input, { height: 90 }]}
            multiline
          />

          <Text style={styles.label}>CTA</Text>
          <TextInput
            value={brainDump.cta}
            onChangeText={(t: string) => actions.setBrainDump({ cta: t })}
            placeholder="Follow for more / link in bio / comment 'X'…"
            placeholderTextColor={theme.colors.muted}
            style={styles.input}
          />

          <Text style={styles.label}>Notes</Text>
          <TextInput
            value={brainDump.notes}
            onChangeText={(t: string) => actions.setBrainDump({ notes: t })}
            placeholder="Anything else you want to remember…"
            placeholderTextColor={theme.colors.muted}
            style={[styles.input, { height: 90 }]}
            multiline
          />

          <PrimaryButton title="Continue to record" onPress={() => navigation.navigate('Record')} />
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.sm,
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
    marginBottom: theme.spacing.xs,
  },
  label: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: '700',
    marginTop: theme.spacing.xs,
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
});
