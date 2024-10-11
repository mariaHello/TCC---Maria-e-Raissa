document.addEventListener('DOMContentLoaded', () => {
    const promoContainer = document.querySelector('.promo-container');
    let promoItems = document.querySelectorAll('.promo-container .promo-item');
    
    let counter = 1;
    const itemWidth = promoItems[0].offsetWidth;

    // Clonar os primeiros e últimos itens para criar um efeito de looping
    const firstClone = promoItems[0].cloneNode(true);
    const lastClone = promoItems[promoItems.length - 1].cloneNode(true);

    // Adiciona o clone no início e no fim
    promoContainer.appendChild(firstClone);
    promoContainer.insertBefore(lastClone, promoItems[0]);

    // Atualiza a lista de promoItems após a clonagem
    promoItems = document.querySelectorAll('.promo-container .promo-item');

    function updateTransform(container, counter, itemWidth) {
        container.style.transform = `translateX(-${counter * itemWidth}px)`;
    }

    function nextSlide(container) {
        let counter = parseInt(container.getAttribute('data-counter')) || 1;
        counter++;
        container.setAttribute('data-counter', counter);
        container.style.transition = 'transform 0.5s ease';
        updateTransform(container, counter, itemWidth);
    }

    function prevSlide(container) {
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

        // Verifica se está no clone do último item e volta para o primeiro item real
        if (counter >= promoItems.length - 1) {
            promoContainer.style.transition = 'none'; // Remove a transição para evitar o "salto"
            counter = 1; // Volta ao primeiro item real
            promoContainer.setAttribute('data-counter', counter);
            updateTransform(promoContainer, counter, itemWidth);
        }

        // Verifica se está no clone do primeiro item e vai para o último item real
        if (counter <= 0) {
            promoContainer.style.transition = 'none';
            counter = promoItems.length - 2; // Vai para o último item real
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
        return setInterval(() => {
            nextSlide(container);
        }, interval); // Altera para o próximo slide a cada 3 segundos
    }

    let autoPlayInterval = startAutoPlay(promoContainer);

    // Pausa o autoplay quando o mouse estiver sobre o carrossel
    promoContainer.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });

    // Retoma o autoplay quando o mouse sair do carrossel
    promoContainer.addEventListener('mouseleave', () => {
        autoPlayInterval = startAutoPlay(promoContainer);
    });
});
