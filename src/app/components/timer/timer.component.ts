import { Component, inject, OnInit } from '@angular/core';
import { TimerSetup } from '../../models/timer-setup.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-timer',
  imports: [],
  standalone: true,
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  public timerSetup: TimerSetup = new TimerSetup();
  public startTime: Date = new Date();
  public secondsLeft: number = 0;
  public minutesLeft: number = 0;
  public title: string = ""
  public currentTimerIndex: number = 0;
  public progressPercentage: number = 0;

  public finished: boolean = false;

  private timeout: any = null;

  ngOnInit(): void {
    let timerJson = this.route.snapshot.paramMap.get('timerJson');
    if (timerJson !== null) {
      this.timerSetup = JSON.parse(timerJson);
      if (this.timerSetup.colorBar == null || this.timerSetup.colorBar == "") {
        this.timerSetup.colorBar = "#800080"
      }
      if (this.timerSetup.colorBorder == null || this.timerSetup.colorBorder == "") {
        this.timerSetup.colorBorder = "#800080"
      }
      if (this.timerSetup.logoUrl == null || this.timerSetup.logoUrl == "") {
        this.timerSetup.logoUrl = "https://www.vebego.com/media/wksmrxiz/logo-vebego-svg.svg"
      }
      this.addTimerIfNotExists();
    }
    this.timeout = setInterval(() => this.updateTimer(), 10);
  }

  addTimerIfNotExists() {
    if (this.timerSetup === null || this.timerSetup === new TimerSetup()) return;

    var timersString = localStorage.getItem("timers")
    let timers: TimerSetup[] = []
    if (timersString !== null) {
      timers = JSON.parse(timersString);
    }
    if(timers.find(t => t.title == this.timerSetup.title)) return;
    timers.push(this.timerSetup)
    localStorage.setItem("timers", JSON.stringify(timers))
  }

  updateTimer() {
    console.log(this.timerSetup);

    var currentTimer = this.timerSetup.timerElements[this.currentTimerIndex];
    var nextTime = new Date(this.startTime);
    nextTime.setSeconds(this.startTime.getSeconds() + currentTimer.timeInSeconds);
    let now = new Date();
    if (now > nextTime) {
      this.startTime = nextTime;
      this.currentTimerIndex++;
      if (this.currentTimerIndex >= this.timerSetup.timerElements.length) {
        this.title = this.timerSetup.endText;
        this.finished = true;
        this.progressPercentage = 0;
        if (this.timeout != null) {
          clearInterval(this.timeout);
        }
      } else {
        this.updateTimer()
      }
      return;
    }
    let diff = nextTime.getTime() - now.getTime();
    this.minutesLeft = Math.floor(diff / 60000);
    this.secondsLeft = Math.round(diff / 1000 - this.minutesLeft * 60);
    this.progressPercentage = 100 - diff / (currentTimer.timeInSeconds * 1000) * 100;
    this.title = currentTimer.text;
  }
}
