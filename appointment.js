document.addEventListener('DOMContentLoaded', () => {
  const rangeInput = document.querySelector('.range');
  const form = document.querySelector('form');
  const formInputs = form.querySelectorAll('input, select, textarea');
  const totalInputs = formInputs.length;

  form.addEventListener('input', () => {
    let filledInputs = 0;

    formInputs.forEach(input => {
      if (input.value && input.value !== 'Department One') {
        filledInputs++;
      }
    });

    const progress = (filledInputs / totalInputs) * 100;

    // Update the range input value
    rangeInput.value = progress;
  });
});

const navItems = document.querySelector("#nav__items");
const openNavBtn = document.querySelector("#open__nav-btn");
const closeNavBtn = document.querySelector("#close__nav-btn");

openNavBtn.addEventListener("click", () => {
  navItems.style.display = "flex";
  openNavBtn.style.display = "none";
  closeNavBtn.style.display = "inline-block"
})

const closeNav = () => {
  navItems.style.display = "none";
  openNavBtn.style.display = "inline-block";
  closeNavBtn.style.display = "none"
}
closeNavBtn.addEventListener("click", closeNav);


//Close nav menu when a menu item is clicked
if(window.innerWidth < 1024){
  document.querySelectorAll("#nav__items li a").forEach(navItem => {
      navItem.addEventListener("click", () => {
        closeNav();
      })
  })
}

//change navbar styles on scroll
window.addEventListener('scroll', () => {
  document.querySelector('nav').classList.toggle('window-scroll',window.scrollY > 0);
})

