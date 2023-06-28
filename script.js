let signupForm = document.querySelector("#signup");
let email = document.querySelector("#email");
let phone = document.querySelector("#phone");
let noemail = document.querySelector("#noemail");
let pwd = document.querySelector("#pwd");
let confirm = document.querySelector("#pwd-confirm");

let fn = document.querySelector("#firstname");
let ln = document.querySelector("#lastname");
let pwds = document.querySelectorAll("input[type='password']");
let nomatch = document.querySelector("#nomatch");
let missingFields = [];

signupForm.addEventListener("submit", (e) => {
  if (
    !(
      pwd.value &&
      confirm.value &&
      fn.value &&
      ln.value &&
      phone.value &&
      email.value
    )
  ) {
    e.preventDefault();
    alert("Please fill all fields properly.");
    return;
  }

  let check = pwd.value == confirm.value;

  if (!check) {
    nomatch.hidden = false;
    e.preventDefault();
  }
});

function emailCheck(e) {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
    noemail.hidden = false;
    email.addEventListener("input", function (ev) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        noemail.hidden = true;
        email.removeEventListener("input", emailCheck);
      }
    });
  } else {
    noemail.hidden = true;
  }
}

function phoneCheck(e) {
  if (
    !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
      phone.value
    )
  ) {
    nophone.hidden = false;
    phone.addEventListener("input", function (ev) {
      if (
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
          email.value
        )
      ) {
        nophone.hidden = true;
        phone.removeEventListener("input", phoneCheck);
      }
    });
  } else {
    nophone.hidden = true;
  }
}

function nameCheck(e) {
  console.log(this.parentElement.children.length);
  if (
    !/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
      this.value
    )
  ) {
    if (this.parentElement.children.length < 4) {
      const invalidField = document.createElement("p");
      invalidField.innerHTML = "Please make sure to fill this field properly";
      invalidField.classList = "error";
      invalidField.id = "invalid-" + this.id;
      this.parentElement.appendChild(invalidField);
    }
    this.addEventListener("input", function (ev) {
      if (
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
          this.value
        )
      ) {
        this.parentElement.removeChild(invalidField);
        this.removeEventListener("input", nameCheck);
      }
    });
  }
}

let labels = document.querySelectorAll("label");
labels.forEach((e) => {
  let input = document.querySelector("#" + e.attributes.for.value);
  let x;
  switch (e.attributes.for.value) {
    case "email":
      x = emailCheck;
      break;
    case "firstname":
    case "lastname":
      x = nameCheck;
      break;
    case "phone":
      x = phoneCheck;
      break;
  }
  input.addEventListener("blur", x);
});
