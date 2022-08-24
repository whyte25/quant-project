"use strict";
// SIDE BAR
const nav = document.querySelector("nav");
const btnOpen = document.querySelector(".menu");
const BtnClose = document.querySelector(".close-nav");

btnOpen.addEventListener("click", () => {
  nav.classList.add("show-nav");
});
BtnClose.addEventListener("click", () => {
  nav.classList.remove("show-nav");
});
document.addEventListener(
  "click",
  () => {
    if (nav.classList.contains("show-nav")) {
      nav.classList.remove("show-nav");
    }
  },
  true
);

// CLOSE NAV BAR AFTER CLICK
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener(
    "click",
    () => {
      setTimeout(() => {
        nav.classList.remove("show-nav");
      });
    },
    1000
  );
});

// / Slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

// FAQ
const faqContainers = document.querySelectorAll(".faq-content-wrapper");

faqContainers.forEach((faq) => {
  faq.addEventListener("click", (e) => {
    const clicked = e.target.closest(".faq-title-container");
    // console.log(faq);

    if (!clicked) return;

    faqContainers.forEach((item) => {
      if (item !== faq) {
        item.classList.remove("show-faq");
      }
    });

    faq.classList.toggle("show-faq");
  });
});

////STICKY BTN//////////////////////////
const main = document.querySelector(".main");
const toTop = document.querySelector(".to-top");

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) {
    toTop.classList.add("show-to-top");
  } else {
    toTop.classList.remove("show-to-top");
  }
};

const main0bserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0.1,
  rootMargin: "-100px",
});

main0bserver.observe(main);

// reveal sections
const allSections = document.querySelectorAll("section");

const revealSection = (entries, observer) => {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  }
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// FORM

let name = document.getElementById("name");
let mail = document.getElementById("email");
let success = document.getElementById("success");
let danger = document.getElementById("danger");
let loading = document.getElementById("loading");
function sendMail() {
  var params = {
    from_name: name.value,
    email_id: mail.value,
  };

  if (name.value === "" || mail.value === "") {
    danger.style.display = "block";

    setTimeout(() => {
      danger.style.display = "none";
    }, 2000);
  } else {
    loading.style.display = "block";
    emailjs
      .send("service_ropppqv", "template_wwmj8ua", params)
      .then(function () {
        loading.style.display = "none";
        name.value = "";
        mail.value = "";
        success.style.display = "block";
        setTimeout(() => {
          success.style.display = "none";
          window.location = "https://calendly.com/quantisland";
        }, 2000);
      });
  }
}
