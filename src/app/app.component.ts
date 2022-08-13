import { Component, OnInit } from '@angular/core';

import { AppStore } from '@store/app.store';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  constructor(private store: AppStore) {}

  ngOnInit(): void {
    this.loadState();
  }

  loadState() {
    const state = localStorage.getItem('metronomestate');
    if (state) {
      this.store.setState({ ...JSON.parse(state), isPlaying: false });
    }
  }
}
