let firstname = document.querySelector("#firstname")
let lastname = document.querySelector("#lastname")
let email = document.querySelector("#email")
let password = document.querySelector("#password")
let registerBtn = document.querySelector("#sign_up")

registerBtn.addEventListener("click", function(e) {
    e.preventDefault()
    if (firstname.value === "" || password.value === "" ||lastname.value === "" || email.value === "") {
        alert("Please fill data");
    }else{
        localStorage.setItem("firstname",firstname.value)
        localStorage.setItem("password",password.value)
        localStorage.setItem("email",email.value)

        setTimeout(() => {
            window.location = "login.html"

        },1500)
    }
});
