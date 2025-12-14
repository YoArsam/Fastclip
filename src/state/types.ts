export type RecordingMode = 'single' | 'multi';
export type SourceMode = 'insp' | 'freestyle';

export type Idea = {
  id: string;
  title: string;
  prompt: string;
  category?: string;
};

export type BrainDump = {
  hook: string;
  keyPoints: string;
  cta: string;
  notes: string;
};

export type ClipAsset = {
  id: string;
  uri: string;
  createdAt: number;
};

export type BrollAsset = {
  id: string;
  uri: string;
  label?: string;
  createdAt: number;
};

export type BrollPlacement = {
  id: string;
  brollId: string;
  startSeconds: number;
  endSeconds: number;
  clipId?: string;
};

export type Project = {
  id: string;
  recordingMode: RecordingMode | null;
  sourceMode: SourceMode | null;
  selectedIdea: Idea | null;
  brainDump: BrainDump;
  clips: ClipAsset[];
  brollPlacements: BrollPlacement[];
  createdAt: number;
  updatedAt: number;
};

export type ProjectState = {
  activeProject: Project;
  brollLibrary: BrollAsset[];
};
