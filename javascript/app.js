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

// Get the theme switcher buttons
const themeSwitcherButtons = document.querySelectorAll('#theme-button');

// Add event listeners to the theme switcher buttons
themeSwitcherButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Toggle the class on the body element
    if (document.body.classList.contains('theme-1')) {
      document.body.classList.remove('theme-1');
      document.body.classList.add('theme-2');
    } else if (document.body.classList.contains('theme-2')){
      document.body.classList.remove('theme-2');
      document.body.classList.add('theme-1');
    }
    console.log('Hey');
    
    // Save the user's preference
    localStorage.setItem('theme', document.body.classList.contains('theme-1') ? 'theme-1' : 'theme-2');
  });
});

// Check if the user has a saved preference
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  // Apply the saved theme
  document.body.classList.add(savedTheme);
} else {
  // Apply the default theme
  document.body.classList.add('theme-1');
}


