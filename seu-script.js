let currentIndex = 0;
const slides = document.querySelectorAll('.promo-item');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(-${index * 100}%)`; // Move o slide atual para a esquerda
    });
}

document.querySelector('.prev').addEventListener('click', () => {
    currentIndex = Math.max(currentIndex - 1, 0); // Garante que o índice não seja menor que 0
    showSlide(currentIndex);
});

document.querySelector('.next').addEventListener('click', () => {
    currentIndex = Math.min(currentIndex + 1, slides.length - 1); // Garante que o índice não seja maior que o número total de slides
    showSlide(currentIndex);
});
