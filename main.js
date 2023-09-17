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


//Count effect

const h3Elements = document.querySelectorAll('.achievement__card h3');
  const animationDuration = 5000; // 5 seconds
  let hasCounted = false;

  function animateNumbers(element, targetNumber, abbreviation) {
    const initialNumber = 0;
    const step = Math.ceil(targetNumber / (animationDuration / 20));
    let currentNumber = initialNumber;

    const interval = setInterval(() => {
      if (currentNumber >= targetNumber) {
        clearInterval(interval);
        currentNumber = targetNumber;
      }

      element.textContent = `${currentNumber.toLocaleString()}${abbreviation}`;
      currentNumber += step;
    }, 20);
  }

  function startCountingWhenIntersecting(entries, observer) {
    entries.forEach((entry) => {
      if (!hasCounted && entry.isIntersecting) {
        h3Elements.forEach((h3) => {
          const target = h3;
          const targetNumber = parseInt(target.getAttribute('data-count'), 10);
          if (!isNaN(targetNumber)) {
            animateNumbers(target, targetNumber, '+');
          }
        });
        hasCounted = true;
        observer.disconnect();
      }
    });
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5, // Trigger when at least 50% of the element is visible
  };

  const observer = new IntersectionObserver(startCountingWhenIntersecting, observerOptions);

  h3Elements.forEach((h3) => {
    observer.observe(h3);
  });



  //Sliding Image
  const slidingImage = document.getElementById("slidingImage");

  let isSliding = true; // Flag to track if the image is sliding

  // Function to toggle the sliding animation
  function toggleSliding() {
    if (isSliding) {
      slidingImage.style.animation = "none"; // Stop sliding
      stopButton.textContent = "Sliding Image"; // Update button text
    } else {
      slidingImage.style.animation = "slideUpDown 5s linear infinite alternate"; // Start sliding
      stopButton.textContent = "Stop Sliding Image"; // Update button text
    }
    isSliding = !isSliding; // Toggle the sliding state
  }
  
  // Example: Stop/Resume the animation when you click a button
  const stopButton = document.getElementById("stopButton");
  stopButton.addEventListener("click", toggleSliding);
  


  