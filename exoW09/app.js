async function myFunction() {
  // Create a paragraph element to display results
  const resultParagraph = document.createElement("p");
  const button = document.getElementById("coco");
  let ingredient = document.getElementById("myText").value;
  document.getElementById("myText").innerText = ingredient;

  // Fetch data from the API based on the ingredient
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${ingredient}`
      );
      const data = await response.json();
      console.log(data);

      // Remove existing cards
      const existingCards = document.getElementsByClassName("card");
      while (existingCards.length > 0) {
        existingCards[0].remove();
      }

      // Clear the text of the element with id "coco"
      const existingCoco = document.getElementById("coco");
      existingCoco.innerText = "";

      // If meals are found, display them
      if (data.meals && data.meals.length > 0) {
        data.meals.forEach((meal) => {
          // Create a new card for each meal
          const cardDiv = document.createElement("div");
          cardDiv.classList.add("card", "btn-open");

          // Store meal instructions in a hidden div
          const hiddenModalContent = document.createElement("div");
          hiddenModalContent.classList.add("hidden");
          hiddenModalContent.innerText = meal.strInstructions;

          // Store meal ingredients in a hidden div
          const hiddenIngredientsContent = document.createElement("div");
          hiddenIngredientsContent.classList.add("hidden");
          hiddenIngredientsContent.innerHTML = getIngredientsList(meal);

          const bigDiv = document.getElementsByClassName("BigDiv")[0];
          cardDiv.addEventListener("click", openModal);

          // Append result message to the button
          button.appendChild(resultParagraph);
          resultParagraph.innerText = "These are the results for " + ingredient;

          // Create and append the meal image and name to the card
          const mealImage = document.createElement("img");
          mealImage.src = meal.strMealThumb;

          const mealName = document.createElement("p");
          mealName.innerText = meal.strMeal;

          // Append the hidden modal content, ingredients, image, and name to the card
          cardDiv.appendChild(hiddenModalContent);
          cardDiv.appendChild(hiddenIngredientsContent);
          cardDiv.appendChild(mealImage);
          cardDiv.appendChild(mealName);
          bigDiv.appendChild(cardDiv);
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

// Function to get ingredients list
function getIngredientsList(meal) {
  const ul = document.createElement("ul");
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient) {
      const li = document.createElement("li");
      li.innerText = `${ingredient} - ${measure}`;
      ul.appendChild(li);
    }
  }
  return ul.outerHTML;
}

// Modal functionality
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".btn-close");

// Open modal and display meal details
const openModal = function (event) {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");

  const photoModal = document.getElementById("photoModal");
  photoModal.src = event.currentTarget.querySelector("img").src;

  const titleModal = document.getElementById("titreModal");
  titleModal.innerText = event.currentTarget.querySelector("p").innerText;

  const modalRecipe = document.getElementById("modalRecette");
  const hiddenModalContent = event.currentTarget.querySelector("div.hidden");
  modalRecipe.innerText = hiddenModalContent.innerText;

  const ingredientsList = document.getElementById("ingredientsList");
  const hiddenIngredientsContent = event.currentTarget.querySelector(
    "div.hidden + div.hidden"
  );
  ingredientsList.innerHTML = hiddenIngredientsContent.innerHTML;
};

// Close modal
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});
