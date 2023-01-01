
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


// MODAL OVERLAY
// const modalOverlay = document.querySelector(".modal-overlay")
const articles = document.querySelectorAll("[data-target]")
const closeBtns = document.querySelectorAll(".close-btn")

articles.forEach(function(item){
  item.addEventListener("click", function() {
    document.querySelector(item.dataset.target).classList.add("open-modal")
  })
})

closeBtns.forEach(function(item){
  item.addEventListener("click", function() {
    document.querySelector(item.dataset.target).classList.remove("open-modal")
  })
})