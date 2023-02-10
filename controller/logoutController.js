var fileSystem = require("fs");
var path = require("path");
var jwt = require("jsonwebtoken");

// Secret key for password checking
var secrteKey = "abhishekPassword1234567890!";

//path to database
var pathToDB = path.join(__dirname, "../", "users.json");

function logout(req, res) {
  var authToken = req.header("Authorization");
  console.log(authToken);
  if (authToken) {
    // Get the user having the authToken
    fileSystem.readFile(pathToDB, { encoding: "utf-8" }, function (err, users) {
      if (err) {
        console.log(err.message);
        return res.status(500).send("Server Error");
      }
      //* we got users JSON array now we have to parse it to javaScript
      var userJSArr = JSON.parse(users);
      //* we have to found the user now
      var user = userJSArr.find((userInArr) => {
        return userInArr.token === authToken;
      });
      //* if we dont find the user
      if (user === undefined) {
        return res.status(400).send("Token ta Bhul achi lo!!! User Nai..para");
      } else {
        //* we have to check the password
        jwt.verify(user.token, secrteKey, function (err, payload) {
          if (err) return res.status(500).send("Server Error");
          else {
            var foundIndex = userJSArr.findIndex((userInsideArr) => {
              return payload === userInsideArr.id;
            });
            user.token = null;
            //* now replace the user with ,key token = null
            var objToStore = { ...user };
            userJSArr[foundIndex] = objToStore;
            //* Again stringfy the array to JSON
            var usersJSON = JSON.stringify(userJSArr);
            fileSystem.writeFile(pathToDB, usersJSON, function (err) {
              if (err) return req.status(500).send("Server Error");
              else
                return res
                  .status(200)
                  .send("Ja sala Logut Heigala, Gai ra pagha chindila...");
            });
          }
        });
      }
    });
  }
}

module.exports = logout;
