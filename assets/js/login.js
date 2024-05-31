const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");
const getOtp = document.getElementById("otp_ver");
const otp_container = document.getElementsByClassName("otp_container")[0];
const contoun = document.getElementById("countoun");
const otpnotifactions = document.getElementById("otp_notifications");
const signupName = document.getElementById("signup_name");
const signupEmail = document.getElementById("signup_email");
const signupPassword = document.getElementById("signup_password");
const signinEmail = document.getElementById("singin_email");
const signinPassword = document.getElementById("signin_password");
const singInsubmit = document.getElementById("sign_in");
const otpInbox = document.getElementsByClassName("otp");

let interval;
var seconds = 60;
var minutes = 30;

//otp expiring time

const timer = () => {
  var display = contoun;
  if (minutes < 0) {
    otpnotifactions.innerHTML = `<p>Your Otp has expired <a href="#" onclick="">Resend it</p>`;
    clearInterval(interval);
    return;
  }
  var displayMin = minutes >= 10 ? `${minutes}` : `0${minutes}`;
  var displaySecond = seconds >= 10 ? `${seconds}` : `0${seconds}`;

  display.textContent = `${displayMin} : ${displaySecond}`;

  seconds--;

  if (seconds == 0) {
    minutes--;
    seconds = 60;
  }
};

if (otpInbox) {
  const arr = Array.from(otpInbox);
  arr.forEach((element, index) => {
    element.addEventListener("keyup", () => {
      

      if (index == 3) {
        document.otpForm.submit();
      }
      if (index < arr.length - 1) {
        if (element.value.length == 1) {
          element.nextElementSibling.disabled = false;
          element.nextElementSibling.focus();
        }
      }
    });
  });
}
window.addEventListener("load", () => {
  if (contoun) {
    interval = setInterval(timer, 1000);
  }
  const alert = document.getElementsByClassName("alert")[0];
  if (alert) {
    alert.classList.add("active");
    setTimeout(() => {
      alert.classList.remove("active");
    }, 5000);
  }
});

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
  otp_container.classList.remove("active");
});

getOtp.addEventListener("click", (e) => {
  if (!nameVerification(signupName)) {
    e.preventDefault();
  }
  if (!emailValidation(signupEmail)) {
    e.preventDefault();
  }
  if (!passwordVerfication(signupPassword)) {
    e.preventDefault();
  }
});

//Sign in button Validation

singInsubmit.addEventListener("click", (e) => {
  if (!emailValidation(signinEmail)) {
    e.preventDefault();
  }
  if (!passwordVerfication(signinPassword)) {
    e.preventDefault();
  }
});

//form validation preventing sumbit if form is empty

const emailValidation = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const emailError = document.getElementById("email_error");

  if (!email.value) {
    email.nextElementSibling.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> This field cant be empty`;
    return false;
  }
  if (!emailRegex.test(email.value)) {
    email.nextElementSibling.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Invalid Email`;
    return false;
  }

  email.nextElementSibling.innerHTML = "";
  return true;
};

const passwordVerfication = (password) => {
  if (!password.value) {
    password.nextElementSibling.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> This field cant be empty`;
    return false;
  }
  if (password.value.length < 6) {
    password.nextElementSibling.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Type atleast 6 characters`;
    return false;
  }

  password.nextElementSibling.innerHTML = "";
  return true;
};

const nameVerification = (name) => {
  const nameRegEx = /^[A-Z]/;
  const nameNumRegEx = /\d/;

  if (!name.value) {
    name.nextElementSibling.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> This field cant be empty`;
    return false;
  }

  if (!nameRegEx.test(name.value)) {
    name.nextElementSibling.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> First letter must be capital`;
    return false;
  }

  if (nameNumRegEx.test(name.value)) {
    name.nextElementSibling.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Number are not allowed `;
    return false;
  }

  name.nextElementSibling.innerHTML = "";
  return true;
};

const formValidation = () => {
  const confirm = true;

  if (!nameVerification(signupName)) {
    confirm = false;
  }
  if (!emailValidation(signupEmail)) {
    confirm = false;
  }
  if (!passwordVerfication(signupPassword)) {
    confirm = false;
  }

  return confirm;
};
