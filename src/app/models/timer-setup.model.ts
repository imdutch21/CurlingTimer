export class TimerSetup {
    public title:string = "";
    public endText:string = "";
    public timerElements: TimerElement[] = []
    public colorBar:string = "#000000";
    public colorBorder:string = "#000000";
    public logoUrl:string = "";
}

export class TimerElement {
    public text:string = ""
    public timeInSeconds:number = 0;
}