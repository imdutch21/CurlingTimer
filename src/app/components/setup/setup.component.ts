import { Component, inject, OnInit } from '@angular/core';
import { TimerElement, TimerSetup } from '../../models/timer-setup.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.css'
})
export class SetupComponent implements OnInit {
  public timerSetup: TimerSetup = new TimerSetup();
  public timers: TimerSetup[] = []
  private readonly router = inject(Router);


  ngOnInit(): void {
    var timersString = localStorage.getItem("timers")
    if (timersString !== null) {
      this.timers = JSON.parse(timersString);
    }
  }


  public remove(index: number) {
    this.timerSetup.timerElements.splice(index, 1);
  }

  public add() {
    this.timerSetup.timerElements.push(new TimerElement());
  }

  public create() {
    this.timers.push(this.timerSetup);
    localStorage.setItem("timers", JSON.stringify(this.timers))
  }

  public startTimer(timerSetup: TimerSetup) {
    this.router.navigate(['/timer', { timerJson: JSON.stringify(timerSetup) }])
  }
}
