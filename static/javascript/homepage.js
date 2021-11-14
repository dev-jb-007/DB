var scrollpos = window.scrollY;
var header = document.getElementById("header");
var navcontent = document.getElementById("nav-content");
var navaction = document.getElementById("navAction");
var brandname = document.getElementById("brandname");
var toToggle = document.querySelectorAll(".toggleColour");
isAuth();
document.addEventListener("scroll", function () {

  scrollpos = window.scrollY;

  if (scrollpos > 10) {
    header.classList.add("bg-white");
    navaction.classList.remove("bg-white");
    navaction.classList.add("gradient");
    navaction.classList.remove("text-gray-800");
    navaction.classList.add("text-white");
   
    for (var i = 0; i < toToggle.length; i++) {
      toToggle[i].classList.add("text-gray-800");
      toToggle[i].classList.remove("text-white");
    }
    header.classList.add("shadow");
    navcontent.classList.remove("bg-gray-100");
    navcontent.classList.add("bg-white");
  } else {
    header.classList.remove("bg-white");
    navaction.classList.remove("gradient");
    navaction.classList.add("bg-white");
    navaction.classList.remove("text-white");
    navaction.classList.add("text-gray-800");
    //Use to switch toggleColour colours
    for (var i = 0; i < toToggle.length; i++) {
      toToggle[i].classList.add("text-white");
      toToggle[i].classList.remove("text-gray-800");
    }

    header.classList.remove("shadow");
    navcontent.classList.remove("bg-white");
    navcontent.classList.add("bg-gray-100");
  }
});

var navMenuDiv = document.getElementById("nav-content");
      var navMenu = document.getElementById("nav-toggle");

      document.onclick = check;
      function check(e) {
        var target = (e && e.target) || (event && event.srcElement);

        //Nav Menu
        if (!checkParent(target, navMenuDiv)) {
          // click NOT on the menu
          if (checkParent(target, navMenu)) {
            // click on the link
            if (navMenuDiv.classList.contains("hidden")) {
              navMenuDiv.classList.remove("hidden");
            } else {
              navMenuDiv.classList.add("hidden");
            }
          } else {
            // click both outside link and outside menu, hide menu
            navMenuDiv.classList.add("hidden");
          }
        }
      }
      function checkParent(t, elm) {
        while (t.parentNode) {
          if (t == elm) {
            return true;
          }
          t = t.parentNode;
        }
        return false;
      }


    async function isAuth(){
      let div=document.getElementById('loginCredentials');
      let buffer=await fetch('/',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
      })
      const ans=await buffer.json();
      console.log(ans);
      if(ans.status)
      {
        div.innerHTML=`
        <button
        id="navAction"
        class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
      onclick="window.location.href='/user/dashboard'">
        Dashboard
      
      `
        
      }
      else{
        div.innerHTML=`<button
        id="navAction"
        class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
      onclick="window.location.href='/login'">
        Log In / Sign Up
      </button>`
      }
    }