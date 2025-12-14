import React, { createContext, useContext, useMemo, useReducer } from 'react';

import { makeId } from '@/utils/id';
import type {
  BrollAsset,
  BrainDump,
  ClipAsset,
  Idea,
  Project,
  ProjectState,
  RecordingMode,
  SourceMode,
} from '@/state/types';

type Action =
  | { type: 'project/reset' }
  | { type: 'project/setRecordingMode'; payload: RecordingMode }
  | { type: 'project/setSourceMode'; payload: SourceMode }
  | { type: 'project/setIdea'; payload: Idea }
  | { type: 'project/setBrainDump'; payload: Partial<BrainDump> }
  | { type: 'project/addClip'; payload: ClipAsset }
  | { type: 'broll/addToLibrary'; payload: BrollAsset }
  | { type: 'project/addBrollPlacement'; payload: { brollId: string; startSeconds: number; endSeconds: number } };

function newProject(): Project {
  return {
    id: makeId('project'),
    recordingMode: null,
    sourceMode: null,
    selectedIdea: null,
    brainDump: { hook: '', keyPoints: '', cta: '', notes: '' },
    clips: [],
    brollPlacements: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

const initialState: ProjectState = {
  activeProject: newProject(),
  brollLibrary: [],
};

function reducer(state: ProjectState, action: Action): ProjectState {
  switch (action.type) {
    case 'project/reset':
      return { ...state, activeProject: newProject() };

    case 'project/setRecordingMode':
      return {
        ...state,
        activeProject: {
          ...state.activeProject,
          recordingMode: action.payload,
          updatedAt: Date.now(),
        },
      };

    case 'project/setSourceMode':
      return {
        ...state,
        activeProject: {
          ...state.activeProject,
          sourceMode: action.payload,
          updatedAt: Date.now(),
        },
      };

    case 'project/setIdea':
      return {
        ...state,
        activeProject: {
          ...state.activeProject,
          selectedIdea: action.payload,
          updatedAt: Date.now(),
        },
      };

    case 'project/setBrainDump':
      return {
        ...state,
        activeProject: {
          ...state.activeProject,
          brainDump: { ...state.activeProject.brainDump, ...action.payload },
          updatedAt: Date.now(),
        },
      };

    case 'project/addClip':
      return {
        ...state,
        activeProject: {
          ...state.activeProject,
          clips: [...state.activeProject.clips, action.payload],
          updatedAt: Date.now(),
        },
      };

    case 'broll/addToLibrary':
      return {
        ...state,
        brollLibrary: [action.payload, ...state.brollLibrary],
      };

    case 'project/addBrollPlacement':
      return {
        ...state,
        activeProject: {
          ...state.activeProject,
          brollPlacements: [
            {
              id: makeId('place'),
              brollId: action.payload.brollId,
              startSeconds: action.payload.startSeconds,
              endSeconds: action.payload.endSeconds,
            },
            ...state.activeProject.brollPlacements,
          ],
          updatedAt: Date.now(),
        },
      };

    default:
      return state;
  }
}

type ProjectContextValue = {
  state: ProjectState;
  actions: {
    resetProject(): void;
    setRecordingMode(mode: RecordingMode): void;
    setSourceMode(mode: SourceMode): void;
    setIdea(idea: Idea): void;
    setBrainDump(partial: Partial<BrainDump>): void;
    addClip(clip: ClipAsset): void;
    addBrollToLibrary(asset: BrollAsset): void;
    addBrollPlacement(input: { brollId: string; startSeconds: number; endSeconds: number }): void;
  };
};

const ProjectContext = createContext<ProjectContextValue | null>(null);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo<ProjectContextValue>(() => {
    return {
      state,
      actions: {
        resetProject() {
          dispatch({ type: 'project/reset' });
        },
        setRecordingMode(mode: RecordingMode) {
          dispatch({ type: 'project/setRecordingMode', payload: mode });
        },
        setSourceMode(mode: SourceMode) {
          dispatch({ type: 'project/setSourceMode', payload: mode });
        },
        setIdea(idea: Idea) {
          dispatch({ type: 'project/setIdea', payload: idea });
        },
        setBrainDump(partial: Partial<BrainDump>) {
          dispatch({ type: 'project/setBrainDump', payload: partial });
        },
        addClip(clip: ClipAsset) {
          dispatch({ type: 'project/addClip', payload: clip });
        },
        addBrollToLibrary(asset: BrollAsset) {
          dispatch({ type: 'broll/addToLibrary', payload: asset });
        },
        addBrollPlacement(input: { brollId: string; startSeconds: number; endSeconds: number }) {
          dispatch({ type: 'project/addBrollPlacement', payload: input });
        },
      },
    };
  }, [state]);

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

export function useProject() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error('useProject must be used within ProjectProvider');
  return ctx;
}
