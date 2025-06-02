"use strict"; // Enables strict mode, which catches common coding errors and improves performance

/*
    Name: Azharul Haque Shuvo
    Banner ID: 001264251
    Course: ELEE1159
*/

// Utility function to get a DOM element by selector
const getElement = selector => document.querySelector(selector);

// Image constants
const backImgSrc = "images/back.png";
const blankImgSrc = "images/blank.png";
const cardImgSrcStart = "images/card_";

// Global variables for game state
let playerName;
let highScore = 0;
let accuracy = 0;
let numCards = 48;
let flippedCards = [];
let matchedCards = 0;
let totalFlips = 0;
let checkingMatch = false; // declaring flag to prevent further clicks

document.addEventListener("DOMContentLoaded", () => {
    // Load player info and render game board
    loadPlayerInfo();
    renderGameBoard();

    // Load settings from localStorage
    loadSettings();

    // Add click event handler for each card link
    cardClickListeners();

    // Add click event handler for each tab link button
    tabClickListeners();

    // Add click event handler for Save Settings button
    saveSettingsListener();

    // Add click event handler for Reset Settings button
    resetSettingsListener();

    // Add click event handler for New Game link
    newGameListener();
});

// Load player info (name, high score, accuracy)
function loadPlayerInfo() {
    const playerNameDisplay = getElement("#player");
    const highScoreDisplay = getElement("#high_score");
    const accuracyDisplay = getElement("#correct");

    try{

    // Retrieve player name and high score from localStorage
    playerName = localStorage.getItem("player_name") || "Guest";
    highScore = parseInt(localStorage.getItem("high_score") || 0, 10);

    // Validate player name for special characters and spaces
    const validationResult = validatePlayerName(playerName);
    if (!validationResult.isValid) {
      playerName = "Guest";
      localStorage.setItem("player_name", playerName);
      alert(validationResult.errorMessage);

    }

    console.log(`Loaded player info: ${playerName}, High Score: ${highScore}%, Accuracy: ${accuracy}%`);

    if (playerNameDisplay) playerNameDisplay.textContent = `Player: ${playerName}`;
    if (highScoreDisplay) highScoreDisplay.textContent = `High Score: ${highScore}%`;
    if (accuracyDisplay) accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;

    }catch (error) {
        console.error("Error loading player info:", error.message);
        alert("An error occurred while loading player info. Please try again.");
    }
}

// Validate player name for special characters and spaces
function validatePlayerName(name) {
  const regex = /^\S+[a-zA-Z0-9\s]*$/;
  if (!regex.test(name)) {
    return {
      isValid: false,
      errorMessage: "Invalid player name. Only alphanumeric characters are allowed. Player name set as Guest"
    };
  }
  return { isValid: true };
}


// Render the game board with shuffled cards
function renderGameBoard() {
    const cardsContainer = getElement("#cards");
    if (!cardsContainer) return;

    // Clear any existing cards
    cardsContainer.innerHTML = '';

    console.log(`Rendering game board with ${numCards} cards.`);

    // Create an array of card images (pairs of cards)
    const cards = [];
    for (let i = 1; i <= numCards / 2; i++) {
        cards.push(`${cardImgSrcStart}${i}.png`);
        cards.push(`${cardImgSrcStart}${i}.png`);
    }

    // Shuffle the cards array
    shuffleArray(cards);

    // Create HTML for the cards
    cards.forEach(cardSrc => {
        const card = document.createElement("a");
        card.href = "#";
        card.id = cardSrc;
        card.innerHTML = `
            <div class="back">
                <img src="${backImgSrc}" alt="card back">
            </div>
            <div class="font"></div>
        `;;
        cardsContainer.appendChild(card);
    });

    console.log(`Game board rendered with ${cards.length} card elements.`);
}

// Shuffle the cards
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    console.log("Shuffled cards:", array);
}

// Add click event listeners to each card
function cardClickListeners() {
    const cards = document.querySelectorAll("#cards a");
    cards.forEach(card => {
        card.addEventListener("click", flipCard);
    });
    console.log(`Added click listeners to ${cards.length} cards.`);
}

// when a card is flipped
function flipCard(event) {
    const card = event.target.closest('a');
    if (!card || card.classList.contains("flipped") || checkingMatch) return;

    console.log(`Card flipped: ${card.id}`);

    // Flip the card (show image) 
    card.classList.add("flipped");
    flipCardImage(card);

    flippedCards.push(card);
    totalFlips++;

    // Check if two cards are flipped
    if (flippedCards.length === 2) {
        // Set flag to prevent further clicks
        checkingMatch = true; 
        setTimeout(() => {
            console.log("Checking for match...");
            // Check for a match when two cards are flipped
            checkForMatch();
        }, 1000);
    }

}

// Flip the card image and update the UI
function flipCardImage(card) {
    const cardImg = card.querySelector("img");
    if (!cardImg) return;
    cardImg.style.opacity = 0;
    setTimeout(() => {
        cardImg.src = card.id;
        cardImg.style.opacity = 1;
    },200);
    card.classList.add("flipped");
    console.log(`Card image flipped: ${card.id}`);
}

// Check if two flipped cards match
function checkForMatch() {
    const [card1, card2] = flippedCards;
    console.log(`Checking match for cards: ${card1.id} and ${card2.id}`);

    if (card1.id === card2.id) {
        // If cards match, set them to blank and increase matchedCards
        card1.querySelector("img").src = blankImgSrc;
        card2.querySelector("img").src = blankImgSrc;
        matchedCards++;
        console.log("Cards match!");
        //updateAccuracy();
    } else {
        // If cards don't match, flip them back
        flipBack(card1);
        flipBack(card2);
        //updateAccuracy();
    }

    updateAccuracy();
    
    // Reset flipped cards array
    flippedCards = [];
    checkingMatch = false; // Reset flag to allow clicks

    // Check if game is over
    if (matchedCards === numCards / 2) {
        endGame();
    }
}

// Flip a card back to its initial state
function flipBack(card) {
    const cardImg = card.querySelector("img");
    cardImg.src = backImgSrc;
    card.classList.remove("flipped");
    console.log(`Card flipped back: ${card.id}`);
}

// Update accuracy based on the number of matched cards and total flips
function updateAccuracy() {
    if (totalFlips === 0) {
        accuracy = 100; // If no flips, assume 100% accuracy
    } else {
        accuracy = Math.round((matchedCards / (totalFlips / 2)) * 100);
    }


    const accuracyDisplay = getElement("#correct");
    if (accuracyDisplay) accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;
    console.log(`Updated accuracy: ${accuracy}%`);
}

// End the game when all cards are matched
function endGame() {

    // Update high score if the current accuracy is higher
    if (accuracy > highScore) {
        highScore = accuracy;
        localStorage.setItem("high_score", highScore);
        alert(`Congratulation! You set a New High score. Your accuracy is ${accuracy}%!`);
        console.log("New high score achieved:", highScore);
    }
    else {

        alert(`Game End! Your accuracy is ${accuracy}%!`);
        console.log("Game end. Final accuracy:", accuracy);
    }
    


    // Reset the game state
    matchedCards = 0;
    totalFlips = 0;
    flippedCards = [];
    accuracy = 0;
    
     loadPlayerInfo(); // Update player info with new high score

    // Re-render the game board with fresh cards
    renderGameBoard();
    cardClickListeners(); // Re-attach the click event listeners

}

// Switch between tabs
function tabClickListeners() {
    getElement("#tabs_cards_link").addEventListener("click", () => switchTab("cards"));
    getElement("#tabs_rules_link").addEventListener("click", () => switchTab("rules"));
    getElement("#tabs_settings_link").addEventListener("click", () => switchTab("settings"));
    console.log("Tab click listeners added.");
}

// Switch between tabs and display the content
function switchTab(tabName) {
    const tabs = document.querySelectorAll(".tabcontent");
    tabs.forEach(tab => tab.classList.add("hide"));

    const tabLinks = document.querySelectorAll(".tablinks");
    tabLinks.forEach(tabLink => tabLink.classList.remove("active"));

    getElement(`#tabs_${tabName}`).classList.remove("hide");
    getElement(`#tabs_${tabName}_link`).classList.add("active");
    console.log(`Switched to tab: ${tabName}`);
}

// Save settings (player name and number of cards) to localStorage
function saveSettingsListener() {
    getElement("#save_settings").addEventListener("click", () => {
        const playerNameInput = getElement("#player_name").value;
        const numCardsInput = parseInt(getElement("#num_cards").value, 10);

        console.log(`Saving settings: Player Name: ${playerNameInput}, Number of Cards: ${numCardsInput}`);

        localStorage.setItem("player_name", playerNameInput);
        localStorage.setItem("num_cards", numCardsInput);

        // Reload the game board with new settings
        numCards = numCardsInput;
        renderGameBoard();

        // Re-attach click listeners to the new cards
        cardClickListeners();

        // Refresh player info
        loadPlayerInfo();

        // Navigate to the home page by switching tabs
        switchTab("cards");

        alert("Settings saved successfully!");
        location.reload();
    });
}

// Add event listener to reset button
function resetSettingsListener() {
  getElement("#reset_settings").addEventListener("click", () => {
    console.log("Reset settings button clicked");

    if (confirm("Are you sure you want to reset all settings? This will clear high scores and player info.")) {
      localStorage.clear();

      playerName = "Guest";
      highScore = 0;
      accuracy = 0;
      numCards = 48;

      loadPlayerInfo();
      renderGameBoard();
      cardClickListeners();

      alert("All settings have been reset!");
    }
  });
}

// Load settings from localStorage
function loadSettings() {
    numCards = parseInt(localStorage.getItem("num_cards") || 48, 10);
    console.log(`Loaded settings: Number of cards: ${numCards}`);
    renderGameBoard(); // Render the board with loaded settings
}

// Start a new game
function newGameListener() {
    getElement("#new_game").addEventListener("click", () => {

        if (confirm("Are you sure you want to start a New Game? You will lose all your progress.")) {
        matchedCards = 0;
        totalFlips = 0;
        flippedCards = [];
        accuracy = 0;

        console.log("Starting new game...");
        renderGameBoard(); // Render the game board from scratch
        cardClickListeners(); // Re-attach click listeners to cards
        loadPlayerInfo(); // Refresh player info
        }
    });
}

