export class VideoCourse {
    video_name :string;
    video_description:string;
    price:number;
    discount:number;
    discount_days:number;
    final_amount:number;
    discount_percentage:number;
    tid:number;
    video_data:string;
    file_loc:string;
    constructor(video_name:string,video_description:string,
        price:number,
        discount:number,discount_days:number,final_amount:number,discount_percentage:number,tid:number,video_data:string,file_loc:string)
    {
        this.video_name=video_name;
        this.video_description=video_description;
        this.price=price;
        this.discount=discount;
        this.discount_days=discount_days;
        this.final_amount=final_amount;
        this.discount_percentage=discount_percentage;
        this.tid=tid;
        this.video_data=video_data;
        this.file_loc=file_loc;
    }
}
