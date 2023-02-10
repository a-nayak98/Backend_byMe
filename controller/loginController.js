var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var fileSystem = require("fs");
var path = require("path");

//? Sectret key for making a token
var secrteKey = "abhishekPassword1234567890!";

//? path to data base
var dbPath = path.join(__dirname, "../", "users.json");

function login(req, res) {
  var loggingUser = req.body;
  //1) reading the file from database
  fileSystem.readFile(dbPath, { encoding: "utf-8" }, function (err, users) {
    if (err) {
      return res.status(500).send("Server Error");
    }
    //1.1) We got the usersJSON now it will be parsed to perform jsFunctionality
    var usersJsArr = JSON.parse(users);
    //1.2) get the current user in db, who is going to login
    var foundUser = usersJsArr.find((user) => {
      if (user.email === loggingUser.email) {
        return user;
      }
    });
    console.log(foundUser);
    //1.3) If the user is not found
    if (foundUser === undefined) {
      return res.status(200).send("Randi Randi Kurchandi... in my database.");
    }
    //2.*) we found the user so now we have to check that the user is already exist in our db
    // if (loggingUser.email === foundUser.email) {
    //   return res.status(200).send("You are already logged in.");
    // }
    //2). so we have to check the password is correct or not(compare password with hashedPassword)
    bcrypt
      .compare(req.body.password, foundUser.password)
      .then(function (isCorrect) {
        if (isCorrect === true) {
          //3.1) if password is correct then we have to assign a new token to the user
          // we have to make a new token
          jwt.sign(
            { payload: foundUser.id },
            secrteKey,
            { expiresIn: 60 * 60 * 1 },
            function (err, token) {
              if (err) return res.status(500).send("Server Error ....na");
              // token made , the assign token
              foundUser.token = token;
              // converting the jsArray to JSON again
              var usersJSON = JSON.stringify(usersJsArr);
              // Then we have to send the user to the database
              fileSystem.writeFile(dbPath, usersJSON, function (err) {
                if (err) return res.status(500).send("Server Error");
                else
                  return res
                    .status(201)
                    .send({ statusCode: 200, token: token, message: "token ta tiari hela he" });
              });
            }
          );
        } else return res.status(401).send("Password ta bhul daucha he...");
      })
      .catch(function (err) {
        return res.status(500).send("Servernaa err dauchanti he...");
      });
  });
  // res.status(200).send("Hnn login route hit hauchi");
}

module.exports = login;
