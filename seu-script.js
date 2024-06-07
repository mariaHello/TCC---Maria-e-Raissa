document.addEventListener("DOMContentLoaded", function() {
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const slides = document.querySelector('.promo-container');
    let currentIndex = 0;
    
    function showSlide(index) {
        slides.style.transform = `translateX(-${index * 100}%)`; // Move o slide atual para a esquerda
    }

    prevButton.addEventListener('click', () => {
        currentIndex = Math.max(currentIndex - 1, 0); // Garante que o índice não seja menor que 0
        showSlide(currentIndex);
    });

    nextButton.addEventListener('click', () => {
        currentIndex = Math.min(currentIndex + 1, slides.children.length - 1); // Garante que o índice não seja maior que o número total de slides
        showSlide(currentIndex);
    });
});
