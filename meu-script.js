function updateTransform(container, counter, itemWidth) {
    container.style.transform = `translateX(-${counter * itemWidth}px)`;
}

function nextSlide(containerSelector) {
    const container = document.querySelector(containerSelector);
    const items = container.querySelectorAll('.promo-item');
    const itemWidth = items[0].offsetWidth;

    let counter = parseInt(container.getAttribute('data-counter')) || 1;
    counter++;
    container.setAttribute('data-counter', counter);
    container.style.transition = 'transform 0.5s ease';
    updateTransform(container, counter, itemWidth);
}

function prevSlide(containerSelector) {
    const container = document.querySelector(containerSelector);
    const items = container.querySelectorAll('.promo-item');
    const itemWidth = items[0].offsetWidth;

    let counter = parseInt(container.getAttribute('data-counter')) || 1;
    counter--;
    container.setAttribute('data-counter', counter);
    container.style.transition = 'transform 0.5s ease';
    updateTransform(container, counter, itemWidth);
}

document.querySelectorAll('.promo-container, .promo-container2').forEach(container => {
    const items = container.querySelectorAll('.promo-item');
    const itemWidth = items[0].offsetWidth;

    container.insertBefore(items[items.length - 1].cloneNode(true), items[0]);
    container.appendChild(items[0].cloneNode(true));

    container.setAttribute('data-counter', 1);

    container.addEventListener('transitionend', () => {
        let counter = parseInt(container.getAttribute('data-counter'));
        if (counter >= items.length + 1) {
            container.style.transition = 'none';
            counter = 1;
            container.setAttribute('data-counter', counter);
            updateTransform(container, counter, itemWidth);
        }
        if (counter <= 0) {
            container.style.transition = 'none';
            counter = items.length;
            container.setAttribute('data-counter', counter);
            updateTransform(container, counter, itemWidth);
        }
    });

    // Função para iniciar o auto-play do carrossel
    function startAutoPlay(container) {
        setInterval(() => {
            nextSlide(`.${container.className}`);
        }, 3000); // Altera para o próximo slide a cada 3 segundos
    }

    // Inicia o auto-play quando a página é carregada
    window.onload = () => {
        updateTransform(container, 1, itemWidth); // Inicializa a posição correta
        startAutoPlay(container);
    };
});
