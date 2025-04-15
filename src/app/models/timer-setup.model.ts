export class TimerSetup {
    public title:string = "";
    public endText:string = "";
    public timerElements: TimerElement[] = []
}

export class TimerElement {
    public text:string = ""
    public timeInSeconds:number = 0;
}