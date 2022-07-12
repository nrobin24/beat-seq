import { createStore } from 'solid-js/store';
import { PlayerState, Beat } from './types';

import {Howl, Howler} from 'howler';

const sounds = [
    {
        id: 0,
        name: 'Kick',
        sound: new Howl({src: '../../assets/bd01.wav'})
    },
    {
        id: 1,
        name: 'Snare',
        sound: new Howl({src: '../../assets/sd01.wav'})
    },
    {
        id: 2,
        name: 'Tom',
        sound: new Howl({src: '../../assets/lt01.wav'})
    },
    {
        id: 3,
        name: 'Clap',
        sound: new Howl({src: '../../assets/cp01.wav'})
    },
    {
        id: 4,
        name: 'Rimshot',
        sound: new Howl({src: '../../assets/rs01.wav'})
    },
    {
        id: 5,
        name: 'Closed Hat',
        sound: new Howl({src: '../../assets/ch01.wav'})
    },
    {
        id: 6,
        name: 'Open Hat',
        sound: new Howl({src: '../../assets/oh01.wav'})
    },
    {
        id: 7,
        name: 'Cymbal',
        sound: new Howl({src: '../../assets/rd01.wav'})
    }
]

const playSound = (soundId: number) => {
    const sound = sounds.filter(s => s.id === soundId)
    if (sound.length) {
        sound[0].sound.play()
    } else {
        console.error(`Sound with id: ${soundId} not found!`);
    }    
};

const initialPlayerState = {
    isPlaying: false,
    bpm: 127,
    currentStepId: 0,
};

const [playerState, setPlayerState] = createStore(initialPlayerState);

const step = (beat: Beat) => {
    const soundIds = beat.tracks.filter(
        track => track.steps.filter(
            step => step.isActive && step.id == playerState.currentStepId
        ).length
    ).map(track => track.soundId)
    soundIds.forEach(playSound)
    const newStepId = (playerState.currentStepId + 1) % 16;
    setPlayerState('currentStepId', newStepId);
    
};

let intervalId;

const startPlayback = (beat: Beat) => {
    const ms = playerState.bpm / 60 * 1000 / 16;
    intervalId = setInterval(() => step(beat), ms);
};

const stopPlayback = () => {
    clearInterval(intervalId);
};

const play = (beat: Beat) => {
    setPlayerState({
        ...playerState,
        isPlaying: true,
    });
    startPlayback(beat);
};

const pause = () => {
    setPlayerState('isPlaying', false);
    stopPlayback();
};

const stop = () => {
    setPlayerState('isPlaying', false);
    setPlayerState('currentStepId', 0);
    stopPlayback();
};

const setBpm = (bpm: number) => {
    setPlayerState('bpm', bpm);
};

export {
    play, pause, stop, setBpm, playerState, sounds
};
