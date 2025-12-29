
export interface BlogInputs {
  keyword: string;
  sourceLink: string;
  imageLink: string;
}

export interface GenerationState {
  isGenerating: boolean;
  output: string;
  error: string | null;
}
