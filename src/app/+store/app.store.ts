import { Injectable } from '@angular/core';

import { BaseStore } from './base.store';

export const MetroSounds = [
  'Metronome',
  'Synth_Bell_A',
  'Perc_Can',
  'Synth_Square_A',
  'Synth_Tick_C',
  'Synth_Sine_F',
  'Synth_Square_E',
  'Synth_Block_F',
  'Synth_Block_C',
  'Perc_Stick',
  'Perc_Tamb_A',
  'Perc_Glass',
  'Perc_Castanet',
  'Perc_Chair',
];

export interface AppStateModel {
  bpm: number;
  beats: number;
  currentBit: number;
  volume: number;
  isPlaying: boolean;
  metroSound: number;
}

const initialState: AppStateModel = {
  bpm: 76,
  beats: 4,
  currentBit: 0,
  volume: 60,
  isPlaying: false,
  metroSound: 0,
};

@Injectable({ providedIn: 'root' })
export class AppStore extends BaseStore<AppStateModel> {
  bpm$ = this.select(({ bpm }) => bpm);
  beats$ = this.select(({ beats }) => beats);
  currrentBit$ = this.select(({ currentBit }) => currentBit);
  volume$ = this.select(({ volume }) => volume);
  isPlaying$ = this.select(({ isPlaying }) => isPlaying);

  boxesVm$ = this.select(({ currentBit, beats, isPlaying }) => ({ currentBit, beats, isPlaying }));

  metroSound$ = this.select(({ metroSound }) => MetroSounds[metroSound]);
  appState$ = this.select(s => s);

  constructor() {
    super(initialState, 'metronomestate', true);
  }

  setMetroSound() {
    const { metroSound } = this.state;
    const enumLength = Object.values(MetroSounds).length;
    const next = metroSound + 1 > enumLength - 1 ? 0 : metroSound + 1;
    this.setState({ metroSound: next });
  }
}
