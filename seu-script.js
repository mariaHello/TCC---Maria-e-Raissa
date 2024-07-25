document.addEventListener('DOMContentLoaded', () => {
    const promoContainer = document.querySelector('.promo-container');
    const promoItems = document.querySelectorAll('.promo-container .promo-item');

    let counter = 1;
    const itemWidth = promoItems[0].offsetWidth;

    // Clonar os primeiros e últimos itens para criar um efeito de looping
    promoContainer.insertBefore(promoItems[promoItems.length - 1].cloneNode(true), promoItems[0]);
    promoContainer.appendChild(promoItems[0].cloneNode(true));

    function updateTransform(container, counter, itemWidth) {
        container.style.transform = `translateX(-${counter * itemWidth}px)`;
    }

    function nextSlide(container) {
        const items = container.querySelectorAll('.promo-item');
        const itemWidth = items[0].offsetWidth;

        let counter = parseInt(container.getAttribute('data-counter')) || 1;
        counter++;
        container.setAttribute('data-counter', counter);
        container.style.transition = 'transform 0.5s ease';
        updateTransform(container, counter, itemWidth);
    }

    function prevSlide(container) {
        const items = container.querySelectorAll('.promo-item');
        const itemWidth = items[0].offsetWidth;

        let counter = parseInt(container.getAttribute('data-counter')) || 1;
        counter--;
        container.setAttribute('data-counter', counter);
        container.style.transition = 'transform 0.5s ease';
        updateTransform(container, counter, itemWidth);
    }

    promoContainer.setAttribute('data-counter', counter);
    updateTransform(promoContainer, counter, itemWidth);

    promoContainer.addEventListener('transitionend', () => {
        let counter = parseInt(promoContainer.getAttribute('data-counter'));
        if (counter >= promoItems.length + 1) {
            promoContainer.style.transition = 'none';
            counter = 1;
            promoContainer.setAttribute('data-counter', counter);
            updateTransform(promoContainer, counter, itemWidth);
        }
        if (counter <= 0) {
            promoContainer.style.transition = 'none';
            counter = promoItems.length;
            promoContainer.setAttribute('data-counter', counter);
            updateTransform(promoContainer, counter, itemWidth);
        }
    });

    document.querySelector('.next').addEventListener('click', () => {
        nextSlide(promoContainer);
    });

    document.querySelector('.prev').addEventListener('click', () => {
        prevSlide(promoContainer);
    });

    // Função para iniciar o auto-play do carrossel
    function startAutoPlay(container, interval = 3000) {
        setInterval(() => {
            nextSlide(container);
        }, interval); // Altera para o próximo slide a cada 3 segundos
    }

    // Inicia o auto-play quando a página é carregada
    startAutoPlay(promoContainer);
});
