import * as flsFunctions from "./modules/function.js";

flsFunctions.isWebp();

// AOS 

AOS.init();
new WOW().init();

// Добавление класса к меню

const scrollChange = 20;
const height = document.body;
const header = document.querySelector('.header__topbar');

const addClass = () => header.classList.add('show')
const removeClass = () => header.classList.remove('show')

let scrollpos = height.scrollTop

window.addEventListener('scroll', function() {
    scrollpos = height.scrollTop
    if (scrollpos > scrollChange) {
        addClass();
    } else {
        removeClass();
    }
})

// Паралакс

let bg = document.querySelectorAll('.mouse-parallax-bg');
for (let i = 0; i < bg.length; i++) {
    window.addEventListener('mousemove', function(e) {
        let x = e.clientX / window.innerWidth;
        let y = e.clientY / window.innerHeight;
        bg[i].style.transform = 'translate(-' + x * 40 + 'px, -' + y * 0 + 'px)';
    });
}

// Добавление класса к burger

document.querySelector('.burger-menu').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('active');
    document.body.classList.toggle('no-scroll');
    document.querySelector('.burger-menu').classList.toggle('close');
})

function closeHeaderMenu() {
    document.querySelector('.sidebar').classList.remove('active');
    document.body.classList.remove('no-scroll');
    document.querySelector('.burger-menu').classList.remove('close');
}

window.addEventListener('resize', closeHeaderMenu)


// accordion

const accordionHeaders = document.querySelectorAll(".accordion__header");


function toggleActiveAccordion(e, header) {
    const activeAccordion = document.querySelector(".accordion.active");
    const clickedAccordion = header.parentElement;
    const accordionBody = header.nextElementSibling;

    if (activeAccordion && activeAccordion != clickedAccordion) {
        activeAccordion.querySelector(".accordion__body").style.maxHeight = 0;
        activeAccordion.classList.remove("active");
    }

    clickedAccordion.classList.toggle("active");

    if (clickedAccordion.classList.contains("active")) {
        accordionBody.style.maxHeight = accordionBody.scrollHeight + "px";
    } else {
        accordionBody.style.maxHeight = 0;
    }
}

accordionHeaders.forEach(function(header) {
    header.addEventListener("click", function(event) {
        toggleActiveAccordion(event, header);
    });
});

function resizeActiveAccordionBody() {
    const activeAccordionBody = document.querySelector(
        ".accordion.active .accordion__body"
    );
    if (activeAccordionBody)
        activeAccordionBody.style.maxHeight =
        activeAccordionBody.scrollHeight + "px";
}

window.addEventListener("resize", function() {
    resizeActiveAccordionBody();
});