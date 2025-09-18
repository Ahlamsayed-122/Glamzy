let userinfo = document.querySelector("#user_info");
let userdata = document.querySelector("#user");
let links = document.querySelector("#links");
let logoutbtn = document.querySelector("#logout");

if (localStorage.getItem("email")) {
    links.remove(); 
    userinfo.style.display = "flex"; 
    userdata.innerHTML = localStorage.getItem("firstname"); 
}

logoutbtn.addEventListener("click", function () {
    localStorage.clear();
    setTimeout(() => {
        window.location = "login.html";
    }, 1500);
});
