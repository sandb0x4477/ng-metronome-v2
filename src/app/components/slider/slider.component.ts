import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent implements OnInit {
  @Input() id: string;
  @Input() value: number;
  @Input() min: number;
  @Input() max: number;
  @Output() command = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onChange(ev: any, id: string) {
    ev.preventDefault();
    this.command.emit({ value: ev.target.value, id });
  }
}
