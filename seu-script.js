const promoContainer = document.querySelector('.promo-container');
const promoItems = document.querySelectorAll('.promo-item');

// Clonar os primeiros e últimos itens para criar um efeito de looping
promoContainer.insertBefore(promoItems[promoItems.length - 1].cloneNode(true), promoItems[0]);
promoContainer.appendChild(promoItems[1].cloneNode(true));

let counter = 1;
const itemWidth = promoItems[0].offsetWidth;

function nextSlide() {
    counter++;
    promoContainer.style.transform = `translateX(-${counter * itemWidth}px)`;
    promoContainer.style.transition = 'transform 0.5s ease';
}

function prevSlide() {
    counter--;
    promoContainer.style.transform = `translateX(-${counter * itemWidth}px)`;
    promoContainer.style.transition = 'transform 0.5s ease';
}

promoContainer.addEventListener('transitionend', () => {
    if (counter === promoItems.length - 1) {
        promoContainer.style.transition = 'none';
        counter = 1;
        promoContainer.style.transform = `translateX(-${counter * itemWidth}px)`;
    }
    if (counter === 0) {
        promoContainer.style.transition = 'none';
        counter = promoItems.length - 2;
        promoContainer.style.transform = `translateX(-${counter * itemWidth}px)`;
    }
});
