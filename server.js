const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const app = express();
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
  db.run('PRAGMA foreign_keys = ON');

  await db.run("DROP TABLE IF EXISTS user");
  await db.run("DROP TABLE IF EXISTS user_address");  
  await db.run("DROP TABLE IF EXISTS user_auth");
  await db.run("DROP TABLE IF EXISTS truck");
 
  await db.run("CREATE TABLE user (user_id INTEGER PRIMARY KEY, first_name TEXT NOT NULL, last_name TEXT NOT NULL, user_email TEXT NOT NULL UNIQUE, sin_number INTEGER NOT NULL UNIQUE, license_number TEXT NOT NULL UNIQUE, home_phone INTEGER NOT NULL UNIQUE, cell_phone INTEGER NOT NULL UNIQUE, status TEXT NOT NULL)");
  await db.run("CREATE TABLE user_address (address_id INTEGER PRIMARY KEY, street_number INTEGER NOT NULL, street_name TEXT NOT NULL, city TEXT NOT NULL, province TEXT NOT NULL, postal_code TEXT NOT NULL, country TEXT NOT NULL, user_id INTEGER NOT NULL, FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE)");
  await db.run("CREATE TABLE user_auth (auth_id INTEGER PRIMARY KEY, username TEXT NOT NULL UNIQUE, hash_pwd TEXT NOT NULL, type TEXT NOT NULL)");
  await db.run("CREATE TABLE truck (truck_id INTEGER PRIMARY KEY, truck_no INTEGER NOT NULL UNIQUE, truck_make TEXT NOT NULL, truck_model TEXT NOT NULL, truck_year INTEGER NOT NULL, truck_plate_no TEXT NOT NULL UNIQUE, truck_type TEXT NOT NULL, truck_status TEXT NOT NULL, user_id INTEGER, FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE)");

  await db.run("INSERT INTO user (user_id, first_name, last_name, user_email, sin_number, license_number, home_phone, cell_phone, status) VALUES (null, 'Nenad', 'Skocic', 'nenad@jsdtransportation.ca', 111111, 'S4913-47535-73581', 9055782526, 3654764643, 'Active')");
  await db.run("INSERT INTO user_address (street_number, street_name, city, province, postal_code, country, user_id) VALUES (78, 'Sunrise Dr', 'Hamilton', 'ON', 'L8K 4C3', 'Canada', 1)");
  await db.run("INSERT INTO truck (truck_id, truck_no, truck_make, truck_model, truck_year, truck_plate_no, truck_type, truck_status, user_id) VALUES (null, 101, 'Volvo', 'T680', 2017, '409-4PL', 'Semi-trailer', 'Active', 1)");
  //await db.run("INSERT INTO user (user_id, first_name, last_name, user_email, sin_number, license_number, home_phone, cell_phone, status) VALUES (null, 'T', 'T', 'T@jsdtransportation.ca', 343434, 'S4913-47535-73781', 9055784526, 3658764643, 'Active')");
  //await db.run("INSERT INTO user_address (street_number, street_name, city, province, postal_code, country, user_id) VALUES (78, 'Sunrise Dr', 'Hamilton', 'ON', 'L8K 4C3', 'Canada', 2)");
  register_user();

  const server = app.listen(3000, function(){
    console.log("Server listening on port 3000!")
  });
}
startup();

async function register_user() {
  try {
    const hash = await bcrypt.hash(pass, saltRounds);
    await db.run("INSERT INTO user_auth (auth_id, username, hash_pwd, type) VALUES (?, '" + admin_username + "', '" + hash + "', 'admin')");
  } catch(e) {
    console.log(e)
  }
}

// API - User Authentication
app.get("/auth", async function(req, res) {
    const data = await db.all("SELECT auth_id as id, * FROM user_auth");
    res.send(data);
});
app.get("/userAuth/:id", async function(req, res) {
    const auth_id = req.params.id;
    const stmt = "SELECT * FROM user_auth WHERE auth_id=?";
    const data = await db.all(stmt, [auth_id]);
    res.send(data);
});
app.put("/auth/:id", async function(req, res)
{
  const auth_id = req.params.id;
  const username = req.body.username;
  const type = req.body.type;
  const stmt = await db.prepare("UPDATE user_auth SET username=?, type=? WHERE auth_id=?");
  stmt.run(username, type, auth_id);
  stmt.finalize();
  res.send(stmt);
});
app.delete("/auth/:id", async function(req, res)
{
  const auth_id = req.params.id;
  const stmt = await db.prepare("DELETE FROM user_auth WHERE auth_id=?");
  stmt.run(auth_id);
  stmt.finalize();
  res.send(stmt);  
});

// API - Driver_Info (JOIN)
app.get("/driver", async function(req, res) {
  const data = await db.all("SELECT * FROM user INNER JOIN user_address ON user.user_id = user_address.user_id");
  res.send(data);
});
app.get("/driver/:id", async function(req, res)
{
  const user_id = req.params.id;
  const stmt = "SELECT * FROM user INNER JOIN user_address ON user.user_id = user_address.user_id WHERE user.user_id=?";
  const data = await db.all(stmt, [user_id]);
  res.send(data);
});
app.delete("/driver/:id", async function(req, res)
{
  const user_id = req.params.id;
  const stmt = await db.prepare("DELETE FROM user WHERE user_id=?");
  stmt.run(user_id);
  stmt.finalize();
  res.send(stmt);  
});
app.put("/driver/:id", async function(req, res)
{
  const user_id = req.params.id;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const user_email = req.body.user_email;
  const sin_number = req.body.sin_number;
  const license_number = req.body.license_number;
  const home_phone = req.body.home_phone;
  const cell_phone = req.body.cell_phone;
  const status = req.body.status;

  const stmt = await db.prepare("UPDATE user SET first_name=?, last_name=?, user_email=?, sin_number=?, license_number=?, home_phone=?, cell_phone=?, status=? WHERE user_id=?");
  stmt.run(first_name, last_name, user_email, sin_number, license_number, home_phone, cell_phone, status, user_id);
  stmt.finalize();
  res.send(stmt);
});

// API - Truck
app.get("/truck", async function(req, res) {
  const data = await db.all("SELECT truck_id as id, * FROM truck");
  res.send(data);
});
app.get("/truck/:id", async function(req, res) {
  const truck_id = req.params.id;
  const stmt = "SELECT * FROM truck WHERE truck_id=?";
  const data = await db.all(stmt, [truck_id]);
  res.send(data);
});
app.delete("/truck/:id", async function(req, res)
{
  const truck_id = req.params.id;
  const stmt = await db.prepare("DELETE FROM truck WHERE truck_id=?");
  stmt.run(truck_id);
  stmt.finalize();
  res.send(stmt);  
});
app.put("/truck/:id", async function(req, res)
{
  const truck_id = req.params.id;
  const truck_no = req.body.truck_no;
  const truck_make = req.body.truck_make;
  const truck_model= req.body.truck_model;
  const truck_year = req.body.truck_year;
  const truck_plate_no = req.body.truck_plate_no;
  const truck_type = req.body.truck_type;
  const truck_status = req.body.truck_status;
  const user_id = req.body.user_id;

  console.log(truck_id, truck_no, truck_make, truck_model, truck_year, truck_plate_no, truck_type, truck_status, user_id );

  const stmt = await db.prepare("UPDATE truck SET truck_make=?, truck_model=?, truck_year=?, truck_plate_no=?, truck_type=?, truck_status=? WHERE truck_id=?");
  stmt.run(truck_make, truck_model, truck_year, truck_plate_no, truck_type, truck_status, truck_id);
  stmt.finalize();
  res.send(stmt);
});
app.post("/truck", async function(req, res)
{
  const truck_no = req.body.truck_no;
  const truck_make = req.body.truck_make;
  const truck_model= req.body.truck_model;
  const truck_year = req.body.truck_year;
  const truck_plate_no = req.body.truck_plate_no;
  const truck_type = req.body.truck_type;
  const truck_status = req.body.truck_status;

  const truck = await db.all("SELECT * FROM truck WHERE truck_no = '" + truck_no + "' OR truck_plate_no = '" + truck_plate_no + "'");

  if(truck.length > 0) {
    res.status(200).json("Duplicate");
  } else {
    const stmt = await db.prepare("INSERT INTO truck VALUES (?,?,?,?,?,?,?,?,?)");
    stmt.run(null, truck_no, truck_make, truck_model, truck_year, truck_plate_no, truck_type, truck_status, null);
    stmt.finalize();
    res.json( { truck: { truck_no: truck_no, truck_make: truck_make, truck_model: truck_model, truck_year: truck_year, truck_plate_no: truck_plate_no, truck_type: truck_type, truck_status: truck_status } });
  }
});

// User registration
app.post("/register", async function(req, res) {
    const username = req.body.username;
    const password = bcrypt.hashSync(req.body.password, saltRounds);
    const type = "general";

    const user = await db.all("SELECT * FROM user_auth WHERE username = '" + username + "'");

    if(user.length > 0) {
        res.status(200).json("Duplicate");
    } else {
        const stmt = await db.prepare("INSERT INTO user_auth VALUES (?,?,?,?)");
        stmt.run(null, username, password, type);
        stmt.finalize();
        res.json( { auth: true, user: { username: username, password: password, type: type } });
    }
})

// Login
app.post('/login', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await db.all("SELECT * FROM user_auth WHERE username='" + username + "'");

    if(user) {
      let pass = "";

      for(i in user) {
        pass = user[i].hash_pwd;
      }
      const validPassword = bcrypt.compareSync(password, pass);

      if(validPassword) {
        res.status(200).send({ auth: true, user: user });
      } else {
        res.status(200).json("Invalid");
      }
    } else {
      res.status(404).json("No account with the provided username exists.")
    }
  } catch (error) {
    console.log(error);
  }
});



