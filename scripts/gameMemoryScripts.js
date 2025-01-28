document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const turnText = document.getElementById('turn');
    const restartBtn = document.getElementById('restartBtn');
    
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let playerTurn = 1;
    let matchedPairs = 0;

    // Criando as imagens para as cartas
    const images = [];
    for (let i = 1; i <= 28; i++) {
        images.push(`../imagens/${i}.jpeg`);
    }
    
    // Criando um array para as cartas duplicadas (par de imagens)
    const cardImages = [...images, ...images];
    shuffle(cardImages); // Embaralha as cartas

    // Função para embaralhar as cartas
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    // Função para criar o tabuleiro
    function createBoard() {
        cardImages.forEach((image, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.image = image;

            const img = document.createElement('img');
            img.src = image;
            card.appendChild(img);

            card.addEventListener('click', () => flipCard(card));
            gameBoard.appendChild(card);
        });
    }

    // Função para virar a carta
    function flipCard(card) {
        if (lockBoard || card.classList.contains('flipped') || card.classList.contains('matched')) return;
        
        card.classList.add('flipped');
        
        if (!firstCard) {
            firstCard = card;
            return;
        }

        secondCard = card;

        checkForMatch();
    }

    // Função para verificar se as cartas são iguais
    function checkForMatch() {
        lockBoard = true;
        
        const isMatch = firstCard.dataset.image === secondCard.dataset.image;
        
        if (isMatch) {
            disableCards();
            matchedPairs++;
            if (matchedPairs === images.length) {
                setTimeout(() => alert(`Jogador ${playerTurn} venceu!`), 500);
            }
        } else {
            unflipCards();
        }
        
        setTimeout(() => {
            playerTurn = playerTurn === 1 ? 2 : 1;
            turnText.textContent = `Jogador ${playerTurn}, sua vez!`;
        }, 1000);
    }

    // Função para desabilitar as cartas quando elas formam um par
    function disableCards() {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetBoard();
    }

    // Função para virar as cartas de volta se não formarem um par
    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }

    // Função para resetar as variáveis
    function resetBoard() {
        firstCard = null;
        secondCard = null;
        lockBoard = false;
    }

    // Função para reiniciar o jogo
    function restartGame() {
        matchedPairs = 0;
        playerTurn = 1;
        turnText.textContent = `Jogador 1, sua vez!`;
        gameBoard.innerHTML = '';
        shuffle(cardImages);
        createBoard();
    }

    // Evento de reiniciar o jogo
    restartBtn.addEventListener('click', restartGame);

    // Iniciar o jogo
    createBoard();
});
