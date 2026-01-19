function clearInput(){
const inputs = Array.from( document.getElementsByTagName("input"))
inputs.forEach(input=>{
  if(!input.classList.contains("btn")) input.value=""
})

}
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

      if (data.success) {
        alert("account created ! you can login !");
      } else alert(data.message);
      clearInput();
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
  if(data.success){
    if(email == "ganesh@gmail.com")window.location.href = "api/v1/owners/admin"
    else window.location.href = "/shop"
  }
  else{
    alert(data.message)
  }

}

const logoutAdmin = function(){
  fetch("logout")
    .then(res=>res.json())
    .then(data=>{
      if(data.success) window.location.href="/"
      else alert(data.message)
    })
}
const logoutUser = function(){
  fetch("api/v1/users/logout")
    .then(res=>res.json())
    .then(data=>{
      if(data.success) window.location.href="/"
      else alert(data.message)
    })
}
async function registerProduct(formData){
 const res = await fetch("product/register",{
  method:"POST",
  body:formData
 })
 const data = await res.json();
 if(data.success){
 alert("Product added !");
 clearInput();
 }
 else alert(data.message);
}

document.body.addEventListener("submit",async function (e) {
  e.preventDefault();
  if (e.target.matches("#signup-form")) {
    registerUser();
  }
  else if(e.target.matches("#login-form")){
    loginUser(e);
  }
  else if(e.target.matches("#add-product-form")){
    const formData = new FormData(e.target);
    await registerProduct(formData);
  }
  
});

function getTargetElement(e,id){
  return e.target.matches(id) || null
}


function addProductToCart(e){
  const element = e.target.closest(".card");

  fetch(`api/v1/users/addtocart/${element.id}`)
  .then(res=>res.json())
  .then(data=>{
     alert(data.message)
  })
}

document.body.addEventListener("click",(e)=>{
  if(getTargetElement(e,"#logout-admin")){
    logoutAdmin();
  }
  else if(getTargetElement(e,"#logout-user")){
    logoutUser();
  }
  
  else if(getTargetElement(e,"#add-to-cart")){
    addProductToCart(e);
  }
  
})


