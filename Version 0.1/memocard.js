const addCardSection = document.getElementById("add-new-cards")
const addCardButton = document.getElementById("add-button-main")
const questionText = document.getElementById("question")
const answerText = document.getElementById("answer")
const viewButton = document.getElementById("view-btn")
const hideButton = document.getElementById("view-btn-hide")
const editButton = document.getElementById("edit-btn")
const doneButton = document.getElementById("check-btn")
const deleteButton = document.getElementById("delete-btn")
const addNewCardButton = document.getElementById("add-new-card-btn")
const blurBody = document.getElementById("blur-body")
const cardQuestion = document.getElementById("card-question")
const cardAnswer = document.getElementById("card-answer")
const cardsContainer = document.getElementById("cards-container")
let currentActiveCard = 0;
const cardsArray = [];
const cardsData = getCardsData();

addCardButton.addEventListener("click", () => {
    addCardSection.style.display = 'inline'
    blurBody.style.cssText = `
            filter: blur(10px);
            height: 100vh;
        `;
        addCardButton.style.cssText = `
        filter: blur(10px);
        cursor: default !important;
    `;
})
blurBody.addEventListener("click", () => {
    addCardSection.style.display= 'none'
        blurBody.style.filter = 'blur(0)'
        addCardButton.style.cssText = `
        filter: blur(0);
        cursor: pointer;
    `;
})
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}
let cardIndex = 0;
function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card-box");
  if (index === 0) {
    card.classList.add("card-slide");
    index + 1
  }
  card.innerHTML = `
        <div class="card-slide" id="card">
        <textarea 
            disabled
            id="card-question${index}" 
            class="card-question"
            cols="37" 
            rows="2"
        >${data.question}</textarea>
        <textarea 
            disabled
            id="card-answer${index}" 
            class="card-answer" 
            cols="33" 
            rows="2"
        >${data.answer}</textarea>
        <div class="card-buttons">
            <button class="card-btn-edit cards-boxes" id="edit-btn${index}">
            <a class="editsvg" id="edit-btn">
            <svg
                class="svg-edit"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="40"
                height="40"
                viewBox="0 0 50 50"
            >
                <path
                d="M 43.050781 1.9746094 C 41.800781 1.9746094 40.549609 2.4503906 39.599609 3.4003906 L 38.800781 4.1992188 L 45.699219 11.099609 L 46.5 10.300781 C 48.4 8.4007812 48.4 5.3003906 46.5 3.4003906 C 45.55 2.4503906 44.300781 1.9746094 43.050781 1.9746094 z M 37.482422 6.0898438 A 1.0001 1.0001 0 0 0 36.794922 6.3925781 L 4.2949219 38.791016 A 1.0001 1.0001 0 0 0 4.0332031 39.242188 L 2.0332031 46.742188 A 1.0001 1.0001 0 0 0 3.2578125 47.966797 L 10.757812 45.966797 A 1.0001 1.0001 0 0 0 11.208984 45.705078 L 43.607422 13.205078 A 1.0001 1.0001 0 1 0 42.191406 11.794922 L 9.9921875 44.09375 L 5.90625 40.007812 L 38.205078 7.8085938 A 1.0001 1.0001 0 0 0 37.482422 6.0898438 z"
                ></path>
            </svg>
            </a>
            </button>
            <button class="card-btn-check cards-boxes" id="check-btn${index}">
            <a class= "checksvg" id="check-btn">
                <svg
                class="svg-ckeck"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="40"
                height="40"
                viewBox="0 0 24 20"
                >
                <path
                d="M24 6.278l-11.16 12.722-6.84-6 1.319-1.49 5.341 4.686 9.865-11.196 1.475 1.278zm-22.681 5.232l6.835 6.01-1.314 1.48-6.84-6 1.319-1.49zm9.278.218l5.921-6.728 1.482 1.285-5.921 6.756-1.482-1.313z"
                ></path>
                </svg>
            </a>
            </button>
            <button onClick="this.editit(index)" class="card-btn-delete cards-boxes" id="delete-btn${index}">
            <svg
                class="svg-del"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="40"
                height="40"
                viewBox="0 0 50 50"
            >
                <path
                d="M 21 0 C 19.354545 0 18 1.3545455 18 3 L 18 5 L 10.15625 5 A 1.0001 1.0001 0 0 0 9.8378906 5 L 8 5 A 1.0001 1.0001 0 1 0 8 7 L 9.0859375 7 L 12.705078 47.5 L 12.707031 47.509766 C 12.857262 48.862232 13.981872 50 15.400391 50 L 34.599609 50 C 36.018128 50 37.142691 48.862266 37.292969 47.509766 L 37.294922 47.5 L 40.914062 7 L 42 7 A 1.0001 1.0001 0 1 0 42 5 L 40.173828 5 A 1.0001 1.0001 0 0 0 39.841797 5 L 32 5 L 32 3 C 32 1.3545455 30.645455 0 29 0 L 21 0 z M 21 2 L 29 2 C 29.554545 2 30 2.4454545 30 3 L 30 5 L 20 5 L 20 3 C 20 2.4454545 20.445455 2 21 2 z M 11.09375 7 L 18.832031 7 A 1.0001 1.0001 0 0 0 19.158203 7 L 30.832031 7 A 1.0001 1.0001 0 0 0 31.158203 7 L 38.90625 7 L 35.306641 47.289062 C 35.256918 47.736563 34.981091 48 34.599609 48 L 15.400391 48 C 15.018909 48 14.743082 47.736563 14.693359 47.289062 L 11.09375 7 z M 18.984375 9.9863281 A 1.0001 1.0001 0 0 0 18 11 L 18 44 A 1.0001 1.0001 0 1 0 20 44 L 20 11 A 1.0001 1.0001 0 0 0 18.984375 9.9863281 z M 24.984375 9.9863281 A 1.0001 1.0001 0 0 0 24 11 L 24 44 A 1.0001 1.0001 0 1 0 26 44 L 26 11 A 1.0001 1.0001 0 0 0 24.984375 9.9863281 z M 30.984375 9.9863281 A 1.0001 1.0001 0 0 0 30 11 L 30 44 A 1.0001 1.0001 0 1 0 32 44 L 32 11 A 1.0001 1.0001 0 0 0 30.984375 9.9863281 z"
                ></path>
            </svg>
            </button>
            <button class="card-btn-view cards-boxes" id="view-btn${index}"> 
            <a class="showsvg" >
                <svg
                class="show-svg"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="40"
                height="40"
                viewBox="0 0 50 50"
                xml:space="preserve"
                >
                <g id="Layer_1">
                    <path
                    id="showpath1"
                    d="M25,39c13.036,0,23.352-12.833,23.784-13.379L49.275,25l-0.491-0.621C48.352,23.833,38.036,11,25,11S1.648,23.833,1.216,24.379L0.725,25l0.491,0.621C1.648,26.167,11.964,39,25,39z M25,13c10.494,0,19.47,9.46,21.69,12C44.473,27.542,35.509,37,25,37C14.506,37,5.53,27.54,3.31,25C5.527,22.458,14.491,13,25,13z"
                    />
                    <path
                    id="showpath2"
                    d="M25,34c4.963,0,9-4.038,9-9s-4.037-9-9-9s-9,4.038-9,9S20.037,34,25,34z M25,18c3.859,0,7,3.14,7,7s-3.141,7-7,7s-7-3.14-7-7S21.141,18,25,18z"
                    />
                </g>
                </svg>
            </a>
            </button>
            <button class="card-btn-view-hide cards-boxes" id="view-btn-hide${index}">
            <a class="showsvg" >
                <svg
                class="show-svg"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="40"
                height="40"
                viewBox="0 0 50 50"
                xml:space="preserve"
                >
                <g id="Layer_1">
                    <path
                    id="showpath1"
                    d="M25,39c13.036,0,23.352-12.833,23.784-13.379L49.275,25l-0.491-0.621C48.352,23.833,38.036,11,25,11S1.648,23.833,1.216,24.379L0.725,25l0.491,0.621C1.648,26.167,11.964,39,25,39z M25,13c10.494,0,19.47,9.46,21.69,12C44.473,27.542,35.509,37,25,37C14.506,37,5.53,27.54,3.31,25C5.527,22.458,14.491,13,25,13z"
                    />
                    <path
                    id="showpath2"
                    d="M25,34c4.963,0,9-4.038,9-9s-4.037-9-9-9s-9,4.038-9,9S20.037,34,25,34z M25,18c3.859,0,7,3.14,7,7s-3.141,7-7,7s-7-3.14-7-7S21.141,18,25,18z"
                    />
                </g>
                </svg>
            </a>
            </button>
        </div>
    </div> 
    `;
  card.addEventListener("click", () => card.classList.toggle("view-btn"));
  cardsArray.push(card);
  cardsContainer.appendChild(card);
}
createCards();
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}
function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}
let cardsNumber;
addNewCardButton.addEventListener("click", () => {
    const question = questionText.value;
    const answer = answerText.value;
    if (question.trim() && answer.trim()) {
      const newCard = { question, answer };
      createCards(newCard);
      questionText.value = "";
      answerText.value = "";
      addCardSection.classList.remove("show");
      cardsData.push(newCard);
      setCardsData(cardsData);
      cardsNumber + 1;
    }
    addCardSection.style.animationName = 'hide';
    addCardSection.style.animationDuration = '1s';
    addCardSection.style.animationFillMode = 'ease-out';
    setTimeout(() => {
        addCardSection.style.display = 'none';
    }, 200)
    blurBody.style.filter = 'blur(0)'
    addCardButton.style.cssText = `
        filter: blur(0);
        cursor: pointer;
    `;
});

showAnswer = () => {
    document.getElementById(`card-answer${cardsNumber}`).style.filter = 'blur(0)'
    document.getElementById(`view-btn${cardsNumber}`).style.display = 'none'
    document.getElementById(`view-btn-hide${cardsNumber}`).style.display = 'block'
}
hideAnswer = () => {
    document.getElementById(`card-answer${1}`).style.filter = 'blur(10px)'
    document.getElementById(`view-btn${1}`).style.display = 'inline'
    document.getElementById(`view-btn-hide${1}`).style.display = 'none'
}
editCard = () => {
    document.getElementById(`view-btn${1}`).style.filter = 'blur(10px)'
    document.getElementById(`edit-btn${1}`).style.filter = 'blur(10px)'
    document.getElementById(`delete-btn${1}`).style.filter = 'blur(10px)'
    document.getElementById(`view-btn-hide${1}`).style.filter = 'blur(10px)'
    document.getElementById(`check-btn${1}`).style.display = 'block'
    document.getElementById(`card-question${1}`).disabled = false
    document.getElementById(`card-answer${1}`).disabled = false
    document.getElementById(`card-question${1}`).style.cssText = `
        border: 1px solid green;
        border-radius: 10px;
    `;
    document.getElementById(`card-answer${1}`).style.cssText = `
        filter: blur(0);
        border: 1px solid green;
        border-radius: 10px;
    `;
}
editDone = () => {
    document.getElementById(`view-btn${1}`).style.filter = 'blur(0)'
    document.getElementById(`edit-btn${1}`).style.filter = 'blur(0)'
    document.getElementById(`delete-btn${1}`).style.filter = 'blur(0)'
    document.getElementById(`view-btn-hide${1}`).style.filter = 'blur(0)'
    document.getElementById(`check-btn${1}`).style.display = 'none'
    document.getElementById(`card-question${1}`).disabled = true
    document.getElementById(`card-answer${1}`).disabled = true
    document.getElementById(`card-question${1}`).style.cssText = `
        border: none;
    `;
    document.getElementById(`card-answer${1}`).style.cssText = `
        filter: blur(0);
        border: none;
    `;
}
viewButton.addEventListener("click", () => {
    cardAnswer.style.filter = 'blur(0)'
    viewButton.style.display = 'none'

    hideButton.style.display = 'block'
})
hideButton.addEventListener("click", () => {
    cardAnswer.style.filter = 'blur(4px)'
    viewButton.style.display = 'inline'
    hideButton.style.display = 'none'
})
editButton.addEventListener("click", () => {
    editButton.style.filter = 'blur(5px)'
    viewButton.style.filter = 'blur(10px)'
    hideButton.style.filter = 'blur(10px)'
    deleteButton.style.filter = 'blur(10px)'
    doneButton.style.display = 'block'
    cardQuestion.disabled = false
    cardAnswer.disabled = false
    cardQuestion.style.cssText = `
        border: 1px solid green;
        border-radius: 10px;
    `;
    cardAnswer.style.cssText = `
        filter: blur(0);
        border: 1px solid green;
        border-radius: 10px;
    `;
})
doneButton.addEventListener("click", () => {
    editButton.style.filter = 'blur(0)'
    viewButton.style.filter = 'blur(0)'
    hideButton.style.filter = 'blur(0)'
    deleteButton.style.filter = 'blur(0)'
    doneButton.style.display = 'none'
    cardQuestion.disabled = true
    cardAnswer.disabled = true
    cardQuestion.style.cssText = `
        border: none;
    `;
    cardAnswer.style.cssText = `
        filter: blur(0);
        border: none;
    `;
})

document.getElementById(`edit-btn`).onclick = (event) => {
    if(event.target && event.target.matches("button.card-btn-edit")) {
        editCard(event.target.parentNode);
    }
}
cardQuestion.addEventListener("keyup", () => {
    if (event.keyCode === 13) {
        event.preventDefault();
        doneButton.click();
      }
})
cardAnswer.addEventListener("keyup", () => {
    if (event.keyCode === 13) {
        event.preventDefault();
        doneButton.click();
      }
})
questionText.addEventListener("keyup", () => {
    if (event.keyCode === 13) {
        event.preventDefault();
        addNewCardButton.click();
      }
})
answerText.addEventListener("keyup", () => {
    if (event.keyCode === 13) {
        event.preventDefault();
        addNewCardButton.click();
      }
})
