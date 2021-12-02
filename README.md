# wen2eat

Fall 2021 CS 35L Final Project by Cameron Fiske, Ray Hsiao, Eric Ma, Edmond Wen, Jess Xu

Our app mitigates risk of household food waste by maintaining a list of a user’s ingredients and their expiration dates. Based on that information, the app will customize a list of recommended recipes for the user.

## Features

### Display dynamic data
Our **website shows a list of ingredients** that the user has on hand **and their respective expiration dates**. The **user can modify this list**, which will update both the database and the frontend.

### Upload persistant data to backend
When a **user modifies their list of on-hand ingredients, that information is updated in our database**. This information will also be **associated with a specific user**.

### Search through data
**Allow users to input dietary restrictions to filter recipe recommendations.**

### Unique Features
1. Users can log in to keep track of their pantry.
2. Compares recipes to available ingredients to find ideal recipe ideas for food that is on hand. Results will be filtered based on dietary restrictions.
3. Users can select favorite recipes that they can view at any time.

## Setup

1. Clone the repo `git clone https://github.com/edmondywen/wen2eat.git`
2. Change directory `cd wen2eat`
3. Install packages `npm install`
4. Start the development server `npm start`

## Using the app
* Login on the login page the "Login" button directs you to with your wen2eat account to save your information
* If you don't already have a wen2eat account, you can create a one after clicking "Create a new account" on the login page
* Add ingredients and their associated expiration dates to your pantry with the submit box.
* Toggle between your Pantry and Dietary Restrictions with the "Flip to Pantry/Dietary Restrictions" button.
* If applicable, select a diet you want to adhere to and/or any food intolerances.
* Click the "Get Recepies 🥧" button to generate recipes based on your Pantry and Dietary Restrictions.
* Click the star on any recipe cards you want to favorite -- they will be displayed when you click "Show favorites ★".

We hope you enjoy using our app to help you figure out what to make and wen2eat it!
