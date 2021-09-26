let slidePosition = 0;
const slides = document.querySelectorAll('.photo-grid-item');
const totalSlides = slides.length;

document.querySelector('#next-button').addEventListener("click", function() {
    nextSlide();
});

document.querySelector('#preview-button').addEventListener("click", function() {
    prevSlide();
});

function updateSlide() {
    for(let slide of slides) {
        slide.classList.remove('carousel-item-visible');
        slide.classList.add('carousel-item-hidden');
    }
    slides[slidePosition].classList.add('carousel-item-visible');
}

function nextSlide() {
    if(slidePosition == totalSlides - 1) {
        slidePosition = 0;
    } else {
        slidePosition++;
    }

updateSlide();
}

function prevSlide() {
    if(slidePosition == 0) {
        slidePosition = totalSlides - 1;
    } else {
        slidePosition--;
    }
updateSlide();
}