export class NewsEvent {
    event_day : Date;
    heading : string;
    short_desc : String;
    long_desc : String;
    status : number;
    constructor(event_day : Date,
        heading : string,
        short_desc : String,
        long_desc : String,
        status : number)
        {
            this.event_day = event_day;
            this.heading = heading;
            this.short_desc = short_desc;
            this.long_desc = long_desc;
        }
}
