var logInPassword=document.querySelector('#signInPassword');
var logInEmail=document.querySelector('#signInEmail');
var logInBtn=document.querySelector('#signInBtn');

var signUpname=document.querySelector('#signUpName');
var signUpemail=document.querySelector('#signUpEmail');
var signUppassword=document.querySelector('#signUpPassword');
var signUpBtn=document.querySelector("#signUpBtn");
var logOutBtn=document.querySelector("#logOutBtn");
var users=[];
//  عاوز اعرف شرح الكود د وازاي انقل بين الصفحان وبعضها كده
// var pathparts = location.pathname.split("/");
// var baseURL = ''
// for (var i = 0; i < pathparts.length - 1; i++) {
//     baseURL += '/' + pathparts[i]
// }
// console.log(baseURL);


// changed -> staged -> commited

// ----when start
if((localStorage.getItem("users"))!==null){
  users=JSON.parse(localStorage.getItem("users"));

}

// ------user events
if(signUpBtn!==null){
signUpBtn.addEventListener("click",function(){
  if (isSignUpEmpty()==false){
  document.getElementById("userStatus").innerText="all fields are required";
  return false;
  }
  if(searchEmail()){
    addNewUser();  
    document.getElementById("userStatus").innerText="Success";
  }
  else{
  document.getElementById("userStatus").innerText="exist email";
  }
}) 
}


if(logInBtn!==null){
logInBtn.addEventListener("click",function(){
  console.log(searchUser())
  if(isLogInEmpty()==false){
    document.getElementById("userStatus").innerText="all fields are reauired";
    return false;
  }
  if(searchUser()){
   gotoHome();
  }
  else{
   document.getElementById("userStatus").innerText="incorrect password or email"
  }

  
}
  )}


if(logOutBtn!==null){
   logOutBtn.addEventListener("click",function(){
    logOut();
   })
}


function readExistUser(){
  var existUser={
  userEmail:logInEmail.value,
  userPassword:logInPassword.value
  }
  return existUser;
}


function readNewUser(){
  var newUser={
   userName:signUpname.value,
    userEmail:signUpemail.value,
   userPassword:signUppassword.value
  }
  return newUser;

}


function addNewUser(){
if( searchEmail(readNewUser().userEmail)){
    users.push(readNewUser());
localStorage.setItem("users", JSON.stringify(users))
}



console.log(JSON.parse(localStorage.getItem("users")))

}



// ----- search
function searchEmail(){
var result = users.filter(function(el){
    return el.userEmail===readNewUser().userEmail;
  });
if(result.length==0){
   return true;
}
else{ return false;}
}

function searchUser(){
  var result = users.filter(function(el){
      return  el.userEmail===readExistUser().userEmail&&el.userPassword===readExistUser().userPassword;
    });
  if(result.length==0){
     return false;
  }
  else{ return true;}
  }

  // ------go to home.html file
function  gotoHome(){
  return new Promise(function(){
 window.location.href = "/home.html";
     
  })
   
  }


  function displayInhome(){
    return new Promise(function(x){
        document.getElementById("homeText").innerHTML=` ${readExistUser.userName}`;
      
          x()})

  }

  
function change(){ console.log(document.getElementById("welcomeUser"))}



function logOut(){
  window.location.href = "/index.html";
}


function isLogInEmpty(){  
if (readExistUser().userEmail==""||readExistUser().userPassword==""){
return false;
}
else{return true;} 
}

  

function isSignUpEmpty(){  
  if (readNewUser().userEmail==""||readNewUser().userPassword==""||readNewUser().userName==""){
  return false;
  }
  else{return true;} 
  }
  


function validateEmail(){
  let regex=/^\w+@[a-z]+\.[a-z]{2,3}$/gm;

  if(regex.test(readNewUser().userEmail)){
    return true;
  }
  else{
    return false;
  }

}


function validatePassowrd(){

}


// // let regex=/./gm;
// //   console.log(regex.test(readExistUser().userEmail)&&regex.test(readExistUser().userPassword) );

