var contentArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

document.getElementById("save_card").addEventListener("click", () => {
  addFlashcard();
});

document.getElementById("delete_cards").addEventListener("click", () => {
  localStorage.clear();
  flashcards.innerHTML = "";
  contentArray = [];
});

document.getElementById("show_card_box").addEventListener("click", () => {
  document.getElementById("create_card").style.display = "block";
});

document.getElementById("close_card_box").addEventListener("click", () => {
  document.getElementById("create_card").style.display = "none";
});

flashcardMaker = (text) => {
  const flashcard = document.createElement("div");
  const question = document.createElement("h2");
  const answer = document.createElement("h2");

  flashcard.className = "flashcard";

  question.setAttribute(
    "style",
    "border-bottom:1px solid darkgray; padding: 15px; color: white; font-size:25px; font-weight: 100;"
  );
  question.textContent = text.my_question;

  answer.setAttribute(
    "style",
    "text-align:center; display:none; color:white; font-size:25px; font-weight: 100; margin-top: 20px;"
  );
  answer.textContent = text.my_answer;

  flashcard.appendChild(question);
  flashcard.appendChild(answer);

  flashcard.addEventListener("click", () => {
    if (answer.style.display == "none") answer.style.display = "block";
    else answer.style.display = "none";
  });

  document.querySelector("#flashcards").appendChild(flashcard);
};

contentArray.forEach(flashcardMaker);

addFlashcard = () => {
  const question = document.querySelector("#question");
  const answer = document.querySelector("#answer");

  let flashcard_info = {
    my_question: question.value,
    my_answer: answer.value,
  };

  contentArray.push(flashcard_info);
  localStorage.setItem("items", JSON.stringify(contentArray));
  flashcardMaker(contentArray[contentArray.length - 1]);
  question.value = "";
  answer.value = "";
};
