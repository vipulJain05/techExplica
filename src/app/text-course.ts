export class TextCourse {
    topic_name : string;
    sub_topic : string;
    special_note : string;
    content : string;
    constructor(topic_name:string, sub_topic : string,
        special_note : string,
        content : string)
    {
        this.topic_name=topic_name;
        this.sub_topic=sub_topic;
        this.special_note=special_note;
        this.content=content;

    }
}
