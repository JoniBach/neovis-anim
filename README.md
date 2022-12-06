# Welcome to NEOvis

NEOvis is one page application built in React. 

You can find a live demo here at [neovis.app](https://neovis.app/)

## Usage Guide

- Sign Up for an account
- Log In to your new account
- Enter the start and end date of the range that you want to search for 
- Note: There is a range limmit of 7 days on the API call
- Click submit
- Wait for the search results to populate in the list
- Use the pagination at the bottom to flick between pages
- Click the table headers to sort the table
- Click on a row to view the up comming and previous passes
- Click go back to return to the previous page
- Note: the URL contains the search paramiters you entered. You can use this link to regenerate the same search (or share with someone else to do the same)
## Setup Guide

- clone the repo
- navigate to the project root directory
- create a `.env` file in the root directory
- either: accuire its contents from the author
- or: register your own credentials following the guide below
- install packages by running `npm i`
- start a local development server with `npm start`
- navigate to [localhost:3000](http://localhost:3000/)

## Register your own credentials

This app uses `firebase auth` to handle the login flow and `Nasa NeoWs Api` for content

- Create an API key for [nasa NeoWs API](https://api.nasa.gov/) 
- Assign to `REACT_APP_NASA_API_KEY` variable in the `.env` file
- Create a [firebase project](https://cloud.google.com/firestore/docs/client/get-firebase)
- Register an app and assign the remaining variables to the `.env` file
- Enable [firebase auth](https://firebase.google.com/docs/auth) in the project console

##  Understanding the component tree

Start
 - index -> App -> EntryPoint -> CustomRouter (unnecessarily nested)

Root
- LandingAnimated `/` (an animated welcome page)

Unprotected Routes
- Signin `/signin`
- Signup `/signup`
- PasswordReset `/reset-password`
- DeleteUser `/delete-account`

Protected Routes
- Dash `/dash` (fetch and get a list of all NEOs based on a date input)
- Neo `/neo` (displau recent 5 and previous 5 encounters with a NEO given an ID )

