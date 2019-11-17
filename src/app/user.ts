export class User {
    Username:string;
    Password:string;
    role:number;
    email_id : string;
    school_name:string;
    phone:number;
    line1:string;
    line2:string;
    city:string;
    state:string;
    pincode:number;
    stream:string;
    interest:string;
    userNumber:number;

    constructor(Username:string,email_id:string,
    Password:string,role:number,school_name:string,phone:number,
    line1:string,
    line2:string,
    city:string,
    state:string,
    pincode:number,
    stream:string,
    interest:string,userNumber:number){
        this.Username = Username;
        this.Password = Password;
        this.email_id = email_id;
        this.role = role;
        this.school_name=school_name;
        this.phone=phone;
        this.line1=line1;
        this.line2=line2;
        this.city=city;
        this.state=state;
        this.pincode=pincode;
        this.stream=stream;
        this.interest=interest;
        this.userNumber=userNumber;
    }
}
