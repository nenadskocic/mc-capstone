const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const app = express();
// const DB = require('./db');
// const db = new DB("jsd.db");
const router = express.Router();

const admin_username = "nenad.skocic";
const pass = "Admin123!";
const saltRounds = 10;

var corsOptions = {
  origin: "http://localhost:8080",
  credentials: true,
  optionSuccessStatus: 200
};

app.use(router);

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function startup()
{
  db = await sqlite.open({
    filename: 'jsd.db',
    driver: sqlite3.Database
  });

  await db.run("DROP TABLE IF EXISTS role"); 
  await db.run("DROP TABLE IF EXISTS user_address");  
  await db.run("DROP TABLE IF EXISTS user");
  await db.run("DROP TABLE IF EXISTS user_auth");
  await db.run("DROP TABLE IF EXISTS user_role");
  await db.run("DROP TABLE IF EXISTS user_status"); 

  await db.run("CREATE TABLE role (role_id INTEGER NOT NULL UNIQUE, role_name TEXT NULL, PRIMARY KEY (role_id AUTOINCREMENT));");
  await db.run("CREATE TABLE user_address (address_id INTEGER NOT NULL UNIQUE, street_number INTEGER NOT NULL, street_name TEXT NOT NULL, city TEXT NOT NULL, province TEXT NOT NULL, postal_code TEXT NOT NULL, country TEXT NOT NULL, PRIMARY KEY (address_id AUTOINCREMENT))");
  await db.run("CREATE TABLE user (user_id INTEGER NOT NULL UNIQUE, first_name TEXT NOT NULL, last_name TEXT NOT NULL, user_email TEXT NOT NULL UNIQUE, sin_number INTEGER NOT NULL UNIQUE, license_number TEXT NOT NULL UNIQUE, home_phone INTEGER NOT NULL UNIQUE, cell_phone INTEGER NOT NULL UNIQUE, address_id INTEGER NOT NULL, PRIMARY KEY (user_id AUTOINCREMENT), FOREIGN KEY (address_id) REFERENCES user_address (address_id))");
  await db.run("CREATE TABLE user_auth (auth_id INTEGER NOT NULL UNIQUE, username TEXT NOT NULL UNIQUE, hash_pwd TEXT NOT NULL, type TEXT NOT NULL, user_id INTEGER NOT NULL, PRIMARY KEY (auth_id AUTOINCREMENT), FOREIGN KEY (user_id) REFERENCES user (user_id))");
  await db.run("CREATE TABLE user_role (user_role_id INTEGER NOT NULL UNIQUE, user_id INTEGER NOT NULL, role_id INTEGER NOT NULL, PRIMARY KEY (user_role_id AUTOINCREMENT), FOREIGN KEY (user_id) REFERENCES user (user_id), FOREIGN KEY (role_id) REFERENCES role (role_id))");
  await db.run("CREATE TABLE user_status (status_id INTEGER NOT NULL UNIQUE, status TEXT NOT NULL, status_description TEXT NOT NULL, user_id INTEGER NOT NULL, PRIMARY KEY (status_id AUTOINCREMENT), FOREIGN KEY (user_id) REFERENCES user (user_id))");

  await db.run("INSERT INTO user (first_name, last_name, user_email, sin_number, license_number, home_phone, cell_phone, address_id) VALUES ('nenad', 'skocic', 'nenad@jsdtransportation.ca', 111111, 'S4913-47535-73581', 9055782526, 3654764643, 1)");
  await db.run("INSERT INTO user_address (street_number, street_name, city, province, postal_code, country) VALUES (78, 'Sunrise Dr', 'Hamilton', 'ON', 'L8K 4C3', 'Canada')");
 
  register_user();

  const server = app.listen(3000, function(){
    console.log("Server listening on port 3000!")
  });
}
startup();

async function register_user() {
  try {
    const hash = await bcrypt.hash(pass, saltRounds);
    await db.run("INSERT INTO user_auth (username, hash_pwd, type, user_id) VALUES ('" + admin_username + "', '" + hash + "', 'admin', 1)");
  } catch(e) {
    console.log(e)
  }
}

// API
app.get("/userAuth", async function(req, res) {
    const data = await db.all("SELECT auth_id as id, * FROM user_auth");
    res.send(data);
});


app.post('/login', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await db.all("SELECT * FROM user_auth WHERE username = '" + username + "'");

    if(user) {
      let pass = "";

      for(i in user) {
        pass = user[i].hash_pwd;
      }
      const validPassword = bcrypt.compareSync(password, pass);

      if(validPassword) {
        console.log("Valid credentials.");
        res.status(200).send({ auth: true, user: user });
      } else {
        console.log("Invalid credentials!");
        res.status(200).json("Invalid");
      }
    } else {
      res.status(404).json("No account with the provided username exists.")
    }
  } catch (error) {
    console.log(error);
  }
});



