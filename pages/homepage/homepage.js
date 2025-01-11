// DOM
let wrapper = document.querySelector(".wrapper")
let body = document.body

// SWIPER
new Swiper(".testimonials__box", {
  navigation: {
    nextEl: ".testimonials__body-rightArrow",
    prevEl: ".testimonials__body-leftArrow",
  },
  grabCursor: true,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  mousewheel: {
    sensitivity: 1,
    eventsTarget: ".testimonials__item",
  },
  autoHeight: false,
  slidesPerView: 1,
  watchOverflow: true,
  spaceBetween: 30,
  slidesPerGroup: 1,
  centeredSlides: true,
  initialSlide: 0,
  freeMode: true,
  autoplay: {
    delay: 3000,
    stopOnLastSlide: true,
    disableOnInteraction: false,
  },
  loop: true,
  speed: 700,
})

// MODAL
let login = wrapper.querySelector(".header__login-text__login")
let register = wrapper.querySelector(".header__login-text__register")
let modalWrapper = wrapper.querySelector(".modals__wrapper")
let modals = wrapper.querySelectorAll(".modal")

login.addEventListener("click", (e) => {
  let path = e.currentTarget.getAttribute("data-path__modal")
  modals.forEach((modal) => {
    modal.classList.remove("modals__wrapper")
  })
  document.querySelector(`[data-modal = ${path}]`).classList.add("modal__open")
  modalWrapper.classList.add("modals__wrapper-open")
})

register.addEventListener("click", (e) => {
  let path = e.currentTarget.getAttribute("data-path__modal")
  modals.forEach((modal) => {
    modal.classList.remove("modals__wrapper")
  })
  document.querySelector(`[data-modal = ${path}]`).classList.add("modal__open")
  modalWrapper.classList.add("modals__wrapper-open")
})

modalWrapper.addEventListener("click", (e) => {
  if (e.target == modalWrapper) {
    modalWrapper.classList.remove("modals__wrapper-open")
    modals.forEach((modal) => {
      modal.classList.remove("modal__open")
    })
  }
})

// BURGER
let hamb = wrapper.querySelector(".header__hamb")
let mobile = wrapper.querySelector(".header__mobile")
let menu = wrapper.querySelector(".header__left-menu__list").cloneNode(1)

hamb.addEventListener("click", openMenuMobile)

function openMenuMobile(e) {
  e.preventDefault()
  mobile.classList.toggle("open")
  hamb.classList.toggle("active")
  body.classList.toggle("noscroll")
  renderMenuMobile()
}

function renderMenuMobile() {
  mobile.appendChild(menu)
}

// ANCHORS
let anchors = document.querySelectorAll('a[href*="#"]')
for (let anchor of anchors) {
  anchor.addEventListener("click", (e) => {
    e.preventDefault()
    const blockID = anchor.getAttribute("href")
    document.querySelector("" + blockID).scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  })
}

document.addEventListener('DOMContentLoaded', function() {
    const createMapBtn = document.getElementById('createMapBtn');
    const buildingNameModal = document.querySelector('[data-modal="building-name__modal"]');
    const buildingNameForm = document.getElementById('buildingNameForm');

    createMapBtn.addEventListener('click', function() {
        buildingNameModal.classList.add('modal--visible');
    });

    buildingNameForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const buildingName = document.getElementById('buildingNameInput').value;
        if (buildingName.trim()) {
            // Store building name in localStorage or pass it as URL parameter
            localStorage.setItem('buildingName', buildingName);
            window.location.href = 'index.html';
        }
    });

    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('modal--visible');
        }
    });
});
