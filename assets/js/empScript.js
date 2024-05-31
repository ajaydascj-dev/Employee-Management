//Alert messge

let employeeCount;
let currentPage = 1;

window.addEventListener("load", () => {
  fetchData("http://localhost:3000/employees/employee");

  const alert = document.getElementsByClassName("alert")[0];
  if (alert) {
    alert.classList.add("active");
    setTimeout(() => {
      alert.classList.remove("active");
    }, 5000);
  }
});

var action_btns;

const btnsPop = (controls) => {
  if (controls.classList.contains("pops")) {
    controls.classList.remove("pops");
  } else {
    controls.classList.add("pops");
  }

  setTimeout(() => {
    action_btns = controls;
  }, 500);

  if (action_btns) {
    console.log("true");
    action_btns.classList.remove("pops");
  }
};

//Closing Forms When click on overlay

document.getElementById("overlay").addEventListener("click", () => {
  closeAddform();
  closeAlert();
  action_btns.classList.remove("pops");
});

// Getting data from API

let allEmployee;
let selectUserPerPag = document.getElementById("emplPerPage");
let dataPerpage = parseInt(selectUserPerPag.value) || 10;

let start = 0;
let end;

// Desiding how many employees showing per page

selectUserPerPag.addEventListener("change", () => {
  dataPerpage = parseInt(selectUserPerPag.value);
  currentPage = 1;
  fetchData(`http://localhost:3000/employees/employee?limit=${dataPerpage}`);
});

//Adding function to prvious btn

const prevBtn = () => {
  let page = currentPage == 1 ? currentPage : currentPage - 1;
  fetchData(
    `http://localhost:3000/employees/employee?limit=${dataPerpage}&page=${page}`
  );
  currentPage == 1 ? currentPage : currentPage--;
};

//Adding function to nxt btn
const nextBtn = () => {
  let page =
    currentPage == Math.ceil(employeeCount / dataPerpage)
      ? currentPage
      : currentPage + 1;
  fetchData(
    `http://localhost:3000/employees/employee?limit=${dataPerpage}&page=${page}`
  );

  currentPage == Math.ceil(employeeCount / dataPerpage)
    ? currentPage
    : currentPage++;
};

//Double Next

const doubleNext = () => {
  fetchData(
    `http://localhost:3000/employees/employee?limit=${dataPerpage}&page=${Math.ceil(
      employeeCount / dataPerpage
    )}`
  );

  currentPage = Math.ceil(employeeCount / dataPerpage);
};

//Double Prev

const doublePrev = () => {
  fetchData(
    `http://localhost:3000/employees/employee?limit=${dataPerpage}&page=${1}`
  );

  currentPage = 1;
};

//Displaying Fetched Data in table formate

const displayData = (employee) => {
  var tmpData = "";
  let count = dataPerpage * (currentPage - 1) + 1;
  for (let index = 0; index < employee.length; index++) {
    let formateIndex = count <= 9 ? `#0${count}` : `#${count}`;
    tmpData += `<tr>`;
    tmpData += `<th scope=row>  ${formateIndex} </th>`;
    tmpData += `<td><img src="/uploads/${employee[index].avatar}" alt="profile-pic" class="rounded-circle mr-2" height=30 width=30> ${employee[index].salutation} . ${employee[index].firstname} ${employee[index].lastname}</td>`;
    tmpData += `<td>  ${employee[index].email} </td>`;
    tmpData += `<td>  ${employee[index].phone}</td>`;
    tmpData += `<td> ${employee[index].gender} </td>`;
    tmpData += `<td> ${employee[index].dob} </td>`;
    tmpData += `<td> ${employee[index].country} </td>`;
    tmpData += `<td class="actions"><button type="button"  onclick="btnsPop(this.nextElementSibling)" ondblclick="" class="btn-controls" id="action-popup"><i class="fa-solid fa-ellipsis"></i></button> 
           <div class="controls">
            <a href="view/?id=${employee[index]._id}" target = "_blank"><button type="button" class="btn-controls"  id="view" ><i class="fa-regular fa-eye"></i> View Details</button></a>
            <button type="button" class="btn-controls"  onclick="getId('${employee[index]._id}'); getUser() " ><i class="fa-solid fa-pen"></i>Edit</button>
            <button type="button" class="btn-controls" onclick="getId('${employee[index]._id}') ; openAlert() "><i class="fa-regular fa-trash-can"></i>Delete</button>
           </div> 
        </td>`;
    tmpData += `</tr>`;

    count++;
  }

  document.getElementById("employeesData").innerHTML = tmpData;
};

//For displaying 10 employees / page

let prevIndex;

const pagination = () => {
  let nav_btns = document.getElementsByClassName("paginBtns");

  for (let index = 0; index < nav_btns.length; index++) {
    nav_btns[index].addEventListener("click", () => {
      // document.querySelector(".active")?.classList.remove("active");
      fetchData(
        `http://localhost:3000/employees/employee?limit=${dataPerpage}&page=${
          index + 1
        }`
      );
      currentPage = index + 1;
    });
  }
};

//Adding User to API

const addUser = () => {
  console.log(getFormData());
  formvalidation();
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/employees/addUser");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(getFormData()));

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 201) {
      currentPage = 1 ;
      var result = JSON.parse(xhr.responseText);
      console.log(result.data);

      if (profile_pic) {
        addAvatar(result.data);
      }

      fetchData(
        `http://localhost:3000/employees/employee?limit=${dataPerpage}`
      );
      closeAddform();
      showMessage("User Added Succesfully");
      setTimeout("hideMessage()", 3000);
      closeAddform();
    }
  };
};

document.getElementById("addUser").addEventListener("click", (e) => {
  e.preventDefault();
  addUser();
});
//  Getting User ID ;

let userId = "";

const getId = (id) => {
  userId = id;
};

//Searching

const serchData = () => {
  const searchValue = document.getElementById("search").value.toLowerCase();
  console.log(searchValue);
  var xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    `http://localhost:3000/employees/dashboard?limit=${dataPerpage}`
  );
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({ payload: searchValue }));

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var result = JSON.parse(xhr.responseText);
      console.log(result.data);
      displayData(result.data);
    }
  };
};

const makeBtn = (count) => {
  let btn_container = document.getElementById("nav_btns");
  btn_container.innerHTML = " ";
  let newCount = parseInt(count);
  let numOfbtns = Math.ceil(newCount / dataPerpage);

  for (let index = 1; index <= numOfbtns; index++) {
    btn_container.innerHTML += `<button type="button" class="paginBtns">${index}</button>`;
  }
};
