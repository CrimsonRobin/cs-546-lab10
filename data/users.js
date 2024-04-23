//import mongo collections, bcrypt and implement the following data functions
import helper from "../helpers.js";
import bcrypt from "bcrypt";
import {users} from "../config/mongoCollections.js"

export const registerUser = async (
  firstName,
  lastName,
  username,
  password,
  favoriteQuote,
  themePreference,
  role
) => {
  firstName = helper.checkString("First Name", firstName, true, 2, 25);
  lastName = helper.checkString("Last Name", lastName, true, 2, 25);
  username = helper.checkString("Username", username.toLowerCase(), true, 5, 10);
  password = helper.checkString("Password", password, false, 8);
  helper.checkPassword(password);
  favoriteQuote = helper.checkString("Favorite Quote", favoriteQuote, false, 20, 255);
  themePreference = helper.validValues("Theme Preference", themePreference.toLowerCase(), "light", "dark");
  role = helper.validValues("Role", role.toLowerCase(), "admin", "user");

  const hash = await bcrypt.hash(password, 12);

  let NewUser = {
    firstName: firstName,
    lastName: lastName,
    username: username,
    password: hash,
    favoriteQuote: favoriteQuote,
    themePreference: themePreference,
    role: role
  };

  const userCollection = await users();

  if(await userCollection.findOne({username: username}) !== null) {
    throw new Error(`There is already a user with that username.`);
  } //check if username is in the database

  const info = await userCollection.insertOne(NewUser);
  if (!info.acknowledged || !info.insertedId) {
    throw new Error("Could not add user.");
  }

  return {signupCompleted: true};

};

export const loginUser = async (username, password) => {
  username = helper.checkString("Username", username.toLowerCase(), true, 5, 10);
  password = helper.checkString("Password", password, false, 8);
  helper.checkPassword(password);

  const userCollection = await users();

  const user = await userCollection.findOne({username: username});
  if(user === null) {
    throw new Error(`Either the username or password is invalid`);
  } //check if username is in the database

  const match = await bcrypt.compare(password, user.password);

    if(!match) {
        throw new Error(`Either the username or password is invalid`);
    }

    return {firstName: user.firstName, lastName: user.lastName, username: user.username, favoriteQuote: user.favoriteQuote, 
      themePreference: user.themePreference, role: user.role};
};
