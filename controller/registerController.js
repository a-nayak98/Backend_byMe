/**
 * Before Save the user data to db the steps taken care of
 * Hassing password with Bcryptjs
 * Generate unique id
 * A token has to generate to deside a user has been loggedin or not
 *
 */
var bcrypt = require("bcryptjs");
var { v4: uid } = require("uuid");
var jwt = require("jsonwebtoken");
var fileSystem = require("fs");
var path = require("path");

var secrteKey = "abhishekPassword1234567890!";
//making the path
var dbPath = path.join(__dirname, "../", "users.json");

function register(req, res) {
  var newUser = req.body;
  console.log(newUser, "line-1");
  bcrypt
    .hash(newUser.password, 10)
    .then(function (hassedPassword) {
      var uniqueId = uid();
      jwt.sign(
        { payloadId: uniqueId },
        secrteKey,
        { expiresIn: 60 * 60 * 1 },
        function (err, token) {
          if (err) {
            console.log(err);
            return res.status(500).send("Server Error");
          }
          // So we got the token we have to pass the token with the user detais to the database
          //1).Save the user in db
          fileSystem.readFile(
            dbPath,
            { encoding: "utf-8" },
            function (err, users) {
              if (err) {
                console.log(err.message);
                res.status(500).send("Server Error.. hela....");
              }
              console.log(users, "l-16");
              //? Parse the users json array to javaScript array
              var usersJavascript = JSON.parse(users);
              // store the newUser to a new object, then push the new object inside the parse array
              var newObj = {
                id: uniqueId,
                name: newUser.name,
                email: newUser.email,
                password: hassedPassword,
                token: token,
              };

              //? Push the data to the parsed array "userJavascript"
              usersJavascript.push(newObj);
              console.log(usersJavascript);
              //? Again converting the array to json
              var dataAsJSON = JSON.stringify(usersJavascript);
              console.log(dataAsJSON, "l-25");
              //* insert the JSON to the database
              fileSystem.writeFile(dbPath, dataAsJSON, function (err) {
                if (err) {
                  console.log(err.message);
                  res.status(500).send("Server Error.. hela....");
                }
                //* Send the responce with the token or any thing
                else return res.status(201).send({"Data save on database with token.":token})
              });
            }
          );
        }
      );
    })
    .catch(function (err) {
      if (err) return res.status(500).send("Lokaku dhaaa...");
    });
}

module.exports = register;
