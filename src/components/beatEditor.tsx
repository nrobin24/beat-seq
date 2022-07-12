import { For } from 'solid-js';
import { currentBeat, toggleStep, addTrack } from '~/lib/beatStore';
import {
  play, pause, stop, playerState, sounds
} from '../lib/playerStore';
import {createSignal, Switch, Match} from 'solid-js';

import './beatEditor.css';

const [isNewTrackActive, setIsNewTrackActive] = createSignal(false)
const [newTrackSoundId, setNewTrackSoundId] = createSignal(0)
const [newTrackName, setNewTrackName] = createSignal("")

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
                            <Switch>
                                <Match when={isNewTrackActive()}>
                                            <div>
                                                <span>name: </span>
                                                <input type="text" onChange={(e) => setNewTrackName(e.currentTarget.value)}/>
                                            </div>
                                            <div>
                                                <span>sound: </span>
                                                <select name="soundSelector" id="soundSelector" value={newTrackSoundId()} onChange={
                                                    (e) => setNewTrackSoundId(parseInt(e.currentTarget.value))
                                                }>
                                                    <For each={sounds}>
                                                        {(sound) => (
                                                            <option value={sound.id}>{sound.name}</option>
                                                        )}
                                                    </For>
                                                </select>
                                            </div>
                                            <button onClick={() => {

                                                setIsNewTrackActive(false);
                                                addTrack(newTrackName(), 16, newTrackSoundId())

                                            }}>done</button>
                                </Match>
                                <Match when={!isNewTrackActive()}>
                                    <button onClick={() => setIsNewTrackActive(true)}>Add Track</button>
                                </Match>
                            </Switch>
                            
                        </div>
                    )}
                </For>
            </div>
        </div>
  );
}
