async function myFunction() {
  const leResult = document.createElement("p");
  const bouton = document.getElementById("coco");
  let ingredient = document.getElementById("myText").value;
  document.getElementById("myText").innerText = ingredient;

  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${ingredient}`
      );
      const data = await res.json();
      console.log(data);

      // Remove existing cards
      const existingCards = document.getElementsByClassName("card");
      while (existingCards.length > 0) {
        existingCards[0].remove();
      }

      // Remove id coco
      const existingcoco = document.getElementById("coco");
      while (existingcoco.innerText.length > 0) {
        existingcoco.innerText = "";
      }

      // if search exist then:

      if (data.meals && data.meals.length > 0) {
        data.meals.forEach((meal, i) => {
          const newDiv = document.createElement("div");
          newDiv.classList.add("card");
          newDiv.classList.add("btn-open");
          const modalRecettehidden = document.createElement("div");
          modalRecettehidden.classList.add("hidden");
          modalRecettehidden.innerText = meal.strInstructions;

          const BigDiv = document.getElementsByClassName("BigDiv")[0];
          newDiv.addEventListener("click", openModal);
          bouton.appendChild(leResult);
          leResult.innerText = "these are the results for " + ingredient;
          const newImg = document.createElement("img");
          newImg.src = meal.strMealThumb;

          const newP = document.createElement("p");
          newP.innerText = meal.strMeal;

          const modalRecette = document.getElementById("modalRecette");
          modalRecette.innerText = meal.strInstructions;
          console.log(meal.strInstructions);

          newDiv.appendChild(modalRecettehidden);
          newDiv.appendChild(newImg);
          newDiv.appendChild(newP);
          BigDiv.appendChild(newDiv);
        });
      } else {
        console.log("No meals found.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");

const openModal = function (event) {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  const photoModal = document.getElementById("photoModal");
  photoModal.src = event.currentTarget.querySelector("img").src;
  const titreModal = document.getElementById("titreModal");
  titreModal.innerText = event.currentTarget.querySelector("p").innerText;

  const modalRecette = document.getElementById("modalRecette");
  const modalRecettehidden2 = event.currentTarget.querySelector("div");
  modalRecette.innerText = modalRecettehidden2.innerText;
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

closeModalBtn.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);
document.addEventListener("keydown");
