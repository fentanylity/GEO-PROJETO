const news = [
    { text: "O Brasil é o maior produtor de soja do mundo.", isTrue: true },
    { text: "A agricultura familiar representa menos de 10% da produção de alimentos no Brasil.", isTrue: false },
    { text: "O desmatamento na Amazônia foi reduzido em 80% nos últimos 10 anos.", isTrue: false },
    { text: "Os latifúndios no Brasil controlam mais de 70% das terras agrícolas.", isTrue: true },
    { text: "A agroecologia no Brasil tem crescido 20% ao ano.", isTrue: true },
    { text: "A pecuária brasileira é responsável por menos de 10% das emissões de gases de efeito estufa no país.", isTrue: false },
    { text: "A agricultura familiar é responsável por cerca de 70% dos alimentos consumidos no Brasil.", isTrue: true },
    { text: "Os monocultivos são menos eficientes em termos de uso da terra do que a agrofloresta.", isTrue: true },
    { text: "A soja transgênica representa menos de 5% da produção total de soja no Brasil.", isTrue: false },
    { text: "O Brasil tem mais áreas de monocultura do que de floresta preservada.", isTrue: true },
    { text: "A erosão do solo no Brasil tem diminuído com o aumento do uso de pesticidas.", isTrue: false },
    { text: "O Brasil é um dos países que mais utiliza agrotóxicos no mundo.", isTrue: true },
    { text: "As pequenas propriedades rurais são responsáveis por mais da metade da produção agrícola no Brasil.", isTrue: false },
    { text: "A exportação de carne é a principal causa de desmatamento na Amazônia.", isTrue: true },
    { text: "O Brasil perdeu mais de 1 milhão de hectares de terra cultivável em 2023 devido à desertificação.", isTrue: false },
    { text: "A agricultura orgânica ocupa mais de 25% das terras agrícolas no Brasil.", isTrue: false },
    { text: "O Código Florestal Brasileiro exige que 80% das propriedades na Amazônia sejam preservadas como floresta.", isTrue: true },
    { text: "O Brasil conseguiu aumentar sua produção agrícola sem aumentar a área plantada nos últimos anos.", isTrue: true },
    { text: "O uso de sementes crioulas tem aumentado significativamente no Brasil.", isTrue: false },
    { text: "O agronegócio brasileiro é responsável por 50% do PIB do país.", isTrue: false }
];

let score = 0;
let round = 1;

function shuffleNews() {
    news.sort(() => Math.random() - 0.5);
}

const fact = document.getElementById('fact-button');
const fake = document.getElementById('fake-button');
const grad = document.getElementById('gradient')
function MouseEv(event, element, button) {
    element.addEventListener(event, () => {
        alterClass(button, event === 'mouseleave' ? 0 : 1);
    })
}

function alterClass(element, type) {
    console.log('legal')
    if (type) element.classList.add('trans');
    else      element.removeAttribute('class');
}

MouseEv('mouseover', fact,  grad.firstElementChild);
MouseEv('mouseleave', fact, grad.firstElementChild);
MouseEv('mouseover', fake, grad.lastElementChild);
MouseEv('mouseleave', fake, grad.lastElementChild);

function typeWriterEffect(text, elementId, delay = 50) {
    const element = document.getElementById(elementId);
    let index = 0;

    function typeCharacter() {
        if (index < text.length) {
            element.innerHTML = text.substring(0, index) + `<span class="atual">${text.charAt(index)}</span>`;
            index++;
            setTimeout(typeCharacter, delay);
        } else {
            element.innerHTML = text; // Texto completo sem a classe "atual"
        }
    }

    typeCharacter();
}

function loadNews() {
    const newsItem = news[round - 1];
    typeWriterEffect(newsItem.text, 'news-text',)
    //document.getElementById('news-text').innerText = newsItem.text;

    document.getElementById('fact-button').onclick = () => checkAnswer(true, newsItem.isTrue);
    document.getElementById('fake-button').onclick = () => checkAnswer(false, newsItem.isTrue);
}

function checkAnswer(userChoice, isTrue) {
    if (userChoice === isTrue) {
        score++;
    }

    if (round < 10) {
        round++;
        loadNews();
    } else {
        endGame();
    }

    document.getElementById('score').innerText = score;
    document.getElementById('round').innerText = round;
}

function endGame() {
    document.getElementById('news-text').innerText = `Fim de jogo! Você acertou ${score} de 10 notícias.`;
    document.querySelector('.buttons-container').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    shuffleNews();
    loadNews();
});
