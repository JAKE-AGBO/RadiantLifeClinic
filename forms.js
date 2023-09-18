const navItems = document.querySelector("#nav__items");
const openNavBtn = document.querySelector("#open__nav-btn");
const closeNavBtn = document.querySelector("#close__nav-btn");

openNavBtn.addEventListener("click", () => {
  navItems.style.display = "flex";
  openNavBtn.style.display = "none";
  closeNavBtn.style.display = "inline-block"
})

const closeNav = () => {
  navItems.style.display = "none";
  openNavBtn.style.display = "inline-block";
  closeNavBtn.style.display = "none"
}
closeNavBtn.addEventListener("click", closeNav);


//Close nav menu when a menu item is clicked
if(window.innerWidth < 1024){
  document.querySelectorAll("#nav__items li a").forEach(navItem => {
      navItem.addEventListener("click", () => {
        closeNav();
      })
  })
}

//change navbar styles on scroll
window.addEventListener('scroll', () => {
  document.querySelector('nav').classList.toggle('window-scroll',window.scrollY > 0);
})



function getOne(selector) {
  return document.querySelector(selector);
}

function getAll(selector) {
  return document.querySelectorAll(selector);
}

const signupForm = getOne(".forms__signup");
const fullname = getOne("#fullname");
const username = getOne("#username");
const password = getOne("#password");
const confpassword = getOne("#conf-password");
const agree = getOne("#agree");

fullname.addEventListener("blur", () => {
  validateField(fullname, ".fullname-error", "Name field must be filled");
});

username.addEventListener("blur", () => {
  validateField(username, ".username-error", "Username field must be filled");
});

password.addEventListener("blur", () => {
  validateField(password, ".password-error", "Password field must be filled");
});

confpassword.addEventListener("blur", () => {
  const confpasswordValue = confpassword.value.trim();
  const passwordValue = password.value.trim();

  if (confpasswordValue === "") {
    confpassword.classList.add("error");
    getOne(".confpassword-error").textContent = "Confirm Password field must be filled";
  } else if (confpasswordValue !== passwordValue) {
    getOne(".pass-response").innerHTML = "Passwords do not match";
    confpassword.classList.add("error");
    getOne(".confpassword-error").textContent = "";
  } else {
    confpassword.classList.remove("error");
    getOne(".pass-response").innerHTML = "";
    getOne(".confpassword-error").textContent = "";
  }
});

let allUsers = JSON.parse(localStorage.getItem("retro__users")) || [];

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const isValid = validateAllFields();

  if (isValid) {
    const fullnameValue = fullname.value.trim();
    const usernameValue = username.value.toLowerCase().trim();
    const passwordValue = password.value;

    const userExists = allUsers.find((user) => user.username === usernameValue);

    if (userExists) {
      sweetAlert("Username Taken!", "We have a patient with this username", "error", "error");
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      fullname: fullnameValue,
      username: usernameValue,
      password: passwordValue,
    };

    allUsers = [newUser, ...allUsers];
    localStorage.setItem("retro__users", JSON.stringify(allUsers));
    sweetAlert(`Welcome ${fullnameValue}`, "Please, login to continue", "success");
    signupForm.reset();
    getOne(".form__swap").click();
  } else {
    sweetAlert("Form Validation Error", "Please fill out all the required fields correctly", "error", "error");
  }
});

const loginForm = getOne(".forms__login");
const logUsername = getOne("#log__username");
const logPassword = getOne("#log__password");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const foundUser = allUsers.find((user) => user.username === logUsername.value.toLowerCase() && user.password === logPassword.value);

  if (foundUser) {
    sweetAlert(`Welcome ${foundUser.fullname}`, "Please, wait while we redirect you...", "success");
    localStorage.setItem("retro__active", JSON.stringify(foundUser));
    window.location.replace("./appointment.html");
  } else {
    sweetAlert("Invalid Username/Password!", "We do not have a patient with this record", "error", "error");
  }
});

const formSwaps = getAll(".form__swap");
formSwaps.forEach((formSwap) => {
  formSwap.addEventListener("click", () => {
    const targetForm = formSwap.dataset.form;
    const parentForm = formSwap.closest("form");
    getOne(targetForm).classList.toggle("hidden");
    parentForm.classList.toggle("hidden");
  });
});

function sweetAlert(title, comment, icon, btnClass = "success", callback) {
  swal({
    title,
    text: comment,
    icon,
    buttons: {
      confirm: {
        className: `btn btn-${btnClass}`,
        closeModal: true,  // Close the modal after confirming
      },
    },
  }).then(() => {
    if (callback && typeof callback === "function") {
      callback();
    }
  });
}


function validateField(field, errorSelector, errorMessage) {
  const fieldValue = field.value.trim();

  if (fieldValue === "") {
    field.classList.add("error");
    getOne(errorSelector).textContent = errorMessage;
  } else {
    field.classList.remove("error");
    getOne(errorSelector).textContent = "";
  }
}

function validateAllFields() {
  const fieldsToValidate = [
    { field: fullname, errorSelector: ".fullname-error", errorMessage: "Name field must be filled" },
    { field: username, errorSelector: ".username-error", errorMessage: "Username field must be filled" },
    { field: password, errorSelector: ".password-error", errorMessage: "Password field must be filled" },
  ];

  for (const fieldInfo of fieldsToValidate) {
    validateField(fieldInfo.field, fieldInfo.errorSelector, fieldInfo.errorMessage);
  }

  const confpasswordValue = confpassword.value.trim();
  const passwordValue = password.value.trim();

  if (confpasswordValue === "") {
    confpassword.classList.add("error");
    getOne(".confpassword-error").textContent = "Confirm Password field must be filled";
  } else if (confpasswordValue !== passwordValue) {
    getOne(".pass-response").innerHTML = "Passwords do not match";
    confpassword.classList.add("error");
    getOne(".confpassword-error").textContent = "";
  } else {
    confpassword.classList.remove("error");
    getOne(".pass-response").innerHTML = "";
    getOne(".confpassword-error").textContent = "";
  }

  const agreeChecked = agree.checked;

  if (!agreeChecked) {
    agree.classList.add("error");  // Add this line to highlight the checkbox
    getOne(".checkbox-error").textContent = "Please agree to the terms and conditions";
  } else {
    agree.classList.remove("error");  // Remove the error class if checkbox is checked
    getOne(".checkbox-error").textContent = "";
  }

  return !document.querySelector(".error");
}

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const errors = validateAllFields();

  // Check if there are any errors
  if (errors.length === 0) {
    sweetAlert(`Welcome ${fullname.value}`, "Please, login to continue", "success");
    signupForm.reset();
    signupForm.querySelector(".form__swap").click();
  } else {
    // Log the errors to the console
    console.log("Validation errors:", errors);
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const passwordToggleButtons = document.querySelectorAll('.password__toggle');

  for (const passwordToggleButton of passwordToggleButtons) {
    passwordToggleButton.addEventListener('click', () => {
      const passwordInput = passwordToggleButton.previousElementSibling;
      const showPassword = passwordInput.getAttribute('type');

      if (showPassword === 'text') {
        passwordInput.setAttribute('type', 'password');
        passwordToggleButton.textContent = 'Show';
      } else {
        passwordInput.setAttribute('type', 'text');
        passwordToggleButton.textContent = 'Hide';
      }
    });
  }
});












