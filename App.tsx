import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { theme } from '@/theme';
import { ProjectProvider } from '@/state/ProjectStore';
import type { RootStackParamList } from '@/navigation/types';

import { HomeScreen } from '@/screens/HomeScreen';
import { BrollLibraryScreen } from '@/screens/BrollLibraryScreen';
import { ClipModeScreen } from '@/screens/ClipModeScreen';
import { SourceModeScreen } from '@/screens/SourceModeScreen';
import { IdeasDeckScreen } from '@/screens/IdeasDeckScreen';
import { BrainDumpScreen } from '@/screens/BrainDumpScreen';
import { RecordScreen } from '@/screens/RecordScreen';
import { AddBrollToProjectScreen } from '@/screens/AddBrollToProjectScreen';
import { AIGeneratedVideoScreen } from '@/screens/AIGeneratedVideoScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.bg,
    card: theme.colors.card,
    text: theme.colors.text,
    border: theme.colors.border,
    primary: theme.colors.primary,
  },
};

export default function App() {
  return (
    <ProjectProvider>
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: theme.colors.bg },
            headerTintColor: theme.colors.text,
            headerTitleStyle: { fontWeight: '600' },
            contentStyle: { backgroundColor: theme.colors.bg },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Fast Clip' }} />
          <Stack.Screen name="BrollLibrary" component={BrollLibraryScreen} options={{ title: 'B-Roll Library' }} />

          <Stack.Screen name="ClipMode" component={ClipModeScreen} options={{ title: 'Make Content' }} />
          <Stack.Screen name="SourceMode" component={SourceModeScreen} options={{ title: 'Choose Style' }} />
          <Stack.Screen name="IdeasDeck" component={IdeasDeckScreen} options={{ title: 'Pick an Idea' }} />
          <Stack.Screen name="BrainDump" component={BrainDumpScreen} options={{ title: 'Brain Dump' }} />
          <Stack.Screen name="Record" component={RecordScreen} options={{ title: 'Record' }} />
          <Stack.Screen name="AddBrollToProject" component={AddBrollToProjectScreen} options={{ title: 'Add B-Roll' }} />
          <Stack.Screen name="AIGeneratedVideo" component={AIGeneratedVideoScreen} options={{ title: 'AI Video' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProjectProvider>
  );
}
