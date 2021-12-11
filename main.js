window.addEventListener('beforeunload', save);

// all variables

let accountsTableBody = document.querySelector("#accounts-tbody");
let idInput = document.querySelector('[placeholder="id"]');
let nameInput = document.querySelector('[placeholder="name"]');
let lastNameInput = document.querySelector('[placeholder="lastname"]');
let emailInput = document.querySelector('[placeholder="email"]');
let phoneInput = document.querySelector('[placeholder="phone"]');
let allLinks = document.querySelectorAll('.nav-link');
let views = document.querySelectorAll('.view');
let accView = document.querySelector('#accounts-view');
let addAccView = document.querySelector('#add-account-view');
let eId = document.querySelector('.eId');
let eName = document.querySelector('.eName');
let eLastName = document.querySelector('.eLastName');
let eEmail = document.querySelector('.eEmail');
let ePhone = document.querySelector('.ePhone');
let saveBtn = document.querySelector('#save');
let editBtn = document.querySelector('#edit');
let id;

// creating table

createAccountsTable();

function createAccountsTable() {
    let htmlAccounts = '';
    for (let i = 0; i < db.length; i++) {
        const account = db[i];
        htmlAccounts += `
            <tr>    
                <td>${account.id}</td>
                <td>${account.name}</td>
                <td>${account.lastname}</td>
                <td>${account.email}</td>
                <td>${account.phone}</td>
                <td><button data-id="${i}" class="btn btn-sm btn-warning form-control edit-btn">Edit</button></td>
                <td><button data-id="${i}" class="btn btn-sm btn-danger form-control delete-btn">Delete</button></td>
            </tr>
        `
    }
    accountsTableBody.innerHTML = htmlAccounts;
    let allDelBtns = document.querySelectorAll('.delete-btn');
    let allEditBtns = document.querySelectorAll('.edit-btn');

    for (let i = 0; i < allDelBtns.length; i++) {
        allDelBtns[i].addEventListener('click', delAccount);
        allEditBtns[i].addEventListener('click', editAccount);
    }
}

// Delete and edit record

function delAccount() {
    let id = this.getAttribute('data-id');
    db.splice(id, 1);
    createAccountsTable();
    showView('#accounts-view');
}

function editAccount() {
    id = this.getAttribute('data-id');
    let selectedAccount = db[id];
    const editAccVal = () => {
        eId.value = selectedAccount.id;
        eName.value = selectedAccount.name;
        eLastName.value = selectedAccount.lastname;
        eEmail.value = selectedAccount.email;
        ePhone.value = selectedAccount.phone;
    }
    editAccVal();
    showView('#edit-account-view');
}

editBtn.addEventListener('click', saveEditedAcc);

function saveEditedAcc() {
    const editedAcc = {
        id: eId.value,
        name: eName.value,
        lastname: eLastName.value,
        email: eEmail.value,
        phone: ePhone.value
    }
    db[id] = editedAcc;
    createAccountsTable();
    showView('#accounts-view');
}

// Show view

allLinks.forEach((item) => {
    item.addEventListener('click', showView)
});


function showView(e) {
    for (let i = 0; i < views.length; i++) {
        views[i].style.display = 'none';
    }
    if (e instanceof Event) {
        e.preventDefault();
        let id = `#${this.getAttribute("href")}`;
        document.querySelector(id).style.display = "block";
    } else {
        document.querySelector(e).style.display = 'block';
    }
}

// Save records

saveBtn.addEventListener('click', saveAccount);

function saveAccount() {
    const newAccount = {
        id: idInput.value,
        name: nameInput.value,
        lastname: lastNameInput.value,
        email: emailInput.value,
        phone: phoneInput.value
    }
    const delInput = () => {
        idInput.value = '';
        nameInput.value = '';
        lastNameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
    }
    db.push(newAccount);
    delInput();
    createAccountsTable();
    showView("#accounts-view");
}

// Save records on page, after refresh

function save() {
    localStorage.db = JSON.stringify(db);
}