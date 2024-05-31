var action_btns;
let firstName = document.getElementById("firstname");
let secondName = document.getElementById("lastname");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let username = document.getElementById("username");
let quolification = document.getElementById("quolification");
let state = document.getElementById("state");
let city = document.getElementById("city");
let salutaion = document.getElementById("salutation");
let dob = document.getElementById("dob");
let address = document.getElementById("address");
let country = document.getElementById("country");
let password = document.getElementById("password");

//onload
window.addEventListener("load", () => {
  document.getElementsByClassName("loader")[0].classList.add("loader--hidden");
});

// Fetching employees with AJAX req
const fetchData = (url) => {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onreadystatechange = () => {
    if ((xhr.readyState === 4 && xhr.status === 200) || xhr.status === 304) {
      var result = JSON.parse(xhr.responseText);
      console.log(result.count[0].count)
      displayData(result.data);
      employeeCount = result.count[0].count;
      makeBtn(result.count[0].count);
      pagination();
      document.getElementsByClassName("loader")[0].classList.add("loader--hidden");
      let nav_btns = document.getElementsByClassName("paginBtns");
      nav_btns[currentPage - 1].classList.add("active");

    }
  };
  xhr.send();
};
// Formatting date

const formateDate = (dob) => {
  let formated = dob.split("-");
  return `${formated[2]}-${formated[1]}-${formated[0]}`;
};

//Formatting Date with month
const dateWithMonth = (dob) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let date = new Date();

  let dateSplit = dob.split("-");
  console.log(dateSplit);

  return `${dateSplit[0]}-${months[dateSplit[1] - 1]}-${dateSplit[2]}`;
};
// Opening Form to add Employee

const openAddform = () => {

  const employeeForm = document.getElementById("employeform");
  const overlay = document.getElementById("overlay");

  employeeForm.classList.add("active");
  overlay.classList.add("active");
  document.getElementById("addUser").style.display = "block";
  document.getElementById("editUser").style.display = "none";
  document.getElementById("form-tittle").textContent = "Add Employee";
};

//Closing Form to add employee
const closeAddform = () => {
  const employeeForm = document.getElementById("employeform");
  const overlay = document.getElementById("overlay");

  employeeForm.classList.remove("active");
  overlay.classList.remove("active");
  action_btns?.classList.remove("pops");
  clearFormData();
};
// Openning Warning Box

const openAlert = () => {
  const alertBox = document.getElementsByClassName("alert-box")[0];
  const overlay = document.getElementById("overlay");

  alertBox.classList.add("active");
  overlay.classList.add("active");
  action_btns.style.zIndex = "1";
  alertBox.style.zIndex = "3";
  overlay.style.zIndex = "2";
};

//Close Alert

const closeAlert = () => {
  const alertBox = document.getElementsByClassName("alert-box")[0];
  const overlay = document.getElementById("overlay");

  alertBox.classList.remove("active");
  overlay.classList.remove("active");
  if (action_btns) {
    action_btns.style.display = "none";
  }
};

let selectedUser = {};

const getUser = async () => {
  try {
    const res = await fetch(
      "http://localhost:3000/employees/employee/" + userId,
      {
        method: "GET",
      }
    );
    const user = await res.json();

    //Error handling
    if (!res.ok) {
      console.log(user.description);
      return;
    }

    putUser(user.data);
    selectedUser = user;
  } catch (error) {
    console.log(error);
  }
};

const putUser = (user) => {
  const imagePrev = document.getElementById("upload");
  imagePrev.innerHTML = " ";
  imagePrev.setAttribute("style", "width:25% !important");

  let prevData = `<img src = "/uploads/${user.avatar}"  height=115 width=115  id="selectedPic">`;
  imagePrev.innerHTML = prevData;

  let selectedPic = document.getElementById("selectedPic");

  selectedPic.setAttribute("style", "border-radius:12px");

  document.getElementById("changeBtn").style.display = "block";
  //Radio Buttons
  const rdb1 = document.getElementById("male");
  const rdb2 = document.getElementById("female");

  document.getElementById("salutation").value = user.salutation;
  document.getElementById("firstname").value = user.firstname;
  document.getElementById("lastname").value = user.lastname;
  document.getElementById("email").value = user.email;
  document.getElementById("phone").value = user.phone;
  document.getElementById("username").value = user.username;
  document.getElementById("quolification").value = user.quolifications;
  document.getElementById("state").value = user.state;
  document.getElementById("city").value = user.city;
  user.gender === "Male" ? (rdb1.checked = true) : (rdb2.checked = true);
  document.getElementById("dob").value = formateDate(user.dob);
  document.getElementById("address").value = user.address;
  document.getElementById("country").value = user.country;
  document.getElementById("password").value = user.password;
  document.getElementById("pin").value = user.pin;

  openAddform();

  document.getElementById("addUser").style.display = "none";
  document.getElementById("editUser").style.display = "block";
  document.getElementById("form-tittle").textContent = "Edit Employee";
  const overlay = document.getElementById("overlay");

  action_btns.style.zIndex = "1";
  overlay.style.zIndex = "2";
};

//Calculating Age

const age = (dob) => {
  let date = new Date();
  let year = date.getFullYear();
  let birthDate = dob.split("-");
  let birthYear = parseInt(birthDate[2]);

  return year - birthYear;
};

//View Details

let params = new URLSearchParams(document.location.search);
let id = params.get("id");

console.log(id);

const goTo = async () => {
  let viewData = document.getElementById("employeeview");

  try {
    const res = await fetch("http://localhost:3000/employees/employee/" + id, {
      method: "GET",
    });
    const user = await res.json();
    console.log(user);

    viewData.innerHTML = `
       <div class="avatar">
       <img src="/images/Background Image.png" alt="avatar" id="avatar">
       <div id="userP">
       <img src="/uploads/${user.data.avatar}" alt="profile-img" >
       </div>
       <h2>${user.data.salutation}.${user.data.firstname}.${
      user.data.lastname
    } </h2>
       <h5>${user.data.email}</h5>
   </div>
  

   <div class="moredetails">
     <div class="row">
         <div class="col-4">
             <h6 class="details-head">Gender</h6>
             <h5 class="details">${user.data.gender}</h5>
         </div>
         <div class="col-4">
           <h6 class="details-head">Age</h6>
           <h5 class="details">${age(user.data.dob)}</h5>
         </div>
         <div class="col-4">
           <h6 class="details-head">Date of Birth</h6>
           <h5 class="details">${dateWithMonth(user.data.dob)}</h5>
         </div>
     </div>

     <div class="row">
       <div class="col-6">
           <h6 class="details-head">Mobile Number</h6>
           <h5 class="details">${user.data.phone}</h5>
       </div>
       <div class="col-6">
         <h6 class="details-head">Qualification</h6>
         <h5 class="details">${user.data.quolifications}</h5>
       </div>
      
   </div>


   <div class="row">
     <div class="col-6">
         <h6 class="details-head">Address</h6>
         <h5 class="details">${user.data.address}</h5>
     </div>
     <div class="col-6">
       <h6 class="details-head">Username</h6>
       <h5 class="details">${user.data.username}</h5>
     </div>
    
 </div>
 </div>
    
 <div class=" d-flex justify-content-end gap-2 mt-3">

   <button type="submit" class="btn fill-btn py-3 px-4" onclick="openAlert()"  id="delete" >Delete</button>
   <button type="submit" class="btn fill-btn py-3 px-4" onclick="getUser()" >Edit Details </button>
 
 </div>
</div>
       `;
    //Error handling
    if (!res.ok) {
      console.log(user.description);
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

goTo();

userId = id;

const deleteUser = async () => {
  const xhr = new XMLHttpRequest();

  xhr.open("DELETE", "http://localhost:3000/employees/employee/" + userId);

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 204) {
    
      fetchData(
        `http://localhost:3000/employees/employee?limit=${dataPerpage}`
      );

      showMessage("User deleted successfully");
      setTimeout("hideMessage()", 3000);
      closeAlert();
    }
  };

  xhr.send();

};

//PUT User

document.getElementById("editUser").addEventListener("click", (event) => {
  event.preventDefault();
  editUser(userId);
});

const editUser = async (id) => {
  formvalidation();
  if (profile_pic) {
    addAvatar(userId);
    fetchData();
  }

  const xhr = new XMLHttpRequest();

  xhr.open("PUT", "http://localhost:3000/employees/employee/" + id);

  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 201) {
      var result = JSON.parse(xhr.responseText);
      console.log(result.message);
      fetchData(
        `http://localhost:3000/employees/employee?limit=${dataPerpage}`
      );
      closeAddform();
      showMessage("User Updated Succesfully");
      setTimeout("hideMessage()", 3000);
    }
  };
  xhr.send(JSON.stringify(getFormData()));
};

//Getting selected image from input file

let input_file = document.getElementById("formFile");
let profile_pic;

input_file.addEventListener("change", () => {
  profile_pic = input_file.files[0];
  console.log(profile_pic);
  //Displaying change button

  document.getElementById("changeBtn").style.display = "block";

  // getting preview of image

  const src = URL.createObjectURL(input_file.files[0]);
  // console.log(src)
  const imagePrev = document.getElementById("upload");
  imagePrev.innerHTML = " ";

  let prevData = `<img src = "${src}"  height=100 width=100  id="selectedPic">`;
  imagePrev.innerHTML = prevData;

  let selectedPic = document.getElementById("selectedPic");

  imagePrev.setAttribute("style", "width:25% !important");
  selectedPic.setAttribute("style", "border-radius:12px");
});

// Posting Image

const addAvatar = async (id) => {
  const userImg = new FormData();
  userImg.append("image", profile_pic);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", `http://localhost:3000/employees/${id}/avatar`);
  xhr.send(userImg);

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 201) {
      // var result = JSON.parse(xhr.responseText);
      // console.log(result);
      // fetchData();
      alert("success");
    }
  };
};

const clearFormData = () => {
  document.getElementById("firstname").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("username").value = "";
  document.getElementById("quolification").value = "";
  document.getElementById("city").value = "";
  document.getElementById("dob").value = "";
  document.getElementById("address").value = "";
  document.getElementById("country").value = "";
  document.getElementById("password").value = "";

  //Getting Back the input file

  const imagePrev = document.getElementById("upload");
  imagePrev.innerHTML = " ";

  let prevData = ` 
    <i class="bi bi-upload"></i>

    <h5>Upload Image</h5>
    <p>PNG,JPG Files are allowed</p>
`;

  document.getElementById("changeBtn").style.display = "none";
  input_file = document.getElementById("formFile");
  profile_pic = "";
  imagePrev.innerHTML = prevData;
  imagePrev.setAttribute("style", "width:100% !important");
};

//Geting FormData

const getFormData = () => {
  let newUser = {};

  newUser["salutation"] = document.getElementById("salutation").value;
  newUser["firstname"] = document.getElementById("firstname").value;
  newUser["lastname"] = document.getElementById("lastname").value;
  newUser["email"] = document.getElementById("email").value;
  newUser["phone"] = document.getElementById("phone").value;
  newUser["username"] = document.getElementById("username").value;
  newUser["quolifications"] = document.getElementById("quolification").value;
  newUser["state"] = document.getElementById("state").value;
  newUser["city"] = document.getElementById("city").value;
  newUser["gender"] = genderSelect();
  newUser["dob"] = formateDate(document.getElementById("dob").value);
  newUser["address"] = document.getElementById("address").value;
  newUser["country"] = document.getElementById("country").value;
  newUser["password"] = document.getElementById("password").value;
  newUser["pin"] = document.getElementById("pin").value;

  console.log(newUser);
  return newUser;
};

//Gender selector

const genderSelect = () => {
  const rdb1 = document.getElementById("male");
  const rdb2 = document.getElementById("female");

  if (rdb1.checked == true) {
    return rdb1.value;
  } else {
    return rdb2.value;
  }
};

const showMessage = (message) => {
  const messageDiv = document.getElementById("alert");

  messageDiv.innerHTML = message;

  messageDiv.style.display = "block";
  messageDiv.style.top = "0";
};

const hideMessage = () => {
  const messageDiv = document.getElementById("alert");
  messageDiv.style.display = "none";
  console.log("Hii");

  // location.reload();
};

const tr = document.getElementsByTagName("tr");

const formvalidation = () => {
  if (!document.getElementById("firstname").value) {
    document
      .getElementById("firstname")
      .previousElementSibling.classList.add("required-field");
    document.getElementById("firstname").style.border = "1px Solid red";
    document.getElementById("firstname").focus();
    document.getElementById("firstname").previousElementSibling.innerHTML =
      "firstname is required";
    document.getElementById("firstname").previousElementSibling.style.color =
      "red";
  }

  if (!document.getElementById("lastname").value) {
    document
      .getElementById("lastname")
      .previousElementSibling.classList.add("required-field");
    document.getElementById("lastname").style.border = "1px Solid red";
    document.getElementById("lastname").focus();
    document.getElementById("lastname").previousElementSibling.innerHTML =
      "Last name is required";
    document.getElementById("lastname").previousElementSibling.style.color =
      "red";
  }

  if (!document.getElementById("username").value) {
    document
      .getElementById("username")
      .previousElementSibling.classList.add("required-field");
    document.getElementById("username").style.border = "1px Solid red";
    document.getElementById("username").focus();
    document.getElementById("username").previousElementSibling.innerHTML =
      "Username is required";
    document.getElementById("username").previousElementSibling.style.color =
      "red";
  }

  if (!document.getElementById("quolification").value) {
    document
      .getElementById("quolification")
      .previousElementSibling.classList.add("required-field");
    document.getElementById("quolification").style.border = "1px Solid red";
    document.getElementById("quolification").focus();
    document.getElementById(
      "quolification"
    ).previousElementSibling.textContent = "Quolifcation is required";
    document.getElementById(
      "quolification"
    ).previousElementSibling.style.color = "red";
  }

  if (!document.getElementById("address").value) {
    document
      .getElementById("address")
      .previousElementSibling.classList.add("required-field");
    document.getElementById("address").style.border = "1px Solid red";
    document.getElementById("address").focus();
    document.getElementById("address").previousElementSibling.textContent =
      "Address is required";
    document.getElementById("address").previousElementSibling.style.color =
      "red";
  }

  if (document.getElementById("country").value == "null") {
    document
      .getElementById("country")
      .previousElementSibling.classList.add("required-field");
    document.getElementById("country").style.border = "1px Solid red";
    document.getElementById("country").focus();
    document.getElementById("country").previousElementSibling.innerHTML =
      "Please Select Your Country";
    document.getElementById("country").previousElementSibling.style.color =
      "red";
  }

  if (!document.getElementById("password").value) {
    document
      .getElementById("password")
      .previousElementSibling.classList.add("required-field");
    document.getElementById("password").style.border = "1px Solid red";
    document.getElementById("password").focus();
    document.getElementById("password").previousElementSibling.innerHTML =
      "Password is required";
    document.getElementById("password").previousElementSibling.style.color =
      "red";
  }

  if (!document.getElementById("dob").value) {
    document
      .getElementById("dob")
      .previousElementSibling.classList.add("required-field");
    document.getElementById("dob").style.border = "1px Solid red";
    document.getElementById("dob").focus();
    document.getElementById("dob").previousElementSibling.textContent =
      "DOB is required";
    document.getElementById("dob").previousElementSibling.style.color = "red";
  }

  if (!document.getElementById("email").value) {
    document
      .getElementById("email")
      .previousElementSibling.classList.add("required-field");
    document.getElementById("email").style.border = "1px Solid red";
    document.getElementById("email").focus();
    document.getElementById("email").previousElementSibling.innerHTML =
      "Email is required";
    document.getElementById("email").previousElementSibling.style.color = "red";
  }

  if (!document.getElementById("phone").value) {
    document
      .getElementById("phone")
      .previousElementSibling.classList.add("required-field");
    document.getElementById("phone").style.border = "1px Solid red";
    document.getElementById("phone").focus();
    document.getElementById("phone").previousElementSibling.innerHTML =
      "Number is required";
    document.getElementById("phone").previousElementSibling.style.color = "red";
  }

  if (document.getElementById("state").value == "null") {
    document
      .getElementById("state")
      .previousElementSibling.classList.add("required-field");
    document.getElementById("state").style.border = "1px Solid red";
    document.getElementById("state").focus();
    document.getElementById("state").previousElementSibling.innerHTML =
      "State is required";
    document.getElementById("state").previousElementSibling.style.color = "red";
  }

  if (!document.getElementById("city").value) {
    document
      .getElementById("city")
      .previousElementSibling.classList.add("required-field");
    document.getElementById("city").style.border = "1px Solid red";
    document.getElementById("city").focus();
    document.getElementById("city").previousElementSibling.innerHTML =
      "State is required";
    document.getElementById("city").previousElementSibling.style.color = "red";
  }

  if (document.getElementById("salutation").value == "null") {
    document
      .getElementById("salutation")
      .previousElementSibling.classList.add("required-field");
    document.getElementById("salutation").style.border = "1px Solid red";
    document.getElementById("salutation").focus();
    document.getElementById("salutation").previousElementSibling.innerHTML =
      "State is required";
    document.getElementById("salutation").previousElementSibling.style.color =
      "red";
  }
};

// Checking the phone number formate while typing

document.getElementById("phone").addEventListener("keyup", () => {
  if (
    document.getElementById("phone").value.length < 10 ||
    document.getElementById("phone").value.length > 10
  ) {
    document.getElementById("phone").previousElementSibling.textContent =
      "Invalid Number";
    document.getElementById("phone").previousElementSibling.style.color = "red";
  } else {
    document.getElementById("phone").previousElementSibling.textContent =
      "Mobile Number";
    document.getElementById("phone").previousElementSibling.style.color =
      "#2B3674";
    document.getElementById("phone").style.border = "1px solid #E6E8EB";
  }
});

// Checking the email formate while typing

document.getElementById("email").addEventListener("keyup", () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(document.getElementById("email").value)) {
    document.getElementById("email").previousElementSibling.textContent =
      "Invalid Email Formate";
    document.getElementById("email").previousElementSibling.style.color = "red";
  } else {
    document.getElementById("email").previousElementSibling.textContent =
      "Email address";
    document.getElementById("email").previousElementSibling.style.color =
      "#2B3674";
    document.getElementById("email").style.border = "1px solid #E6E8EB";
  }
});

// Form Validation while Typing

firstName.addEventListener("click", () => {
  firstName.addEventListener("input", () => {
    if (!document.getElementById("firstname").value) {
      document
        .getElementById("firstname")
        .previousElementSibling.classList.add("required-field");
      document.getElementById("firstname").previousElementSibling.innerHTML =
        "Firstname is required";
      document.getElementById("firstname").previousElementSibling.style.color =
        "red";
      document.getElementById("firstname").style.border = "1px Solid red";
      document.getElementById("firstname").focus();
    } else {
      document
        .getElementById("firstname")
        .previousElementSibling.classList.remove("required-field");
      document.getElementById("firstname").style.border = "1px solid #E6E8EB";
      document.getElementById("firstname").previousElementSibling.innerHTML =
        "First Name";
      document.getElementById("firstname").previousElementSibling.style.color =
        "#2B3674";
    }
  });
});

secondName.addEventListener("click", () => {
  secondName.addEventListener("input", () => {
    if (!document.getElementById("lastname").value) {
      document
        .getElementById("lastname")
        .previousElementSibling.classList.add("required-field");
      document.getElementById("lastname").style.border = "1px Solid red";
      document.getElementById("lastname").focus();
      document.getElementById("lastname").previousElementSibling.innerHTML =
        "Last name is required";
      document.getElementById("lastname").previousElementSibling.style.color =
        "red";
    } else {
      document
        .getElementById("lastname")
        .previousElementSibling.classList.remove("required-field");
      document.getElementById("lastname").style.border = "1px solid #E6E8EB";
      document.getElementById("lastname").previousElementSibling.innerHTML =
        "Last Name";
      document.getElementById("lastname").previousElementSibling.style.color =
        "#2B3674";
    }
  });
});

username.addEventListener("click", () => {
  username.addEventListener("input", () => {
    if (!document.getElementById("username").value) {
      document
        .getElementById("username")
        .previousElementSibling.classList.add("required-field");
      document.getElementById("username").style.border = "1px Solid red";
      document.getElementById("username").focus();
      document.getElementById("username").previousElementSibling.innerHTML =
        "Username is required";
      document.getElementById("username").previousElementSibling.style.color =
        "red";
    } else {
      document
        .getElementById("username")
        .previousElementSibling.classList.remove("required-field");
      document.getElementById("username").style.border = "1px solid #E6E8EB";
      document.getElementById("username").previousElementSibling.innerHTML =
        "Username";
      document.getElementById("username").previousElementSibling.style.color =
        "#2B3674";
    }
  });
});

password.addEventListener("click", () => {
  password.addEventListener("input", () => {
    if (!document.getElementById("password").value) {
      document
        .getElementById("password")
        .previousElementSibling.classList.add("required-field");
      document.getElementById("password").style.border = "1px Solid red";
      document.getElementById("password").focus();
      document.getElementById("password").previousElementSibling.innerHTML =
        "Password is required";
      document.getElementById("password").previousElementSibling.style.color =
        "red";
    } else {
      document
        .getElementById("password")
        .previousElementSibling.classList.remove("required-field");
      document.getElementById("password").style.border = "1px solid #E6E8EB";
      document.getElementById("password").previousElementSibling.innerHTML =
        "Password";
      document.getElementById("password").previousElementSibling.style.color =
        "#2B3674";
    }
  });
});

dob.addEventListener("click", () => {
  dob.addEventListener("input", () => {
    if (!document.getElementById("dob").value) {
      document
        .getElementById("dob")
        .previousElementSibling.classList.add("required-field");
      document.getElementById("dob").style.border = "1px Solid red";
      document.getElementById("dob").focus();
      document.getElementById("dob").previousElementSibling.innerHTML =
        "Password is required";
      document.getElementById("dob").previousElementSibling.style.color = "red";
    } else {
      document
        .getElementById("dob")
        .previousElementSibling.classList.remove("required-field");
      document.getElementById("dob").style.border = "1px solid #E6E8EB";
      document.getElementById("dob").previousElementSibling.innerHTML =
        "Date of Birth";
      document.getElementById("dob").previousElementSibling.style.color =
        "#2B3674";
    }
  });
});

quolification.addEventListener("click", () => {
  quolification.addEventListener("input", () => {
    if (!document.getElementById("quolification").value) {
      document
        .getElementById("quolification")
        .previousElementSibling.classList.add("required-field");
      document.getElementById("quolification").style.border = "1px Solid red";
      document.getElementById("quolification").focus();
      document.getElementById(
        "quolification"
      ).previousElementSibling.innerHTML = "Quolification is required";
      document.getElementById(
        "quolification"
      ).previousElementSibling.style.color = "red";
    } else {
      document
        .getElementById("quolification")
        .previousElementSibling.classList.remove("required-field");
      document.getElementById("quolification").style.border =
        "1px solid #E6E8EB";
      document.getElementById(
        "quolification"
      ).previousElementSibling.innerHTML = "Quolification";
      document.getElementById(
        "quolification"
      ).previousElementSibling.style.color = "#2B3674";
    }
  });
});

address.addEventListener("click", () => {
  address.addEventListener("input", () => {
    if (!document.getElementById("address").value) {
      document
        .getElementById("address")
        .previousElementSibling.classList.add("required-field");
      document.getElementById("address").style.border = "1px Solid red";
      document.getElementById("address").focus();
      document.getElementById("address").previousElementSibling.innerHTML =
        "Address is required";
      document.getElementById("address").previousElementSibling.style.color =
        "red";
    } else {
      document
        .getElementById("address")
        .previousElementSibling.classList.remove("required-field");
      document.getElementById("address").style.border = "1px solid #E6E8EB";
      document.getElementById("address").previousElementSibling.innerHTML =
        "Address";
      document.getElementById("address").previousElementSibling.style.color =
        "#2B3674";
    }
  });
});

city.addEventListener("click", () => {
  city.addEventListener("input", () => {
    if (!document.getElementById("city").value) {
      document
        .getElementById("city")
        .previousElementSibling.classList.add("required-field");
      document.getElementById("city").style.border = "1px Solid red";
      document.getElementById("city").focus();
      document.getElementById("city").previousElementSibling.innerHTML =
        "City is required";
      document.getElementById("city").previousElementSibling.style.color =
        "red";
    } else {
      document
        .getElementById("city")
        .previousElementSibling.classList.remove("required-field");
      document.getElementById("city").style.border = "1px solid #E6E8EB";
      document.getElementById("city").previousElementSibling.innerHTML = "City";
      document.getElementById("city").previousElementSibling.style.color =
        "#2B3674";
    }
  });
});

state.addEventListener("click", () => {
  state.addEventListener("input", () => {
    if (document.getElementById("state").value == "null") {
      document
        .getElementById("state")
        .previousElementSibling.classList.add("required-field");
      document.getElementById("state").style.border = "1px Solid red";
      document.getElementById("state").focus();
      document.getElementById("state").previousElementSibling.innerHTML =
        "State is required";
      document.getElementById("state").previousElementSibling.style.color =
        "red";
    } else {
      document
        .getElementById("state")
        .previousElementSibling.classList.remove("required-field");
      document.getElementById("state").style.border = "1px solid #E6E8EB";
      document.getElementById("state").previousElementSibling.innerHTML =
        "State";
      document.getElementById("state").previousElementSibling.style.color =
        "#2B3674";
    }
  });
});

salutation.addEventListener("click", () => {
  salutation.addEventListener("input", () => {
    if (document.getElementById("salutation").value == "null") {
      document
        .getElementById("salutation")
        .previousElementSibling.classList.add("required-field");
      document.getElementById("salutation").style.border = "1px Solid red";
      document.getElementById("salutation").focus();
      document.getElementById("salutation").previousElementSibling.innerHTML =
        "Salutation is required";
      document.getElementById("salutation").previousElementSibling.style.color =
        "red";
    } else {
      document
        .getElementById("salutation")
        .previousElementSibling.classList.remove("required-field");
      document.getElementById("salutation").style.border = "1px solid #E6E8EB";
      document.getElementById("salutation").previousElementSibling.innerHTML =
        "Salutation";
      document.getElementById("salutation").previousElementSibling.style.color =
        "#2B3674";
    }
  });
});

country.addEventListener("click", () => {
  country.addEventListener("input", () => {
    if (document.getElementById("country").value == "null") {
      document
        .getElementById("country")
        .previousElementSibling.classList.add("required-field");
      document.getElementById("country").style.border = "1px Solid red";
      document.getElementById("country").focus();
      document.getElementById("country").previousElementSibling.innerHTML =
        "Please Select Your Contry";
      document.getElementById("country").previousElementSibling.style.color =
        "red";
    } else {
      document
        .getElementById("country")
        .previousElementSibling.classList.remove("required-field");
      document.getElementById("country").style.border = "1px solid #E6E8EB";
      document.getElementById("country").previousElementSibling.innerHTML =
        "Country";
      document.getElementById("country").previousElementSibling.style.color =
        "#2B3674";
    }
  });
});

//Getting all countries from API

const fetchCountries = async () => {
  const res = await fetch(" https://restcountries.com/v3.1/all");

  const countries = await res.json();

  let countrySelect = document.getElementById("country");

  countries.forEach((element, index) => {
    if (index == 0) {
      countrySelect.innerHTML = ` <option value="null"> Select Your Country </option>`;
    } else {
      countrySelect.innerHTML += ` <option value="${element.name.common}">${element.name.common}</option>`;
    }
  });
};

fetchCountries();
