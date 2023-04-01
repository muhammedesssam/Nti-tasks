const myForm = document.querySelector("#myForm");
const userWrap = document.querySelector("#userWrap");
const singleData = document.querySelector("#singleData");

const heads = ["name", "age", "email"];

const readFromStorage = (key = `tasks`) =>
  JSON.parse(localStorage.getItem(key)) || [];
const writeToStorage = (data, key = `tasks`) =>
  localStorage.setItem(key, JSON.stringify(data));

const userObjCreator = (myForm) => {
  const user = { id: Date.now(), status: "inactive" };
  heads.forEach((h) => (user[h] = myForm.elements[h].value));
  return user;
};

const addUser = (user) => {
  const allUsers = readFromStorage("users");
  allUsers.push(user);
  writeToStorage(allUsers, "users");
};

function createMyOwnElement(ele, parent, txt = null, classes = null) {
  const myElement = document.createElement(ele);
  parent.appendChild(myElement);
  if (txt) myElement.textContent = txt;
  if (classes) myElement.classList = classes;
  return myElement;
}

const editMyElement = (allUsers, i) => {
  const tr = userWrap.children[i];
  const name = tr.children[1].textContent;
  const email = tr.children[2].textContent;
  const age = tr.children[3].textContent;

  tr.innerHTML = "";

  const idField = createMyOwnElement("td", tr);
  idField.textContent = allUsers[i].id;

  const nameInput = createMyOwnElement(
    "input",
    createMyOwnElement("td", tr),
    "name",
    "mb-3 form form-control"
  );
  nameInput.value = name;

  const emailInput = createMyOwnElement(
    "input",
    createMyOwnElement("td", tr),
    "name",
    "mb-3 form form-control"
  );
  emailInput.value = email;

  const ageInput = createMyOwnElement(
    "input",
    createMyOwnElement("td", tr),
    "name",
    "mb-3 form form-control"
  );
  ageInput.value = age;

  const saveBtn = createMyOwnElement(
    "button",
    createMyOwnElement("td", tr),
    "Save",
    "mx-2 btn btn-success"
  );

  const cancelBtn = createMyOwnElement(
    "button",
    createMyOwnElement("td", tr),
    "Cancel",
    "mx-2 btn btn-secondary"
  );

  saveBtn.addEventListener("click", () => {
    allUsers[i].name = nameInput.value;
    allUsers[i].email = emailInput.value;
    allUsers[i].age = ageInput.value;
    writeToStorage(allUsers, "users");
    drawData();
  });

  cancelBtn.addEventListener("click", () => {
    drawData();
  });
};

if (myForm) {
  myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const user = userObjCreator(myForm);
    addUser(user);
    window.location = "index.html";
  });
}
const deleteMyElement = (allUsers, i) => {
  allUsers.splice(i, 1);
  writeToStorage(allUsers, "users");
  drawData();
};
const drawData = () => {
  userWrap.innerHTML = "";
  const allUsers = readFromStorage("users");
  allUsers.forEach((user, i) => {
    const tr = createMyOwnElement("tr", userWrap);
    createMyOwnElement("td", tr, user.id);
    createMyOwnElement("td", tr, user.name);
    createMyOwnElement("td", tr, user.email);
    createMyOwnElement("td", tr, user.age);
    // createMyOwnElement("td", tr, user.status);
    const td = createMyOwnElement("td", tr);

    const statusBtn = createMyOwnElement(
      "button",
      td,
      user.status,
      user.status === "active"
        ? "mx-2 btn btn-success"
        : "mx-2 mr-2 btn btn-secondary"
    );

    statusBtn.addEventListener("click", () => {
      user.status = user.status === "active" ? "inactive" : "active";
      statusBtn.textContent = user.status;
      statusBtn.classList.toggle("btn-success");
      statusBtn.classList.toggle("btn-secondary");
      writeToStorage(allUsers, "users");
    });

    const delBtn = createMyOwnElement(
      "button",
      td,
      "Delete",
      "mx-2 btn btn-danger"
    );
    delBtn.addEventListener("click", (e) => deleteMyElement(allUsers, i));
    const showBtn = createMyOwnElement(
      "button",
      td,
      "Show",
      "mx-2 btn btn-primary"
    );
    showBtn.addEventListener("click", () => {
      localStorage.setItem("index", i);
      window.location = "single.html";
    });

    const editBtn = createMyOwnElement(
      "button",
      td,
      "Edit",
      "mx-2 btn btn-warning"
    );
    editBtn.addEventListener("click", (e) => {
      editMyElement(allUsers, i);
    });
  });
};

if (userWrap) {
  drawData();
}

if (singleData) {
  const index = localStorage.getItem("index");
  const allUsers = readFromStorage("users");
  createMyOwnElement("p", singleData, allUsers[index].name);
}
