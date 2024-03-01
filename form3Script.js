let usersArray = [];
function validation() {
  try {
    let name = document.querySelector("#nm");
    let email = document.querySelector("#em");
    let address = document.querySelector("#ad");
    let state = document.querySelector("#st");
    let male = document.querySelector("#m");
    let female = document.querySelector("#f");
    let image = document.querySelector("#im");
    let file = document.querySelector("#fl");
    let password = document.querySelector("#pass");
    let confirmPassword = document.querySelector("#confirmPass");
    let gender;
    if (male.checked) {
      gender = male.value;
    } else if (female.checked) {
      gender = female.value;
    } else {
      alert("Please select gender");
    }

    let imgUrl = URL.createObjectURL(image.files[0]);
    let fileNames = [];
    for (let i = 0; i < file.files.length; i++) {
      fileNames.push(file.files[i].name + "<br>");
    }
    let users = {
      Name: name.value,
      Email: email.value,
      Gender: gender,
      Address: address.value,
      State: state.value,
      imageObject: image.files,
      Url: imgUrl,
      FileNames: fileNames,
      Password: password.value,
    };

    if (usersArray.length != 0) {
      let count = 0;
      for (let i = 0; i < usersArray.length; i++) {
        let user = usersArray[i];
        if (user.Name === users.Name) {
          alert("User already Exist");
        } else {
          count++;
        }
      }
      if (count == usersArray.length) {
        usersArray.push(users);
        document.querySelector(
          "#success"
        ).innerHTML = `${users.Name} You Have Successfully Registered.`;
      }
    } else {
      usersArray.push(users);
      document.querySelector(
        "#success"
      ).innerHTML = `${users.Name} You Have Successfully Registered.`;
    }
    document.querySelector("#form").reset();
  } catch (error) {
    console.log(error);
  }

  return false;
}

btn = document.querySelector(".b");
btn.addEventListener("click", () => {
  if (usersArray.length != 0) {
    try {
      let html = `<table class='table table-success table-striped'>`;
      html += `<tr>`;
      html += `<th> Name`;
      html += `</th>`;
      html += `<th> Email`;
      html += `</th>`;
      html += `<th> Address`;
      html += `</th>`;
      html += `<th> State`;
      html += `</th>`;
      html += `<th> Gender`;
      html += `</th>`;
      html += `<th>  Profile`;
      html += `</th>`;
      html += `<th> Selected Files`;
      html += "</th>";
      html += `<th> Password`;
      html += `</th>`;
      html += `<th> Edit`;
      html += `</th>`;
      html += `</tr>`;
      for (let r = 0; r < usersArray.length; r++) {
        html += `<tr class=${usersArray[r].Name}>`;

        let user = usersArray[r];
        html += `<td>${user.Name}`;
        html += `</td>`;
        html += `<td>${user.Email}`;
        html += `</td>`;
        html += `<td>${user.Address}`;
        html += `</td>`;
        html += `<td>${user.State}`;
        html += `</td>`;
        html += `<td>${user.Gender}`;
        html += `</td>`;
        html += `<td><img src=${user.Url}>`;
        html += `</td>`;
        html += `<td>${user.FileNames}`;
        html += `</td>`;
        html += `<td>${user.Password}`;
        html += `</td>`;
        html += `<td> <button id=${usersArray[r].Name} class='delete-button' onclick='deleteRow(this.id)'>delete</button><br>
    <button id=${usersArray[r].Name} class='edit-button' onclick='editRow(this.id)'>Edit</button>`;
        html += `</td>`;
        html += `</tr>`;
      }
      html += "</table>";
      document.querySelector(".container-fluid").style.width = "fit-content";
      document.querySelector(".container-fluid").style.height = "fit-content";

      document.querySelector(".table").innerHTML = html;
    } catch (error) {
      console.log(error);
    }
  } else {
    document.querySelector(
      ".table"
    ).innerHTML = `<h5 class='record' style="text-align:left;color:yellow;">No record available</h5>`;
  }
});

function deleteRow(n) {
  let msg = confirm("Are you Sure??");
  if (msg == true) {
    let u = [];
    let row = document.querySelector(`.${n}`);
    for (let i = 0; i < row.cells.length; i++) {
      u.push(row.cells[i].innerHTML);
    }
    let user = usersArray.findIndex((o) => o.Name == u[0]);
    usersArray.splice(user, 1);
    row.style.display = "none";
  }
}

function editRow(id) {
  //Getting id of that row
  let u = [];
  let row = document.querySelector(`.${id}`);
  for (let i = 0; i < row.cells.length; i++) {
    u.push(row.cells[i].innerHTML);
  }
  let name = document.querySelector("#nm");
  let email = document.querySelector("#em");
  let address = document.querySelector("#ad");
  let password = document.querySelector("#pass");
  let male = document.querySelector("#m");
  let female = document.querySelector("#f");
  let state = document.querySelector("#st");
  let image = document.querySelector("#im");
  let file = document.querySelector("#fl");
  let confirmPass = document.querySelector("#confirmPass");
  // let userIdex = usersArray.findIndex(o => o.Name === u[0]);

  let user = usersArray.find((o) => o.Name === u[0]);
  name.value = user.Name;
  email.value = user.Email;
  address.value = user.Address;
  password.value = user.Password;
  if (user.Gender == "male") {
    male.checked = true;
  } else if (user.Gender == "female") {
    female.checked = true;
  }
  state.value = user.State;
  image.setAttribute("disabled", "disabled");
  document.querySelector("#hideIm").style.display = "none";
  image.style.display = "none";
  let html = `<img src='${user.Url}'><button id="updateProfile">Update Profile</button>`;
  document.querySelector(".profileImage").innerHTML = html;
  document.querySelector(".profileImage").style.display = "block";
  document.querySelector("#updateProfile").addEventListener("click", () => {
    document.querySelector(".profileImage").style.display = "none";
    image.removeAttribute("disabled");
    document.querySelector("#hideIm").style.display = "block";
    image.style.display = "block";
  });
  file.setAttribute("disabled", "disabled");
  document.querySelector("#hideFl").style.display = "none";
  file.style.display = "none";
  let html2 = `<p><h3>Your files</h3><br>${user.FileNames}</p><button id="updateFiles">Upload new files</button>`;
  document.querySelector(".mulFiles").style.display = "block";
  document.querySelector(".mulFiles").innerHTML = html2;
  document.querySelector("#updateFiles").addEventListener("click", () => {
    document.querySelector(".mulFiles").style.display = "none";
    file.removeAttribute("disabled");
    document.querySelector("#hideFl").style.display = "block";
    file.style.display = "block";
  });
  confirmPass.value = user.Password;

  document
    .querySelector("#form")
    .setAttribute("onsubmit", "return editUser(this.id)");
  document.querySelector("#form").setAttribute("id", `${id}`);
}

function editUser(userId) {
  try {
    let name = document.querySelector("#nm");
    let email = document.querySelector("#em");
    let address = document.querySelector("#ad");
    let state = document.querySelector("#st");
    let male = document.querySelector("#m");
    let female = document.querySelector("#f");
    let image = document.querySelector("#im");
    let file = document.querySelector("#fl");
    let password = document.querySelector("#pass");

    let gender;
    if (male.checked) {
      gender = male.value;
    } else if (female.checked) {
      gender = female.value;
    } else {
      alert("Please select gender");
    }
    let user = usersArray.find((obj) => obj.Name == name.value);
    let fileNames = [];
    let imgUrl;

    if (file.files.length < 1) {
      user.FileNames.forEach((v) => {
        fileNames.push(v);
      });
    } else {
      for (let i = 0; i < file.files.length; i++) {
        fileNames.push(file.files[i].name + "<br>");
      }
    }
    if (image.files.length < 1) {
      imgUrl = user.Url;
    } else {
      imgUrl = URL.createObjectURL(image.files[0]);
    }
    let users = {
      Name: name.value,
      Email: email.value,
      Gender: gender,
      Address: address.value,
      State: state.value,
      Url: imgUrl,
      FileNames: fileNames,
      Password: password.value,
    };

    let newuser = usersArray.map((obj) =>
      obj.Name === name.value ? { ...users } : obj
    );

    let row = document.querySelector(`.${userId}`);

    row.cells[0].innerHTML = name.value;
    row.cells[1].innerHTML = email.value;
    row.cells[2].innerHTML = gender;
    row.cells[3].innerHTML = address.value;
    row.cells[4].innerHTML = state.value;
    row.cells[5].innerHTML = `<img src='${imgUrl}'>`;
    row.cells[6].innerHTML = fileNames;
    row.cells[7].innerHTML = password.value;
    document.querySelector(".profileImage").style.display = "none";
    image.removeAttribute("disabled");
    document.querySelector("#hideIm").style.display = "block";
    image.style.display = "block";
    document.querySelector(".mulFiles").style.display = "none";
    file.removeAttribute("disabled");
    document.querySelector("#hideFl").style.display = "block";
    file.style.display = "block";
    document
      .querySelector(`#${userId}`)
      .setAttribute("onsubmit", "return validation()");
    document.querySelector(`#${userId}`).reset();
    document.querySelector(`#${userId}`).setAttribute("id", "form");
    usersArray = [];
    newuser.forEach((obj) => {
      usersArray.push(obj);
    });
  } catch (error) {
    console.log(error);
  }
  return false;
}
let city = document.querySelector("#ad");
let sta = document.querySelector("#st");
let rajasthanDistricts = [
  "Ajmer",
  "Alwar",
  "Banswara",
  "Baran",
  "Barmer",
  "Bharatpur",
  "Bhilwara",
  "Bikaner",
  "Bundi",
  "Chittorgarh",
  "Churu",
  "Dausa",
  "Dholpur",
  "Dungarpur",
  "Hanumangarh",
  "Jaipur",
  "Jaisalmer",
  "Jalore",
  "Jhalawar",
  "Jhunjhunu",
  "Jodhpur",
  "Karauli",
  "Kota",
  "Nagaur",
  "Pali",
  "Pratapgarh",
  "Rajsamand",
  "Sawai Madhopur",
  "Sikar",
  "Sirohi",
  "Sri Ganganagar",
  "Tonk",
  "Udaipur",
];
const uttarakhandDistricts = [
  "Almora",
  "Bageshwar",
  "Chamoli",
  "Champawat",
  "Dehradun",
  "Haridwar",
  "Nainital",
  "Pauri Garhwal",
  "Pithoragarh",
  "Rudraprayag",
  "Tehri Garhwal",
  "Udham Singh Nagar",
  "Uttarkashi",
];
const andhraPradeshDistricts = [
  "Anantapur",
  "Chittoor",
  "East Godavari",
  "Guntur",
  "Kadapa",
  "Krishna",
  "Kurnool",
  "Nellore",
  "Prakasam",
  "Srikakulam",
  "Visakhapatnam",
  "Vizianagaram",
  "West Godavari",
];
sta.addEventListener("click", () => {
  console.log(sta.value);
  let html = `<option>Choose City</option>`;
  if (sta.value == "Andhra Pradesh") {
    for (let i = 0; i < andhraPradeshDistricts.length; i++) {
      html =
        html +
        `<option value='${andhraPradeshDistricts[i]}'>${andhraPradeshDistricts[i]}</option><br>`;
    }
    city.innerHTML = html;
  } else if (sta.value == "Uttarakhand") {
    for (let i = 0; i < uttarakhandDistricts.length; i++) {
      html =
        html +
        `<option value='${uttarakhandDistricts[i]}'>${uttarakhandDistricts[i]}</option><br>`;
    }
    city.innerHTML = html;
  } else if (sta.value == "Rajasthan") {
    for (let i = 0; i < rajasthanDistricts.length; i++) {
      html =
        html +
        `<option value='${rajasthanDistricts[i]}'>${rajasthanDistricts[i]}</option><br>`;
    }
    city.innerHTML = html;
  } else {
    city.innerHTML = html;
  }
});
