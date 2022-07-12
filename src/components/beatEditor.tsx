import { For } from 'solid-js';
import { currentBeat, toggleStep } from '~/lib/beatStore';
import {
  play, pause, stop, playerState,
} from '../lib/playerStore';

import './beatEditor.css';

export default function () {
  return (
        <div>
            <div>
                <button onClick={() => play(currentBeat)} classList={{ 'is-playing': playerState.isPlaying }}>Play</button>
                <button onClick={pause}>Pause</button>
                <button onClick={stop}>Stop</button>
                <span>Step: {playerState.currentStepId}</span>
            </div>
            <div>
                <For each={currentBeat.tracks}>
                    {(track) => (
                        <div>
                            <div>
                                {track.name}
                            </div>
                            <div>
                                <For each={track.steps}>
                                    {(step) => (
                                        <
                                            button
                                            onClick={() => toggleStep(track.id, step.id)}
                                            classList={{
                                              'is-current-step': step.id === playerState.currentStepId,
                                            }}
                                        >
                                            {step.isActive ? 'on' : 'off'}
                                        </button>
                                    )}
                                </For>
                            </div>
                        </div>
                    )}
                </For>
            </div>
        </div>
  );
}
