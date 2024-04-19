//import express, express router as shown in lecture code
import express from "express";
import session from "express-session";
import helper from "../helpers.js";
import {registerUser, loginUser} from "../data/users.js";

const router = express.Router();

router.route('/').get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({error: 'YOU SHOULD NOT BE HERE!'});
});

router
  .route('/register')
  .get(async (req, res) => {
    //code here for GET
    return res.status(200).render("register");
  })
  .post(async (req, res) => {
    //code here for POST
    try {
      req.body.firstName = helper.checkString("First Name", req.body.firstName, true, 2, 25);
      req.body.lastName = helper.checkString("Last Name", req.body.lastName, true, 2, 25);
      req.body.username = helper.checkString("Username", req.body.username.toLowerCase(), true, 5, 10);
      req.body.password = helper.checkString("Password", req.body.password, false, 8);
      helper.checkPassword(req.body.password);
      req.body.favoriteQuote = helper.checkString("Favorite Quote", req.body.favoriteQuote, true, 20, 255);
      req.body.themePreference = helper.validValues("Theme Preference", req.body.themePreference.toLowerCase(), "light", "dark");
      req.body.role = helper.validValues("Role", req.body.role.toLowerCase(), "admin", "user");
    } catch (e) {
      return res.status(400).render("error", {error: e});
    }
    try {
      const {signupCompleted} = await registerUser(req.body.firstName, req.body.lastName, req.body.username, req.body.password, 
        req.body.favoriteQuote, req.body.themePreference, req.body.role);
      if(signupCompleted) {
        //true
        return res.status(200).redirect("/login");
      }
      else {
        //DB server is down, or some other internal server error
        return res.status(500).send("Internal Server Error");
      }
    } catch (error) {
      return res.status(400).render("error", {error: e});
    }
  });

router
  .route('/login')
  .get(async (req, res) => {
    //code here for GET
    return res.status(200).render("login");
  })
  .post(async (req, res) => {
    //code here for POST
    try {
      req.body.username = helper.checkString("Username", req.body.username.toLowerCase(), true, 5, 10);
      req.body.password = helper.checkString("Password", req.body.password, false, 8);
      helper.checkPassword(req.body.password);
    } catch (e) {
      return res.status(400).render("error", {error: e});
    }
    try {
      const user = await loginUser(req.body.username, req.body.password);

      req.session.user = { firstName: user.firstName, lastName: user.lastName, username: user.username, 
        favoriteQuote: user.favoriteQuote, themePreference: user.themePreference, role: user.role };
        
      if(user.role === "admin") {
        return res.status(200).redirect("/admin");
      }
      else {
        return res.status(200).redirect("/user");
      }
    } catch (e) {
      return res.status(400).render("error", {error: e});
    }
  });

router.route('/user').get(async (req, res) => {
  //code here for GET
  return res.status(200).render("user");
});

router.route('/admin').get(async (req, res) => {
  //code here for GET
  return res.status(200).render("admin");
});

router.route('/logout').get(async (req, res) => {
  //code here for GET
});

export default router;