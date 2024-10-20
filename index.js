
const express = require('express');
const app= express();
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const multer = require('multer');
const path=require('path');
const jwt = require("jsonwebtoken");
//const fs = require("fs");
//const jsdom = require("jsdom");
//const { JSDOM } = jsdom;

//app.use(express.json());
//app.use(express.urlencoded({extended: false}));
const session = require('express-session');
const SESSION_SECRET="My$Secret";
app.use(session({ secret:SESSION_SECRET,resave: false,
  saveUninitialized: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://sayali21joshi:BSOInyNN6usdpMQB@cluster0.voozemb.mongodb.net/miniProject",{
    useNewUrlParser: true,
    useUnifiedTopology: true, 
}).then(
    () => {
        console.log("database connected");
    }
).catch(
    (err) => {
        console.log(err);
    }
);
const port= 3000;
const User=require('./db.js');
const Job=require('./submitJob.js');
const auth = require('./auth.js');
//app.use('/',require('./trial.js'));
//require('./script.js');
app.get('/', (req, res) => {
   //return res.redirect('index.html');
   res.send('index');
})
app.get('/login',auth.isLogout, (req, res) => {
    //return res.redirect('login.html');
    res.send('login.html');
})
app.get('/register',auth.isLogout, (req, res) => {
   // return res.redirect('register.html');
    res.send('register.html');
})
app.post('/login', async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
     // console.log(db.collection('users'));
      // Perform further validation or authentication logic
      const user=await User.findOne({email: email});
      console.log(user);
            if(user===null){
                console.log('email does not exist');
            }
           // else if (err) throw(err);
            if(user.password===password){
                req.session.user = user;
                let token = jwt.sign(
                  {
                    userId: user._id.toString(),
                    organization: "FunctionUp",
                  },
                  "My$Secret",
                  { expiresIn: "24h" }
                );
            
                // return res.status(200).send({
                //   status: true,
                //   message: "User login successfull",
                //   data: { userid: user._id, token: token },
                // });
                //console.log("login success");
              return res.redirect('/');
            }
            else{
                console.log('password is incorrect,email:',email,'password:',password);
                res.send("password is incorrect");
            }
      //console.log({'email': email, 'password': password});

    } catch (error) {
      console.log({ error });
    }
  });
  //app.get('/:userid', (req, res) => {
    //return res.redirect('index.html');
   // res.redirect('/');
// })
 app.get("/:userId/profile", auth.isLogin, (req, res) => {
  //return res.redirect('index.html');
 
})

  app.get('/logout', auth.isLogin,(req, res) => {
    res.redirect('/');
    req.session.destroy();
    
    console.log('user logged out');
  })

  app.post('/register', async (req, res) => {
    try {
      const password = req.body.password;
      const cpassword = req.body.confirmpassword;
     // console.log(req.body.username,password,cpassword)
      //res.send(req.body.username);
      // Perform further validation or authentication logic
        if(password===cpassword){
            const registerUser = new User({
                name: req.body.username,
                email: req.body.email,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword
                
            })

           const registered=await registerUser.save();
           console.log(registered);
           res.redirect('login.html')
        }
        else{
            console.log("passwords do not match");
            res.send("passwords do not match");
        }
      //console.log({'email': email, 'password': password , 'name': name});
    } catch (error) {
      console.log({ error });
    }
  });

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       return cb(null, path.join(__dirname, 'public/uploads'))
    },
    filename: (req, file, cb) => {
      return  cb(null,file.originalname)
    }
});
 
const upload = multer({ storage: storage });

  app.get('/submitJob',auth.isLogin, async(req, res) => {
    let conn=await connect();
    //return res.redirect('submitJob.html');
    res.send('submitJob.html');
  })
  app.post('/submitJob',upload.single('UploadImage'), async (req, res) => {
      try{
       const jobsubmit = new Job({
            ownername: req.body.ownerName,
            jobOrbusiness: req.body.JobTitle,
            category: req.body.Category,
            jobDescription: req.body.JobDescription,
            images:'uploads/'+req.file.originalname,
            BNumber: req.body.BNumber,
            location: req.body.location
        })
        console.log(req.body.ownerName,
     req.body.JobTitle,
            req.body.Category,
             req.body.JobDescription,
           req.body.UploadImage,
             req.body.BNumber,
            req.body.location)


      const jobSubmitted=await jobsubmit.save();
      console.log(jobSubmitted);
      res.redirect('index.html')
     // const duplicateDocuments = await Job.find({ name: null }).exec();
     // res.redirect('/')
      
      }
      catch (error) {
        console.log({ error });
      }
  });
     

  app.get('/trial', async function(req,res){
  
    var jobs= await Job.find().exec();

    return res.json(jobs)
//       console.log(jobs);
//       //res.send(jobs);
//      // if (typeof window !== 'undefined') 
//      {
//         //jobs.sendFile(path.join(__dirname, 'public', 'trial.html'));
//      //var Usrdata = document.querySelector('.card');
//      //var jobDetails= document.getElementById("test1").innerHTML;
//      var jobDetails = jobs.map(user => 
//         `<div class="card">
//         <div>BUSINESS: ${user.jobOrbusiness}</div>
//         <div><img class="avatar" src=" ${user.images}" alt=""></div>
//           <div>OwnerName: ${user.ownername}</div>
//           <div>Location: ${user.location}</div> 
//           <button  class="btn"  data-toggle="modal"  onclick="DisplayAdd('${jobs._id}')">DEAL</button>        
//         </div>`
//     ).join();
//       }
//       //console.log(jobDetails);
//       //res.send("Hello");
//       const html = fs.readFileSync('./public/trial.html', 'utf-8');

//       const dom = new JSDOM(html,{
//         url: 'http://localhost:3000/trial?id=1'
//       });
//     const document = dom.window.document;
//     const {window} = dom;
// const url=require('url');
// const querystring = require('querystring');

// // Assuming the URL is "/trial?id=your_id_value"
// const urlString = window.location.href;
// console.log(urlString);
// //var urlParams = new URLSearchParams(urlString);
// //console.log(urlParams.get("id"));

// const parsedUrl = url.parse(urlString);
// const queryParams = querystring.parse(parsedUrl.query);
// const id = queryParams.id;

// console.log(id); // Output: your_id_value
      
//       document.getElementById("test1").innerHTML=jobDetails;
//       var display=dom.serialize();
//       //console.log(display);
//       //dom.window.document.body.appendChild( document.getElementById("test1").innerHTML);
//      return res.send(display);

});
app.get('/teachers', async function(req,res){
  
  var jobs= await Job.find({category:'Teaching'}).exec();

  return res.json(jobs)
})
   
app.get('/driving', async function(req,res){
  
  var jobs= await Job.find({category:'Driving'}).exec();

  return res.json(jobs)
})
app.get('/carpentry', async function(req,res){
  
  var jobs= await Job.find({category:'Carpentry'}).exec();

  return res.json(jobs)
})
app.get('/electrician', async function(req,res){
  
  var jobs= await Job.find({category:'Electrician'}).exec();

  return res.json(jobs)
})
app.get('/plumber', async function(req,res){
  
  var jobs= await Job.find({category:'Plumbing'}).exec();

  return res.json(jobs)
})
app.get('/repair', async function(req,res){
  
  var jobs= await Job.find({category:'AutomobileRepair'}).exec();

  return res.json(jobs)
})
app.get('/${Job.find()}', async function(req,res){
  
  var jobs= await Job.find({category:'AutomobileRepair'}).exec();

  return res.json(jobs)
})

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})


