const stdForm = document.getElementById("stdForm");
const fnameControl = document.getElementById("fname");
const lnameControl = document.getElementById("lname");
const emailControl = document.getElementById("email");
const contactControl = document.getElementById("contact");
const info = document.getElementById("info");
const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");

let stdArray = [];

function uuid(mask = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx") {
  return `${mask}`.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const onStdEdit = (ele) => {
  let getId = ele.getAttribute("data-id");
  localStorage.setItem("getId", getId);
  console.log(getId); // we want object, we have a array ans one condition
  stdArray = JSON.parse(localStorage.getItem("stdArray"));
  updateBtn.classList.remove("d-none");
  submitBtn.classList.add("d-none");

  // let reqObj = stdArray.filter((ele) => ele.id === getId);
  let reqObj = stdArray.find((ele) => ele.id === getId);
  console.log(reqObj);
  fnameControl.value = reqObj.fname;
  lnameControl.value = reqObj.lname;
  emailControl.value = reqObj.email;
  contactControl.value = reqObj.contact;
};

const onStdDelete = (ele) => {
  let getDeleteId = ele.getAttribute("data-id");

  stdArray = stdArray.filter((ele) => {
    return ele.id != getDeleteId;
  });
  console.log(stdArray);
  localStorage.setItem("stdArray", JSON.stringify(stdArray));
  templating(stdArray);
  
};

const createTr = (obj) => {
  let tr = document.createElement("tr");
  tr.innerHTML = `
  <td>${stdArray.length}</td>
  <td>${obj.fname}</td>                 
  <td>${obj.lname}</td>
  <td>${obj.email}</td>
  <td>${obj.contact}</td>
  <td><button class="btn btn-success" data-id="${obj.id}" onclick = "onStdEdit(this)">Edit</button></td>
  <td><button class="btn btn-danger" data-id="${obj.id}" onclick = "onStdDelete(this)">Delete</button></td>
  `;
  info.append(tr);
};

const onstdSubmit = (e) => {
  e.preventDefault();
  let obj = {
    fname: fnameControl.value,
    lname: lnameControl.value,
    email: emailControl.value,
    contact: contactControl.value,
    id: uuid(),
  };
  stdArray.push(obj);
  localStorage.setItem("stdArray", JSON.stringify(stdArray));
  createTr(obj);
  e.target.reset();
};

const onUpdate = (e) => {
  let getId = localStorage.getItem("getId");
  console.log(getId);
  stdArray.forEach((ele) => {
    if (ele.id === getId) ele.fname = fnameControl.value;
    ele.lname = lnameControl.value;
    ele.email = email.value;
    ele.contact = contactControl.value;
  });
  console.log(stdArray);

  localStorage.setItem("stdArray", JSON.stringify(stdArray));
  templating(stdArray);
  stdForm.reset();
  updateBtn.classList.add("d-none");
  submitBtn.classList.remove("d-none");
};

function templating(stdArray) {
  let result = "";
  stdArray.forEach((ele, i) => {
    result += `<tr>
                <td>${i + 1}</td>
                <td>${ele.fname}</td>
                <td>${ele.lname}</td>
                <td>${ele.email}</td>
                <td>${ele.contact}</td>
                <td><button class="btn btn-success" data-id="${
                  ele.id
                }" onclick = "onStdEdit(this)">Edit</button></td>
                <td><button class="btn btn-danger" data-id="${
                  ele.id
                }" onclick = "onStdDelete(this)">Delete</button></td>
            </tr>
`;
    info.innerHTML = result;
  });
}

//on Page refresh  >> is there data in local storage
//then get data and create tr using templating function

if (localStorage.getItem("stdArray")) {
  stdArray = JSON.parse(localStorage.getItem("stdArray"));
  templating(stdArray);
}
stdForm.addEventListener("submit", onstdSubmit);
updateBtn.addEventListener("click", onUpdate);
