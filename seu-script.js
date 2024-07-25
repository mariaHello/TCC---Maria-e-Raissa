document.addEventListener('DOMContentLoaded', () => {
    const promoContainer = document.querySelector('.promo-container');
    const promoItems = document.querySelectorAll('.promo-item');

    let counter = 1;
    const itemWidth = promoItems[0].offsetWidth;

    // Clonar os primeiros e últimos itens para criar um efeito de looping
    promoContainer.insertBefore(promoItems[promoItems.length - 1].cloneNode(true), promoItems[0]);
    promoContainer.appendChild(promoItems[0].cloneNode(true));

    function updateTransform() {
        promoContainer.style.transform = `translateX(-${counter * itemWidth}px)`;
    }

    function nextSlide() {
        if (counter >= promoItems.length) return; // Limita a quantidade de cliques no próximo
        promoContainer.style.transition = 'transform 0.5s ease-in-out';
        counter++;
        updateTransform();
    }

    function prevSlide() {
        if (counter <= 0) return; // Limita a quantidade de cliques no anterior
        promoContainer.style.transition = 'transform 0.5s ease-in-out';
        counter--;
        updateTransform();
    }

    promoContainer.addEventListener('transitionend', () => {
        if (promoItems[counter].getAttribute('src') === promoItems[0].getAttribute('src')) {
            promoContainer.style.transition = 'none';
            counter = 1;
            updateTransform();
        }
        if (promoItems[counter].getAttribute('src') === promoItems[promoItems.length - 1].getAttribute('src')) {
            promoContainer.style.transition = 'none';
            counter = promoItems.length - 2;
            updateTransform();
        }
    });

    document.querySelector('.next').addEventListener('click', nextSlide);
    document.querySelector('.prev').addEventListener('click', prevSlide);

    // Iniciar o carrossel na posição inicial
    promoContainer.style.transform = `translateX(-${itemWidth}px)`;

    // Função para iniciar o auto-play do carrossel
    function startAutoPlay(interval = 3000) {
        setInterval(nextSlide, interval);
    }

    // Inicia o auto-play quando a página é carregada
    startAutoPlay();
});
