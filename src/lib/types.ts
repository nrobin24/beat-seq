export type Step = {
    id: number,
    isActive: boolean
};

export type Track = {
    id: number,
    name: string,
    soundId: number,
    steps: Step[]
}

export type Beat = {
    id: number,
    tracks: Track[],
    bpm: number,
    name: string
}

export type PlayerState = {
    isPlaying: boolean,
    bpm: number,
    currentStep: number
};