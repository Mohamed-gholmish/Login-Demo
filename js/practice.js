let logInPassword = document.querySelector("#signInPassword");
let logInEmail = document.querySelector("#signInEmail");
let logInBtn = document.querySelector("#signInBtn");
let signUpname = document.querySelector("#signUpName");
let signUpemail = document.querySelector("#signUpEmail");
let signUppassword = document.querySelector("#signUpPassword");
let signUpBtn = document.querySelector("#signUpBtn");
var logOutBtn = document.querySelector("#logOutBtn");
let users = [];
// ----when start
if (localStorage.getItem("users") !== null) {
  users = JSON.parse(localStorage.getItem("users"));
}

// ------user events
if (signUpBtn !== null) {
  signUpBtn.addEventListener("click", function () {
    if (isSignUpEmpty() == false) {
      document.getElementById("userStatus").innerText =
        "all fields are required";
      return false;
    }
    if (validateEmail() === false) {
      document.getElementById("userStatus").innerText =
        "please insert valid email";
      return false;
    }

    if (searchEmail()) {
      addNewUser();
      document.getElementById("userStatus").innerText = "Success";
    } else {
      document.getElementById("userStatus").innerText = "exist email";
    }
  });
}

if (logInBtn !== null) {
  logInBtn.addEventListener("click", function () {
    console.log(searchUser());
    if (isLogInEmpty() == false) {
      document.getElementById("userStatus").innerText =
        "all fields are reauired";
      return false;
    }
    if (searchUser()) {
      gotoHome();
    } else {
      document.getElementById("userStatus").innerText =
        "incorrect password or email";
    }
  });
}

if (logOutBtn !== null) {
  logOutBtn.addEventListener("click", function () {
    logOut();
  });
}

function readExistUser() {
  var existUser = {
    userEmail: logInEmail.value,
    userPassword: logInPassword.value,
  };
  return existUser;
}

function readNewUser() {
  var newUser = {
    userName: signUpname.value,
    userEmail: signUpemail.value,
    userPassword: signUppassword.value,
  };
  return newUser;
}

function addNewUser() {
  if (searchEmail(readNewUser().userEmail)) {
    users.push(readNewUser());
    localStorage.setItem("users", JSON.stringify(users));
  }

  console.log(JSON.parse(localStorage.getItem("users")));
}

// ----- search
function searchEmail() {
  var result = users.filter(function (el) {
    return el.userEmail === readNewUser().userEmail;
  });
  if (result.length == 0) {
    return true;
  } else {
    return false;
  }
}

function searchUser() {
  var result = users.filter(function (el) {
    return (
      el.userEmail === readExistUser().userEmail &&
      el.userPassword === readExistUser().userPassword
    );
  });
  if (result.length === 0) {
    return false;
  } else {
    return true;
  }
}

// ------go to home.html file
function gotoHome() {
  return new Promise(function () {
    window.location.href = "/home.html";
  });
}

function displayInhome() {
  return new Promise(function (x) {
    document.getElementById(
      "homeText"
    ).innerHTML = ` ${readExistUser.userName}`;

    x();
  });
}

function change() {
  console.log(document.getElementById("welcomeUser"));
}

function logOut() {
  window.location.href = "/index.html";
}

function isLogInEmpty() {
  if (readExistUser().userEmail == "" || readExistUser().userPassword == "") {
    return false;
  } else {
    return true;
  }
}

function isSignUpEmpty() {
  if (
    readNewUser().userEmail == "" ||
    readNewUser().userPassword == "" ||
    readNewUser().userName == ""
  ) {
    return false;
  } else {
    return true;
  }
}

function validateEmail() {
  let regex = /^\w+@[a-z]+\.[a-z]{2,3}$/gm;

  if (regex.test(readNewUser().userEmail)) {
    return true;
  } else {
    return false;
  }
}
