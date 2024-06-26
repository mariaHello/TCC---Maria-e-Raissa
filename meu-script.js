const promoContainer = document.querySelector('.promo-container');
const promoItems = document.querySelectorAll('.promo-item');
const itemWidth = promoItems[0].offsetWidth;

// Clonar os primeiros e últimos itens para criar um efeito de looping
promoContainer.insertBefore(promoItems[promoItems.length - 1].cloneNode(true), promoItems[0]);
promoContainer.appendChild(promoItems[0].cloneNode(true));  // Corrigido para clonar o primeiro item corretamente

let counter = 1;

function updateTransform() {
    promoContainer.style.transform = `translateX(-${counter * itemWidth}px)`;
}

function nextSlide() {
    if (counter >= promoItems.length) return; // Adicionado para evitar ultrapassar o limite
    counter++;
    promoContainer.style.transition = 'transform 0.5s ease';
    updateTransform();
}

function prevSlide() {
    if (counter <= 0) return; // Adicionado para evitar ultrapassar o limite
    counter--;
    promoContainer.style.transition = 'transform 0.5s ease';
    updateTransform();
}

promoContainer.addEventListener('transitionend', () => {
    if (counter >= promoItems.length - 1) {
        promoContainer.style.transition = 'none';
        counter = 1;
        updateTransform();
    }
    if (counter <= 0) {
        promoContainer.style.transition = 'none';
        counter = promoItems.length - 2;
        updateTransform();
    }
});

// Função para iniciar o auto-play do carrossel
function startAutoPlay() {
    setInterval(nextSlide, 3000); // Altera para o próximo slide a cada 3 segundos
}

// Inicia o auto-play quando a página é carregada
window.onload = () => {
    updateTransform(); // Inicializa a posição correta
    startAutoPlay();
};
