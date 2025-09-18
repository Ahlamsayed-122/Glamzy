let email = document.querySelector("#email")
let password = document.querySelector("#password")
let loginBtn = document.querySelector("#sign_in")

let getemail = localStorage.getItem("email")
let getpassword = localStorage.getItem("password")

loginBtn.addEventListener ("click", function(e){
    e.preventDefault()
    if(email.value === "" || password.value === ""){
        alert("please enter data")
    }else{
        if (getemail && getemail.trim() === email.value.trim() && getpassword && getpassword.trim()=== password.value){
            setTimeout(() => {
                window.location = "index.html"
    
            },1200)

        }else{
            alert(" data failed error")
        }
    }
})

