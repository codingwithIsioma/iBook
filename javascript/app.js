// MAIN JS FILE FOR THE UI DESIGN OF THE PAGE
// NAVBAR scroll

window.addEventListener("scroll", function(){
  document.querySelector("nav").classList.toggle("window-scroll",window.scrollY > 0)
})

// NAV MENU

const menu = document.querySelector(".nav__menu")
const menuBtn = document.querySelector("#open-menu-btn")
const closeBtn = document.querySelector("#close-menu-btn")

// show
menuBtn.addEventListener("click", function(){
  menu.style.display = "flex"
  closeBtn.style.display = "inline-block"
  menuBtn.style.display = "none"
})

// close
closeBtn.addEventListener("click", function(){
  menu.style.display = "none"
  closeBtn.style.display = "none"
  menuBtn.style.display = "inline-block"
})


// const alertBTN = document.querySelector('#alert-button');
// const alertNotif = document.querySelector('#alert-notification');


// alertBTN.addEventListener('click', ()=> {
//         alertNotif.classList.remove('translate-y-full')
//         alertNotif.classList.add('mb-8');
//         alertNotif.classList.add('translate-y-0');
// })


