async function myFunction() {
    // Create a paragraph element to display results
    const resultParagraph = document.createElement("p");
    const button = document.getElementById("coco");
    let ingredient = document.getElementById("myText").value;
    document.getElementById("myText").innerText = ingredient;
  
    // Fetch data from the API based on the ingredient
    const fetchData = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ingredient}`);
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
            const hiddenModalContent = document.createElement("div");
            hiddenModalContent.classList.add("hidden");
            hiddenModalContent.innerText = meal.strInstructions;
  
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
  
            // Append the hidden modal content, image, and name to the card
            cardDiv.appendChild(hiddenModalContent);
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
    const hiddenModalContent = event.currentTarget.querySelector("div");
    modalRecipe.innerText = hiddenModalContent.innerText;
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
