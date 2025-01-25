
const backgroundMusic = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');

const gridContainer = document.querySelector('.background-grid');

const rows = Math.ceil(window.innerHeight / 100);
const cols = Math.ceil(window.innerWidth / 100);
const totalSquares = rows * cols;

const contentBox = document.getElementById('contentBox');

const contentList = [
  "💖 Feliz primeiro mes de namoro meu amorzinho, eu te amo demais, eu te amo imensamente infitamente para sempre, não tenho palavras para descrever como está sendo uma experiêcia única ter voce nesse 1 mes, que esse 1 mes vire 1 década, 10 décadas, 20 30 40 50 60",
  "Você mudou minha vida de muitas formas, sinto que sou uma pessoa melhor com você, obrigado por me apoiar ser minha melhor amiga e meu amor, eu te amo muito",
  "Espero que todos os nossos sonhos juntos se realizem, saiba que vou lutar muito e me esforçar muito para te fazer feliz, mesmo assim sinto que voce merece muito mais do que eu sou capaz de te dar, mas seguimos tentando até onde você me suportar KKKKKKKKKKKKKKKKKKKKKKKKK",
  "Cada momento ao seu lado é especial, e sinto muita saudade de você o tempo todo. Quero você para sempre e para a minha vida, espero que não tenha mais a impressão que eu sou um ´GOLPE´ kkkkk, eu te amo de vdd. Fiz uns joguinhos para nós "
];

const images = [];
for (let i = 1; i <= 28; i++) {
  images.push(`../imagens/${i}.jpeg`);

}


document.getElementById('openPageBtn').addEventListener('click', function() {
  window.location.href = '../pages/games.html';
});

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

for (let i = 0; i < totalSquares; i++) {
  const square = document.createElement('div');
  square.style.backgroundImage = `url(${images[Math.floor(Math.random() * images.length)]})`;
  gridContainer.appendChild(square);
}

function changeImages() {
  const squares = document.querySelectorAll('.background-grid div');
  
  squares.forEach(square => {
    square.classList.add('hidden');
    
    setTimeout(() => {
      const newImage = images[Math.floor(Math.random() * images.length)];
      square.style.backgroundImage = `url(${newImage})`;
      square.classList.remove('hidden'); // Remove a classe para exibir novamente
    }, 1000); // O tempo deve coincidir com o tempo da transição no CSS
  });
}

// Alterna as imagens a cada 2 segundos
//setInterval(changeImages, 4000);


// Variável para controlar o índice do conteúdo atual
let currentIndex = 0;

// Função para atualizar o conteúdo dentro da div com o id "contentBox"
function updateContent() {
  const contentBox = document.getElementById('contentBox');
  contentBox.innerHTML = `<p>${contentList[currentIndex]}</p>`;
}

// Atualiza o conteúdo inicialmente
updateContent();

// Quando o botão "anterior" for clicado
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + contentList.length) % contentList.length; // Vai para o conteúdo anterior
  updateContent();
});

// Quando o botão "próximo" for clicado
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % contentList.length; // Vai para o próximo conteúdo
  updateContent();
});

// Cria o elemento do cursor de coração
const cursorHeart = document.createElement('div');
cursorHeart.classList.add('cursor-heart');
document.body.appendChild(cursorHeart);  // Adiciona o cursor de coração ao corpo da página

// Função para atualizar a posição do cursor de coração
document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Atualiza a posição do coração com base na posição do mouse
    cursorHeart.style.left = `${mouseX}px`;
    cursorHeart.style.top = `${mouseY}px`;
});

// Função para iniciar a troca independente de imagens
function startIndependentImageChange() {
  const squares = document.querySelectorAll('.background-grid div');

  squares.forEach(square => {
    // Define um intervalo aleatório para cada quadrado (entre 2 e 6 segundos)
    const interval = Math.random() * (40000 - 8000) + 8000;

    setInterval(() => {
      // Adiciona a classe "hidden" para iniciar a transição de opacidade
      square.classList.add('hidden');

      // Aguarda a transição completar antes de trocar a imagem
      setTimeout(() => {
        const newImage = images[Math.floor(Math.random() * images.length)];
        square.style.backgroundImage = `url(${newImage})`;
        square.classList.remove('hidden'); // Remove a classe para exibir novamente
      }, 1000); // O tempo deve coincidir com a transição no CSS
    }, interval); // Intervalo aleatório para cada quadrado
  });
}

// Inicia as trocas de imagem independentes
startIndependentImageChange();


let isMusicPlaying = true; // Estado inicial da música

document.addEventListener('click', () => {
  backgroundMusic.play();
}, { once: true }); // Executa apenas uma vez

// Data de início (29 de dezembro às 17h)
const startDate = new Date('2024-12-29T17:00:00');

// Função para calcular a diferença de tempo e atualizar o contador
function updateCounter() {
  const currentDate = new Date();
  const timeDifference = currentDate - startDate; // diferença em milissegundos

  // Calcula os dias, horas, minutos e segundos
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  console.log(seconds)
  // Exibe a contagem no formato: dias:horas:minutos:segundos
  document.getElementById('dayCounter').innerText = `Tempo desde que eu pedi a mão da mulher mais linda do mundo em namoro: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Atualiza a contagem de tempo a cada 1 segundo
setInterval(updateCounter, 1000);

// Inicializa a contagem
updateCounter();
