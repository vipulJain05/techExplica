const path = require('path');
var crypto = require('crypto');
const multer = require('multer');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var file_check;
var dateFormat = require('dateformat');
//var mysql = require('mysql');

const paypal = require('paypal-rest-sdk');
var day=dateFormat(new Date(),"yyyy-m-dd h:MM:ss");
//var mongojs  = require('mongojs');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("StudyMaterial.db");
var nodemailer = require("nodemailer");
//var type11;
//MySQL
const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'studymaterial'
});
con.connect((err) => {
  if (err) throw err;
  console.log('Connected My SQL!');
});


var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "riyag748@gmail.com",
        pass: "yadav@&*%mandeep098765"
    }
});



paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AWI5iI13W0OEPsTjcAo4LsCgqBkEA_EViJzbzn8KpekY4vZEQVUyNTVadsOQCoJQ24OYwBpq4h6KN3X1',
    'client_secret': 'EHuYKvPqbvp_2FdCiq9YqljQwAtF08RaDCKjQgkKurGPufWwTuMcYK5ovAvLR3sCq_JrFGrWuZu2Rm7G'
  });


router.get('/list',function(req,res){
    console.log("get list called");
    db.serialize(function(){
        var sql = "select * from User";
        db.all(sql,function(row,err){
            if(err){
                res.send(err);
            }
            else{
                res.send(row);
            }
        });

    });
    //res.send("response from server");
});

router.post('/check-login',function(req,res){
    console.log("login check called");
    var email_id = req.body.email_id;
    var Password = req.body.Password;

    console.log(Password); 
    console.log(email_id); 

        console.log("get called");
	db.serialize(function(){
			var sql = "SELECT * FROM tbl_users WHERE username = '" + email_id + "'";
            // send the records as JSON
            
			con.query(sql, function(err, row) {
                try
                {
                if(err){
                    console.log("error");
                    console.log(err);
                    res.send(err);
                }
                else{
                    var hash = crypto.createHmac('sha512', row[0].salt);
                    hash.update(Password);
                    Passwordhash = hash.digest('hex');
                    if(Passwordhash==row[0].password) {
                        console.log("success");
                        console.log(row);
                        res.send(row);
                        var sql1="update tbl_users set last_login='" +  day + "' where uid=" + row[0].uid;
                        console.log(sql1);
                        con.query(sql1, function(err,row) {
                            if(err)
                                console.log(err);
                        })
                    } else {
                        console.log("Invalid credentials");
                    }
                } 
            }
            catch(err)
            {console.log("error");}
            finally{("catched");}
			});

		});
});



router.post('/contact', function(req,res){
    
    // req.body.name
     var  output = fs.readFileSync('contact.html').toString();
 
     output = output.replace("{{name}}",req.body.name );
     output = output.replace('{{email}}',req.body.email);
     output = output.replace('{{school}}',req.body.school);
     output = output.replace('{{phone}}',req.body.phone);
     output = output.replace("{{text}}",req.body.text);


   // create reusable transporter object using the default SMTP transport
   let transporter = nodemailer.createTransport({
     host: 'smtp.gmail.com',
     port: 587,
     secure: false, // true for 465, false for other ports
     auth: {
         user: 'riyag748@gmail.com', // generated ethereal user
         pass: 'yadav@&*%mandeep098765'  // generated ethereal password
     },
  
     tls:{
       rejectUnauthorized:false
     }
   });
 
   // setup email data with unicode symbols
   let mailOptions = {
       from: '"TechExplica Enquiry" <riyag743@gmail.com>', // sender address
       to: 'yadavmandeep96@gmail.com', // list of receivers
       subject: 'Course Enquiry', // Subject line
       text: 'Hello world?', // plain text body
       html: output // html body
   };
 
   // send mail with defined transport object
   transporter.sendMail(mailOptions, (error, info) => {
       if (error) {
           return console.log(error);
       }
       console.log('Message sent: %s', info.messageId);   
       console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
 
       res.send('Email has been sent');
   });
 
 
 });

 router.post("/getvideoData",function(req,res)
 {
     var tid=req.body.tid;
     console.log("tset:"+tid);
     con.query("SELECT file_loc from tbl_video_tutorial where tid='"+tid+"'",function(err,row){
 if(err)
 {
     throw err;
 }
 else
 {
     console.log(row[0]);
     res.send(row);
 }
     })
 });

 router.post('/news_events',function(req,res)
{
    console.log("news called");
   var event_day=req.body.event_day;
   var heading=req.body.heading;
   var short_desc=req.body.short_desc;
   var long_desc=req.body.long_desc;
   var status = '1';
    var data=[event_day,heading,short_desc,long_desc,status];
    
    
    con.query("INSERT INTO tbl_news_events (event_day,heading,short_heading,long_heading,status) values(?,?,?,?,?)",data, function (err, res){
        if(err) {
            console.log("mysql error" + err);
            throw err;
        }
        else
            console.log("value inserted : tutorial " );
    });


});

router.get("/getnews",function(req,res)
{
    console.log("get news called");
    con.query("SELECT * FROM tbl_news_events",function(err,result)
{
    if(err)
    {
        console.log(err);
        throw err;
    }
    else
    {
        res.send(result);
    }
})
})

router.post("/getEvent",function(req,res)
{
    console.log("get event called");
    var heading = req.body.heading;
    console.log("heading"+ heading);
    con.query("SELECT * FROM tbl_news_events where heading='"+heading+"'",function(err,result)
{
    if(err)
    {
        console.log(err);
        throw err;
    }
    else
    {
        // console.log(res[0].heading);
        res.send(result);
    }
})
})


router.post("/contactStore",function(req,res)
{
    console.log("contact called"+req.body.school);
    var is_readed='1';
    var interest="c";
    var name = req.body.name;
    var email = req.body.email;
    var school =  req.body.school;
    var phone = req.body.phone;
    var message = req.body.message;
    console.log("school"+school);
    var data = [name,email,school,interest,phone,message,is_readed];
    con.query("INSERT INTO tbl_enquiry (name,email_id,school,interest,phone,message,is_readed) VALUES (?,?,?,?,?,?,?)",data,function(err,res)
    {
        if(err)
        {
            console.log(err);
            throw err;
        }
        else
        {
            console.log("contact inserted");
        }
    }
    )
}
);

router.post('/addCategory',function(req,res)
{
    console.log("api"+req.body.type);
    console.log("add category called");
    var categoryName=req.body.categoryName;
    var createdBy="123";
    var active='1';
    var child='0';
    var test=req.body.type;
    var type11;
    console.log("after api"+ test);
    // con.query("select cid from tbl_category WHERE name = '" + test + "'", function(err, rows){
    //     if(err) {
    //       throw err;
    //     } else {
    //      var type=rows;
    //     }
    //   });
      //test = 'hih';
   


    con.query("select cid from tbl_category where name = '" + test + "'",
function(err, rows, fields) {
    if (err) throw err;
    else {
        if(test=="main")
        {
            type11 = '0';
        }
        else
        {
        console.log("type");
        type11=rows[0].cid;
         console.log("in else "+type11);
        }
    }

    // var check = req.body.type;
    // var type=  "SELECT c_id FROM tbl_category WHERE name = '" + check + "'";
    // console.log("type " );

    var data=[categoryName,type11,day,createdBy,active,child];
    con.query("INSERT INTO tbl_category (name,p_cid,created_at,created_by,is_active,child_no) values(?,?,?,?,?,?)",data, function (err, res){
        if(err) {
            console.log("mysql error" + err);
            throw err;
        }
        else
            console.log("value inserted : category " );
    });
});
});

const uploadDIR = './uploads';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDIR);
    },
    filename: (req, file, cb) => {
       file_check=(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
      cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
    }
});

router.get('/video/:vid', function(req, res) {
    var actualpath = uploadDIR + '/' + req.params.vid;
    var fileSystem = require('fs');
    var stat = fileSystem.statSync(actualpath);

    res.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': stat.size
    });

    var readStream = fileSystem.createReadStream(actualpath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);
    //res.sendFile(actualpath);

})

let upload = multer({storage: storage});
router.post("/upload", upload.single('photo'), function(req,res) {
    console.log("fileupload");
    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
        console.log('file received');
        return res.send({
          success: true
        })
      }
});

router.post('/tutorial',function(req,res)
{

    console.log("add tutorial called");
    var catid;
    var is_active='1';
    var name=req.body.name;
    var refer_link=req.body.refer_link;
    var price;
    var discount;
    var discount_days=req.body.discount_days;
    var text_content = req.body.text_content;
    var type = req.body.type;
    var view = '230';
    var avg_rating = '5';
    var login_req = '1';
    var subscription = '20';
    var created_by = '1234';
    var updated_by = '123';
    var cid=req.body.cid;
    if(type=='video')
    {
        type=1;
    }
    else if(type=='text')
    {
        type=2;
    }
    else
    {
        type=3;
    }
    con.query("SELECT cid from tbl_category where cid='"+cid+"'",function(err,row)
{
    if(err)
    {
        console.log(err);
        throw err;
    }
    else
    {
        catid=row[0].cid;
        
    }
    if(type=='2')
    {
        price=0;
        discount=0;
    }
    else
    {
        price=req.body.price;
        discount=req.body.discount;
    }

    var data=[catid,name,name,is_active,refer_link,price,discount,discount_days,type,view,avg_rating,login_req,subscription,day,created_by,updated_by];
    console.log("catid="+catid);
    con.query("INSERT INTO tbl_tutorial (catid,name,printname,is_active,refer_link,price,discount,discount_till,type,views,Avg_Rating,Login_Req,Subscription,Created_at,created_by,updated_by) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",data, function (err, res){
        if(err) {
            console.log("mysql error" + err);
            throw err;
        }
        else
            console.log("value tutorial : tbl_tutorial " );
    });
});

    con.query("select * from tbl_tutorial where name = '"+name+"' AND type='"+'1'+"'",
function(err, res) {
    if (err) throw err;
    if(res.length){
        console.log("fileupload");
        var duration = (res[0].discount_till-res[0].Created_at)
        //var file_loc=f;
        var is_deleted = '1';
        var description = req.body.text_content;
        var faculty_id = "101";
        var is_Sample= '1';
        var created='147';
        console.log("is_deleted"+is_deleted);
        var data=[res[0].tid,duration,file_check,res[0].name,is_Sample,created,faculty_id,is_deleted,description];

    con.query("INSERT INTO tbl_video_tutorial (tid,duration,file_loc,title,is_sample,uploaded_by,faculty_id,is_deleted,description) values(?,?,?,?,?,?,?,?,?)",data, function (err, res){
        if(err) {
            console.log("mysql error" + err);
            throw err;
        }
        else
            console.log("value inserted : video_tutorial " );
    });

    
}
    else {
        console.log("type");
        
        //  var type11=rows[0].cid;
        //  console.log("in else "+type11); 
    }

}
);

con.query("select * from tbl_tutorial where name = '"+name+"' AND type='3' AND catid='"+catid+"'",
function(err, res) {
    if (err) throw err;
    if(res.length){
        
            var no_of_ques = '4';
            var is_sample = 'abcxyttz';
            var faculty_id = '101';
            var is_deleted= '0';
            var created_by = '111';

            var data=[res[0].tid,no_of_ques,res[0].name,is_sample,res[0].created_by,faculty_id,is_deleted];

    con.query("INSERT INTO tbl_sample_paper (tid,no_of_ques,title,is_sample,uploaded_by,faculty_id,is_deleted) values(?,?,?,?,?,?,?)",data, function (err, res){
        if(err) {
            console.log("mysql error" + err);
            throw err;
        }
        else
            console.log("value inserted : video_tutorial " );
    });
        
    }
    else {
        console.log("type");
        
        //  var type11=rows[0].cid;
        //  console.log("in else "+type11); 
    }

}
);

con.query("SELECT * from tbl_tutorial where name = '"+name+"' AND type='2' AND catid='"+catid+"'",
function(err,res){
    console.log("after 2 inside dfds if");
    if(err)
    {
        throw err;
    }
    if(res.length){
        console.log("check test inside tut");
        
        var faculty_id = '111';
       var text_content = req.body.text_content;
        

        var data=[res[0].tid,res[0].name,text_content,res[0].created_by,faculty_id];
        console.log(res[0].name);

con.query("INSERT INTO tbl_text_course (tid,title,content,uploaded_by,faculty_id) values(?,?,?,?,?)",data, function (err, res){
    if(err) {
        console.log("mysql error" + err);
        throw err;
    }
    else
        console.log("value inserted : text_course_tutorial " );
});
    
}
else {
    console.log("type");
    
    //  var type11=rows[0].cid;
    //  console.log("in else "+type11); 
}
}
);

});

router.get('/getCategory',function(req,res){
    console.log("get category called");
	db.serialize(function(){
			var sql = "SELECT name FROM tbl_category";
            // send the records as JSON
			con.query(sql, function(err, row) {
                if(err){
                    console.log("error");
                    console.log(err);
                    res.send(err);
                }
                else{
                    
                    res.send(row); 
                } 
			});

		});
});

router.get('/verify',function(req,res){
    //console.log(req.protocol+"://"+req.get('host'));
    qhost=req.get('host');
    console.log('fefrwe' + qhost);
    let verifytoken=113;
    if((req.protocol+"://"+req.get('host'))==("http://"+qhost))
    {
        console.log("Domain is matched. Information is from Authentic email");
        if(req.query.id==verifytoken)
        {
            console.log("email is verified");
            res.send("<h1>Good Request</h1>");
            //res.send("<h1>Email "+mailOptions.to+" is been Successfully verified");
        }
        else
        {
            console.log("email is not verified");
            res.send("<h1>Bad Request</h1>");
        }
    }
    else
    {
        res.send("<h1>Request is from unknown source");
    }
    });


 router.post('/register', function (req, res) {
    console.log("register called");
    var name = req.body.Username;
    var pass_salt = crypto.randomBytes(Math.ceil(26/2)).toString('hex').slice(0,26);
    var Password = req.body.Password;
    var hash = crypto.createHmac('sha512', pass_salt);
    hash.update(Password);
    Password = hash.digest('hex');
    var email_id = req.body.email_id;
    var School = req.body.School;
    var phone=req.body.phone;
    var line1 = req.body.line1;
    var line2 = req.body.line2;
    var city = req.body.city;
    var state = req.body.state;
    var pincode = req.body.pincode;
    var class1 = "10th";
    var role='2';
    
    var stream="science";
    var interest = req.body.interest;
    var data = [name,class1, email_id,School,phone,line1,line2,city,state,pincode,stream,interest ];


    // console.log(Username);
    // console.log(Password);
    
// console.log("phone no" + Password);
// console.log("phone no" + pass_salt);
console.log("phone no" + phone);
    //console.log("add called");
    con.query("INSERT INTO tbl_student (name,class,email_id,school,phone_no,line_1,line_2,city,state,pincode,stream,interest) values(?,?,?,?,?,?,?,?,?,?,?,?)",data, function (err, res){
        if(err) {
            console.log("mysql error" + err);
            throw err;
        }
        else
            console.log("value inserted : " + res.insertid);
            var userdata = [role, email_id, Password, pass_salt, res.insertid];
            con.query("INSERT INTO tbl_USERS (role, username, password, salt, sid) values (?,?,?,?,?)", userdata, function(err, res){
                if(err) {
                    console.log("mysql error" + err);
                    throw err;
                }
                else
                {
                    console.log("Value inserted in user");  
                   
                        rand=Math.floor((Math.random() * 100) + 54);
                        host=req.get('host');
                        link="http://"+req.get('host')+"/verify?id="+rand;
                        var html =  fs.readFileSync('index.html').toString();
                        html = html.replace("{{link}}",link );
                        mailOptions={
                            to :email_id,
                            subject : "Email Confirmation",
                            html : html	
                        }
                        console.log(mailOptions);
                        smtpTransport.sendMail(mailOptions, function(error, response){
                            if(error){
                                console.log(error);
                        //     response.send("error");
                         }else{
                                console.log("Message sent: " + response.message);
                           // response.send("sent");
                             }
                    });
                    
                        //res.send(row);
                    }  
            })

    });


    /*
    db.serialize(function () {
        var stmt = db.prepare("INSERT INTO tbl_student values(?,?,?,?,?,?,?,?,?,?,?,?)");
      stmt.run(data, function (err) {
            if (err) {
                console.log("error");
                console.log(err);
                res.send(err);
            }
            else {
                stmt.finalize();
                var sql="SELECT Username FROM Register WHERE Username= '" + Username + "' AND email_id= '" + Password + "'";
               
               console.log(sql);
                console.log("test called");
                db.all(sql,function(err,row){
                    if(err){
                        console.log(err)
                        var err=[{Error:err}]
                        res.send(err);
                        
                    
        
                    }
                    else
                    {
                        rand=Math.floor((Math.random() * 100) + 54);
                        host=req.get('host');
                        link="http://"+req.get('host')+"/verify?id="+rand;
                        var html =  fs.readFileSync('index.html').toString();
                        mailOptions={
                            to :email_id,
                            subject : "Email Confirmation",
                            html : html	
                        }
                        console.log(mailOptions);
                        smtpTransport.sendMail(mailOptions, function(error, response){
                            if(error){
                                console.log(error);
                            res.end("error");
                         }else{
                                console.log("Message sent: " + response.message);
                            res.end("sent");
                             }
                    });
                    
                        //res.send(row);
                    }
                }); 
            }
        })

        }
 )*/















 
    });


    router.post('/addCourse', function (req, res) {
        console.log("Course called");
        var course=req.body.course;
        var subject_code=req.body.subject_code;
        var description=req.body.description;
        var data=[course,subject_code,description];
        con.query("INSERT INTO tbl_student (name,class,email_id,school,phone_no,line_1,line_2,city,state,pincode,stream,interest) values(?,?,?,?,?,?,?,?,?,?,?,?)",data, function (err, res){
            if(err) {
                console.log("mysql error" + err);
                throw err;
            }
            else
                console.log("value inserted : " + res.insertid);
                var userdata = [role, email_id, Password, pass_salt, res.insertid];
                con.query("INSERT INTO tbl_USERS (role, username, password, salt, sid) values (?,?,?,?,?)", userdata, function(err, res){
                    if(err) {
                        console.log("mysql error" + err);
                        throw err;
                    }
                    else
                        console.log("Value inserted in user");    
                })
    
        });

        

        // db.serialize(function () {
        //     var stmt = db.prepare("INSERT INTO course values(?,?,?)");
        //   stmt.run(data, function (err) {
        //         if (err) {
        //             console.log("error");
        //             console.log(err);
        //             res.send(err);
        //         }
        //         else {
        //             stmt.finalize();
        //             var sql="SELECT course FROM course WHERE course= '" + course + "'";
        //             console.log("course called");
        //             db.all(sql,function(err,row){
        //                 if(err){
        //                     var err=[{Error:err}]
        //                     res.send(err);
        //                 }
        //                 else
        //                 {
        //                     res.send(row);
        //                 }
        //             }); 
        //         }
        //     });
    
        //   })
        });

        router.get('/getvideoCourseData',function(req,res){
            
            //console.log(videoCourse); 
        
                console.log("get called");
            db.serialize(function(){
                    var sql = "SELECT * FROM course ";
                    // send the records as JSON
                    db.all(sql, function(err, row) {
                        if(err){
                            console.log(err);
                            res.send(err);
                        }
                        else{
                        console.log(row);
                        res.send(row);    
                        } 
                    });
        
                });
        });

        router.post('/getContentByCourse',function(req,res){
            var videoCourse = req.body.videoCourse;
            console.log(videoCourse); 
        
                console.log("get called");
            db.serialize(function(){
                    var sql = "SELECT * FROM course WHERE course = '" + videoCourse + "'";
                    // send the records as JSON
                    db.all(sql, function(err, row) {
                        if(err){
                            console.log(err);
                            res.send(err);
                        }
                        else{
                        console.log(row);
                        res.send(row);    
                        } 
                    });
        
                });
        });

        router.post('/addTextCourse', function (req, res) {
            console.log(" text Course called");
            var topic_name=req.body.topic_name;
            var sub_topic=req.body.sub_topic;
            var special_note=req.body.special_note;
            var content=req.body.content;
            var courseSelect=req.body.courseSelect;
            console.log(topic_name);
            var data=[courseSelect,topic_name,sub_topic,special_note,content];
            console.log(data);
            db.serialize(function () {
                var stmt = db.prepare("INSERT INTO text_course values(?,?,?,?,?)");
                console.log("insertion");
              stmt.run(data, function (err) {
                    if (err) {
                        console.log("error");
                        console.log(err);
                        res.send(err);
                    }
                    else {
                        stmt.finalize();
                        var sql="SELECT topic_name FROM text_course";
                        console.log("text course called");
                        db.all(sql,function(err,row){
                            if(err){
                                var err=[{Error:err}]
                                res.send(err);
                            }
                            else
                            {
                                res.send(row);
                            }
                        }); 
                    }
                });
        
              })
            });

            router.get('/getvideoCourse',function(req,res){
                console.log("get video category called");
                db.serialize(function(){
                        var sql = "SELECT * FROM tbl_tutorial where type='1'";
                        // send the records as JSON
                        con.query(sql, function(err, row) {
                            if(err){
                                console.log(err);
                                res.send(err);
                            }
                            else{
                            console.log(row);
                            res.send(row);    
                            } 
                        });
            
                    });
            });

            router.post('/getvideobyID',function(req,res){
                var tid = req.body.tid;
                console.log("in api"+tid); 
            
                    console.log("get video by id called");
                db.serialize(function(){
                        var sql = "SELECT name,printname,(price-discount) AS final_amount,(discount*100/price) AS discount_percentage,price,discount FROM tbl_tutorial WHERE tid = '" + tid + "'";
                        // send the records as JSON
                        con.query(sql, function(err, row) {
                            if(err){
                                console.log(err);
                                res.send(err);
                            }
                            else{
                            console.log(row);
                            res.send(row);    
                            } 
                        });
            
                    });
            });

            router.post('/getCourseData',function(req,res){
                var cid = req.body.cid;
                console.log("get course category called"+cid);
                db.serialize(function(){
                        var sql = "SELECT * FROM tbl_tutorial where catid='"+cid+"'";
                        // send the records as JSON
                        con.query(sql, function(err, row) {
                            if(err){
                                console.log(err);
                                res.send(err);
                            }
                            else{
                            console.log(row);
                            res.send(row);    
                            } 
                        });
            
                    });
            });

        router.get("/getUserNumber",function(req,res)
        {
            console.log("welcome users");
            con.query("SELECT count(uid) AS userNumber from tbl_users",function(err,result)
        {
            if(err)
            {
                throw err;
            }
            else
            {
                console.log(result);
                res.send(result);
            }
        }
        )
        });

        router.post("/textCourseData",function(req,res)
        {
            var sideData = req.body.sideData;
            console.log("inside text course now"+req.body.sideData);
            con.query("SELECT content FROM tbl_text_course where tid='"+ sideData +"'",function(err,row){ 
            if(err)
            {
                console.row(err);
                throw err;
            }
            else
            {
                res.send(row);
            }
            })
        })
         

        router.get("/getcourseNumber",function(req,res)
        {
            console.log("welcome users");
            con.query("SELECT count(tid) AS courseCount from tbl_tutorial",function(err,result) //changes
        {
            if(err)
            {
                throw err;
            }
            else
            {
                res.send(result);
            }
        }
        )
        });

        router.get("/getfacultyNumber",function(req,res)
        {
            con.query("SELECT count(fid) AS facultyNumber FROM tbl_faculty",function(err,result)
        {
            if(err)
            {
                throw err;
            }
            else
            {
                console.log("gsgf"+result[0].facultyNumber);
                res.send(result);
            }
        })
        });

            router.post('/addVideoCourse', function (req, res) {
                console.log(" video Course called");
                var video_name=req.body.video_name;
                var video_description=req.body.video_description;
                var price=req.body.price;
                var discount=req.body.discount;
                var discount_days=req.body.discount_days;
                console.log(video_name,video_description,price,discount);
                var data=[video_name,video_description,price,discount,discount_days];
                db.serialize(function () {
                    var stmt = db.prepare("INSERT INTO video_course values(?,?,?,?,?)");
                    console.log("insertion");
                  stmt.run(data, function (err) {
                        if (err) {
                            console.log("error");
                            console.log(err);
                            res.send(err);
                        }
                        else {
                            stmt.finalize();
                            var sql="SELECT video_name FROM video_course";
                            console.log("video course called");
                            db.all(sql,function(err,row){
                                if(err){
                                    var err=[{Error:err}]
                                    res.send(err);
                                }
                                else
                                {
                                    res.send(row);
                                }
                            }); 
                        }
                    });
            
                  })
                });

           

/* var sql = "SELECT * FROM tbl_users WHERE username = '" + email_id + "'";
            // send the records as JSON
			con.query(sql, function(err, row) {
                if(err){
                    console.log("error");
                    console.log(err);
                    res.send(err);
                }
                else{*/

router.get('/courselist',function(req,res){
    console.log("get course called");
	db.serialize(function(){
			//var sql = 
			// send the records as JSON
			con.query("SELECT * FROM tbl_category where p_cid='0'", function(err, row) {
                if(err){
                    console.log(err);
                    res.send(err);
                }
                else{
                    console.log("check2:"+row[0].cid);
                    console.log(row);
			        res.send(row);    
                } 
			});

		});
});


//get list of course
router.post('/getList',function(req,res)
{
    console.log("inside getlist");
    var getItem = req.body.getItem;
    con.query("SELECT * FROM tbl_category where p_cid = '"+getItem+"'",function(err,result)
    {
        if(err)
        {
            console.log(err);
            throw err;
        }
        else
        {
            res.send(result);
        }
    })
});

// router.get('/payment',function(req,res){
//     console.log("payment called");
//});

    
router.post('/payment', (req, res) => {
    var price=req.body.amount;
    //console.log(req);
    console.log(price);
    console.log("payment called");
    const create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:3000/success",
          "cancel_url": "http://localhost:3000/cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": "Mandeep",
                  "sku": "001",
                  "price": price,
                  "currency": "INR",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "INR",
              "total": price,
          },
          "description": "Payment description"
      }]
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        for(let i = 0;i < payment.links.length;i++){
          if(payment.links[i].rel === 'approval_url'){
              console.log(payment.links[i].href);
            res.redirect(payment.links[i].href);
          }
        }
    }
  });
  
  });
  
  router.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
  
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "INR",
              "total": "INR"
          }
      }]
    };
  
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
          console.log(error.response);
          throw error;
      } else {
          console.log(JSON.stringify(payment));
          res.send('Success');
      }
  });
  });
  
  router.get('/cancel', (req, res) => res.send('Cancelled'));
    


module.exports = router;
