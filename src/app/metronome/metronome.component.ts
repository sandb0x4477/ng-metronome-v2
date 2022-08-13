import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap, timer, scan, combineLatest } from 'rxjs';

import { AppStore, MetroSounds } from '@store/app.store';

@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.component.html',
  styleUrls: ['./metronome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetronomeComponent implements OnInit, OnDestroy {
  sub: Subscription;

  tempos = [
    { value: 40, label: 'Largo' },
    { value: 60, label: 'Larghetto' },
    { value: 66, label: 'Adagio' },
    { value: 76, label: 'Andante' },
    { value: 108, label: 'Moderato' },
    { value: 120, label: 'Allegro' },
    { value: 168, label: 'Presto' },
    { value: 200, label: 'Prestissimo' },
  ];

  constructor(public store: AppStore) {}

  ngOnInit(): void {}

  startStop() {
    const { isPlaying } = this.store.state;
    if (isPlaying) {
      this.sub.unsubscribe();
      this.store.setState({ isPlaying: false, currentBit: 0 });
      return;
    } else {
      this.store.setState({ isPlaying: true });
      this.sub = combineLatest([this.store.bpm$, this.store.beats$])
        .pipe(
          switchMap(([bpm, beat]) => {
            return timer(0, Math.floor((60 / bpm) * 1000)).pipe(scan(acc => (acc + 1) % beat, -1));
          }),
        )
        .subscribe(x => {
          this.playAudio(x);
        });
    }
  }

  playAudio(x: number) {
    const { volume, metroSound } = this.store.state;

    const tick = MetroSounds[metroSound];

    const audio = new Audio(x === 0 ? `assets/audio/${tick}_hi.mp3` : `assets/audio/${tick}_lo.mp3`);

    audio.volume = volume / 100;
    audio.play();

    this.store.setState({ currentBit: x });
  }

  onSliderChange(ev: { value: string; id: string }) {
    this.store.setState({ [ev.id]: parseInt(ev.value) });
  }

  onTempoSelection(bpm: number) {
    this.store.setState({ bpm });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
