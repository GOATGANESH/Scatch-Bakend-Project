function registerUser() {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  fetch("/api/v1/users/signupuser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        window.location.href = "/shop";
      } else console.log(data);
    });
}

const loginUser = async function(e){
  const email = document.getElementById("login-email").value.trim()
  const password = document.getElementById("login-password").value.trim();

  if(!email || !password){
    return;
  }
  const response = await fetch("api/v1/users/loginuser",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({email,password})
  })
  const data = await response.json();
  if(data.success) window.location.href = "api/v1/owners/admin"
  else console.log(data)
}

function registerProduct(){
  
}

document.body.addEventListener("submit", function (e) {
  e.preventDefault();
  if (e.target.matches("#signup-form")) {
    registerUser();
  }
  else if(e.target.matches("#login-form")){
    loginUser(e);
  }
  else if(e.target.matches("#add-product-form")){
      registerProduct();
  }
  
});

addEventListener("load",()=>{
  
})