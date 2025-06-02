
# Memory Game

A Memory Matching Game designed with HTML, CSS, and JavaScript. This interactive game challenges players to match pairs of cards by flipping them. It’s simple, engaging, and perfect for casual gamers and memory training.

![Initial game](https://github.com/user-attachments/assets/059d5d0e-1996-4c4c-bc8e-b1f43c3165ad)

*Figure 1: Initial game setup with cards face down*

![Matching cards](https://github.com/user-attachments/assets/6b9cf8f8-bd02-4431-a30c-0f07b331a6a5)

*Figure 2: Matching cards and scoring system in action*

---

## Table of Contents

1. [Introduction](#introduction)  
2. [Features](#features)  
3. [Setup Instructions](#setup-instructions)  
4. [How to Run the Project](#how-to-run-the-project)  
5. [Project Dependencies](#project-dependencies)  
6. [Project Structure](#project-structure)  
7. [Detailed Feature Description](#detailed-feature-description)  
8. [Known Issues and Limitations](#known-issues-and-limitations)  
9. [Future Enhancements](#future-enhancements)  
10. [Testing](#testing)  
11. [Contact and Contributions](#contact-and-contributions)

---

## Introduction

The Memory Game is a browser-based card-matching game where players flip cards to find pairs. It tracks player performance, saves high scores, and allows customization.

---

## Features

- **Dynamic Gameplay**: Flip cards to match pairs with animation.
- **Scoring System**: Tracks attempts and calculates accuracy.
- **Custom Settings**: Choose player name and number of cards.
- **Persistent Storage**: Saves scores and settings via localStorage.
- **Intuitive UI**: Tabs for gameplay, rules, and settings.
- **Reset Feature**: Start fresh with the “Reset Settings” button.

---

## Setup Instructions

### 1. Prerequisites

- A modern web browser (e.g., Chrome, Firefox, Edge)
- A code editor (optional, e.g., VS Code)

### 2. Download & Extract

- Download the project as a ZIP from [OneDrive Link](https://1drv.ms/u/s!AnovKndmfXOpgfY_0Fq4MMHH5Ldk7g?e=ddw0Wv)
- Extract it to your chosen directory

---

## How to Run the Project

- Open the extracted folder
- Double-click `index.html` to launch the game

### How to Play

1. Click “New Game” to shuffle cards  
2. Click two cards to find a match  
3. All pairs matched = you win!  
4. High score is stored via localStorage

---

## Project Dependencies

- **HTML** – structure  
- **CSS** – design and animations  
- **JavaScript** – game logic  
- **LocalStorage API** – data persistence

---

## Project Structure

```plaintext
project-folder/
├── index.html
├── style.css
├── main.js
├── images/
│   └── [card images here]
└── README.md
```

## Key Functions

- `loadPlayerInfo()` – Loads the player's name and preferences from local storage.  
- `renderGameBoard()` – Renders the game board with shuffled cards.  
- `flipCard()` – Flips the card to show its face image.  
- `checkForMatch()` – Checks if two flipped cards match.  
- `updateAccuracy()` – Updates the accuracy percentage based on matches.  
- `endGame()` – Ends the game and resets for a new session.  

---

## Detailed Feature Description

### 1. Dynamic Game Board
- Cards are displayed face-down at the start.  
- Clicking a card flips it to reveal the content.  
- Players match pairs by flipping two cards consecutively.  

### 2. Scoring and Statistics
- **Accuracy**: Displays match accuracy percentage.  
- **High Score**: Best score is saved using localStorage.  

### 3. Game Tabs
- **Game Board**: Main area to play the game.  
- **Rules Tab**: Provides instructions on how to play.  
- **Settings Tab**: Lets players customize their experience.  
- **New Game**: Starts a new game.  

### 4. Customization
- Players can set their name.  
- Adjust difficulty by selecting the number of cards.  

### 5. Reset Settings
- Clears all saved preferences and high scores.  

---

## Known Issues and Limitations

1. **Mobile Responsiveness**  
   - The game is optimized for desktop browsers.  
   - Mobile layout may require adjustments.  

2. **Static Images**  
   - The game relies on static images for cards.  
   - Missing or improperly linked images can cause errors.  

3. **Browser-Specific Behavior**  
   - `localStorage` behavior may vary between browsers, especially in private/incognito mode.  

---

## Future Enhancements

1. **Mobile Optimization**  
   - Improve responsiveness for mobile and tablet devices.  

2. **Multiplayer Mode**  
   - Add support for two-player turn-based gameplay.  

3. **Online Leaderboard**  
   - Enable global score comparison.  

4. **Accessibility Features**  
   - Add keyboard navigation.  
   - Support screen readers.  

5. **Custom Themes**  
   - Allow users to select different card designs.  

6. **Time-Based Challenges**  
   - Introduce timed modes for added difficulty.  

---

## Testing

### Methods Used

- Each function was tested independently to verify its behavior.
- End-to-end testing simulated full user interactions.

### Problems Encountered and Solutions

#### 1. Card Flip Logic Issue
- **Problem**: Non-matching cards didn’t flip back.
- **Cause**: `flipCard` didn’t reset non-matches.
- **Solution**: Added a timeout to reset flipped cards after delay.

#### 2. Accuracy Calculation Bug
- **Problem**: Accuracy percentage wasn’t updating correctly.
- **Cause**: Incorrect logic in `updateAccuracy`.
- **Solution**: Fixed the formula to count matches accurately.

#### 3. Card Clicking Bug
- **Problem**: Clicking a third card before the other two reset caused glitches.
- **Cause**: No prevention logic during match-checking.
- **Solution**: Introduced `checkingMatch` flag to block extra clicks.

### Outcome

- All functions behave as expected.
- Edge cases like fast clicking or bad input are now handled.
- The game offers smooth user experience with accurate scoring.

---

## Contact and Contributions

Have suggestions or want to contribute?

- Email: [shuvo22333595@gmail.com](mailto:shuvo22333595@gmail.com)

---


