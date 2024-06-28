document.addEventListener('DOMContentLoaded', () => {
    const promoContainer1 = document.querySelector('.promo-container');
    const promoItems1 = document.querySelectorAll('.promo-container .promo-item');

    let counter1 = 1;
    const itemWidth1 = promoItems1[0].offsetWidth;

    // Clonar os primeiros e últimos itens para criar um efeito de looping
    promoContainer1.insertBefore(promoItems1[promoItems1.length - 1].cloneNode(true), promoItems1[0]);
    promoContainer1.appendChild(promoItems1[1].cloneNode(true));

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

    promoContainer1.setAttribute('data-counter', counter1);
    updateTransform(promoContainer1, counter1, itemWidth1);

    promoContainer1.addEventListener('transitionend', () => {
        let counter = parseInt(promoContainer1.getAttribute('data-counter'));
        if (counter >= promoItems1.length + 1) {
            promoContainer1.style.transition = 'none';
            counter = 1;
            promoContainer1.setAttribute('data-counter', counter);
            updateTransform(promoContainer1, counter, itemWidth1);
        }
        if (counter <= 0) {
            promoContainer1.style.transition = 'none';
            counter = promoItems1.length;
            promoContainer1.setAttribute('data-counter', counter);
            updateTransform(promoContainer1, counter, itemWidth1);
        }
    });

    document.querySelector('.promocoes-carrosel .next').addEventListener('click', () => {
        nextSlide(promoContainer1);
    });

    document.querySelector('.promocoes-carrosel .prev').addEventListener('click', () => {
        prevSlide(promoContainer1);
    });

    // Função para iniciar o auto-play do carrossel
    function startAutoPlay(container, interval = 3000) {
        setInterval(() => {
            nextSlide(container);
        }, interval); // Altera para o próximo slide a cada 3 segundos
    }

    // Inicia o auto-play quando a página é carregada
    startAutoPlay(promoContainer1);
});
