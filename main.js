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


//Testimonials section in home (swiper.js)
var swiper = new Swiper(".mySwiper", {
  slidesPerView:1,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },
});

//Show/hide faq answer

document.addEventListener("DOMContentLoaded", function() {
  const faqs = document.querySelectorAll(".faq");

  faqs.forEach(faq => {
      const answer = faq.querySelector(".question__answer p");
      const icon = faq.querySelector(".faq__icon i");

      faq.addEventListener("click", () => {
          if (answer.style.display === "block") {
              answer.style.display = "none";
              icon.className = "uil uil-plus";
          } else {
              answer.style.display = "block";
              icon.className = "uil uil-minus";
          }
      });
  });
});

