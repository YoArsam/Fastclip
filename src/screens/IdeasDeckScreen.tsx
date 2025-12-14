import React, { useMemo, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '@/navigation/types';
import { Screen } from '@/components/Screen';
import { PrimaryButton } from '@/components/PrimaryButton';
import { theme } from '@/theme';
import { useProject } from '@/state/ProjectStore';
import type { Idea } from '@/state/types';
import { makeId } from '@/utils/id';

type Props = NativeStackScreenProps<RootStackParamList, 'IdeasDeck'>;

function starterIdeas(): Idea[] {
  return [
    {
      id: makeId('idea'),
      title: '3 mistakes beginners make',
      prompt: 'Explain the top 3 mistakes beginners make and how to fix them.',
      category: 'Education',
    },
    {
      id: makeId('idea'),
      title: 'My honest workflow',
      prompt: 'Show your real workflow step-by-step and why you do it that way.',
      category: 'Behind the scenes',
    },
    {
      id: makeId('idea'),
      title: 'If I started over…',
      prompt: 'Tell the audience what you would do differently if you started today.',
      category: 'Advice',
    },
    {
      id: makeId('idea'),
      title: 'Quick myth-bust',
      prompt: 'Pick a common myth in your niche and debunk it in 20 seconds.',
      category: 'Education',
    },
  ];
}

export function IdeasDeckScreen({ navigation }: Props) {
  const { state, actions } = useProject();
  const ideas = useMemo(() => starterIdeas(), []);
  const [index, setIndex] = useState(0);

  const current = ideas[index];

  return (
    <Screen>
      <View style={styles.card}>
        <Text style={styles.page}>Page 4</Text>
        <Text style={styles.title}>Swipe-style ideas</Text>
        <Text style={styles.hint}>MVP: use buttons now; gestures later.</Text>

        {current ? (
          <View style={styles.ideaBox}>
            <Text style={styles.ideaTitle}>{current.title}</Text>
            <Text style={styles.ideaPrompt}>{current.prompt}</Text>
            <Text style={styles.ideaMeta}>{current.category ?? 'Idea'}</Text>
          </View>
        ) : (
          <View style={styles.ideaBox}>
            <Text style={styles.ideaTitle}>No more ideas</Text>
            <Text style={styles.ideaPrompt}>
              Tap continue to freestyle your script (or go back and restart).
            </Text>
          </View>
        )}

        <View style={styles.row}>
          <PrimaryButton
            title="Skip"
            variant="secondary"
            onPress={() => setIndex((i: number) => Math.min(i + 1, ideas.length))}
            style={{ flex: 1 }}
          />
          <PrimaryButton
            title="Choose"
            onPress={() => {
              if (current) actions.setIdea(current);
              navigation.navigate('BrainDump');
            }}
            style={{ flex: 1 }}
          />
        </View>

        <PrimaryButton
          title={state.activeProject.sourceMode === 'freestyle' ? 'Continue (freestyle)' : 'Continue'}
          variant="secondary"
          onPress={() => navigation.navigate('BrainDump')}
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
  },
  ideaBox: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    gap: theme.spacing.xs,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  ideaTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  ideaPrompt: {
    color: theme.colors.muted,
    lineHeight: 20,
  },
  ideaMeta: {
    color: theme.colors.muted,
    fontSize: 12,
    marginTop: theme.spacing.xs,
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
});
