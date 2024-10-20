"use strict";
var express=require('express');
var path=require('path');
var router=express.Router();
const fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
//var document=require('./public/trial.html');
const mongoose  = require('mongoose');
mongoose.connect("mongodb+srv://sayali21joshi:BSOInyNN6usdpMQB@cluster0.voozemb.mongodb.net/miniProject",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //bufferTimeoutMS: 20000 
}).then(
    () => {
        console.log("database connected");
    }
).catch(
    (err) => {
        console.log(err);
    }
);

const Job=require('./submitJob.js');
const { join } = require('path');
//const document='./public/trial.html'
router.get('/trial', async function(req,res){
    var jobs= await Job.find().exec();
      console.log(jobs);
      //res.send(jobs);
     // if (typeof window !== 'undefined') 
     {
        //jobs.sendFile(path.join(__dirname, 'public', 'trial.html'));
     //var Usrdata = document.querySelector('.card');
     //var jobDetails= document.getElementById("test1").innerHTML;
     var jobDetails = jobs.map(user => 
        `<div class="card">
        <div>BUSINESS: ${user.jobOrbusiness}</div>
        <div><img class="avatar" src=" ${user.images}" alt=""></div>
          <div>OwnerName: ${user.ownername}</div>
          <div>Location: ${user.location}</div> 
          <button  class="btn"  data-toggle="modal"  onclick="DisplayAdd('${jobs._id}')">DEAL</button>        
        </div>`
    ).join();
      }
      console.log(jobDetails);
      //res.send("Hello");
      const html = fs.readFileSync('./public/trial.html', 'utf-8');

      const dom = new JSDOM(html);
    const document = dom.window.document;
      //res.sendFile(path.join(__dirname, 'public', 'trial.html'));
      document.getElementById("test1").innerHTML=jobDetails;
      var display=dom.serialize();
      console.log(display);
     return res.send(display);

      /*var Modal = document.getElementById("modal"); 
      function DisplayAdd(id){
        console.log(id);
        var docRef = .doc(id);

        docRef.get().then(function(doc) {
            if (doc.exists) {

                console.log("Document data:", doc.data());

                if(doc.data().userId==userId){
                    ModalMain.innerHTML=`
                
            <div class="modal-header">
            <a href="#" data-dismiss="modal" class="class pull-left"><span class="glyphicon glyphicon-remove"></span></a>
                <h3 class="modal-title">${doc.data().Category}</h3>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6 product_img">
                        <img src="${doc.data().img}" class="img-responsive">
                    </div>
                    <div class="col-md-6 product_content">
                        <h2 id="Adtitle">${doc.data().AdTitle}</h2>
                        <h4 id="name">Name: ${doc.data().Name}</h4>
                        <p id="AdDescriptiion">${doc.data().AdDescription}</p>
                        <h3 id="city"><span class="glyphicon glyphicon-map-marker"></span>${doc.data().city}</h3>
                        <h3 id="Number"><span class="glyphicon glyphicon-earphone"></span>${doc.data().number}</h3>
                        <h3 id="price"> RS ${doc.data().price}</h3>
                        
                        <div class="space-ten"></div>
                        <div class="btn-ground">
                        <button  class="btn btn-danger")">Delete Add</button>
                        </div>
                    </div>
                </div>
            </div>
                 `;

                }}*/
});
module.exports=router;

/*function searchAll(){
    var x= document.getElementById("display")
    Job.find()
    .foreach(function(doc) {
          console.log(doc.id, " => ", doc.data());
              display.innerHTML+=`
          <div class="card" style="width: 25rem";"border-radius: 15px" >
          <img class="card-img-top" src='${doc.data().images}'/>
          <div class="card-body">
            <h3 class="card-title" id="card-title">${doc.data().jobOrbusiness}</h3>
            <h4 class="card-text" id="card-text"><span class="glyphicon glyphicon-map-marker"></span>Location:${doc.data().location}</h4>
            <h3 class="card-text" id="card-name">Rs ${doc.data().ownername}</h3>
            <button  class="btn btn-primary"  data-toggle="modal" data-target="#product_view"  onclick="DisplayAdd('${doc.id}')">Request</button>
  
          </div>
          </div>
         `;
  
          })
} */