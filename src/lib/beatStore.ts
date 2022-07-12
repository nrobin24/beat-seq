import { Step, Track, Beat } from '~/lib/types';
import { createStore } from "solid-js/store";

const createStep = (id: number): Step => ({ isActive: false, id });

const createTrack = (id: number, name: string, stepCount: number, soundId: number): Track => {
    const steps = [...Array(stepCount).keys()].map(createStep)
    return { id, name, steps, soundId };
};

const createBeat = (id: number, bpm: number, name: string): Beat => {
    const tracks = [createTrack(0, 'Track 1', 16, 0)]
    return { id, bpm, name, tracks };
};

const initialBeat = createBeat(0, 127, 'Beat 1');

const [currentBeat, setCurrentBeat] = createStore(initialBeat)

const toggleStepInTrack = (track, stepId): Track => {
    return { ...track, steps: track.steps.map((step: Step): Step => ((step.id == stepId) ? { ...step, isActive: !step.isActive } : step)) }
};

const toggleStep = (trackId: number, stepId: number) => {
    const newTracks = currentBeat.tracks.map((track: Track): Track => track.id == trackId ? toggleStepInTrack(track, stepId) : track);
    setCurrentBeat({
        ...currentBeat,
        tracks: newTracks
    })
};

const addTrack = (name: string, stepCount: number, soundId: number) => {
    const maxTrackNum = Math.max(...currentBeat.tracks.map(t => t.id))
    setCurrentBeat('tracks', [...currentBeat.tracks, createTrack(maxTrackNum + 1, name, stepCount, soundId)] )
};


export {
    currentBeat,
    toggleStep
};