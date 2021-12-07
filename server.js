/**
 * I, Nenad Skocic, 000107650 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgment.
 */
const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config');
const app = express();
const router = express.Router();

const admin_username = "admin.admin";
const pass = "admin";
const saltRounds = 10;

const user_username = "user.user";
const pass2 = "user";

var corsOptions = {
  origin: "http://159.65.218.19",
  credentials: true,
  optionSuccessStatus: 200
};

const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
}

app.use(allowCrossDomain);

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

  await db.run("DROP TABLE IF EXISTS orders");
  await db.run("DROP TABLE IF EXISTS user");
  await db.run("DROP TABLE IF EXISTS user_address");  
  await db.run("DROP TABLE IF EXISTS user_auth");
  await db.run("DROP TABLE IF EXISTS truck");
  await db.run("DROP TABLE IF EXISTS trailer");
  await db.run("DROP TABLE IF EXISTS client");
  await db.run("DROP TABLE IF EXISTS client_address");


  await db.run("CREATE TABLE user (user_id INTEGER PRIMARY KEY, first_name TEXT NOT NULL, last_name TEXT NOT NULL, user_email TEXT NOT NULL UNIQUE, sin_number INTEGER NOT NULL UNIQUE, license_number TEXT NOT NULL UNIQUE, home_phone INTEGER UNIQUE, cell_phone INTEGER UNIQUE, status TEXT NOT NULL)");
  await db.run("CREATE TABLE user_address (address_id INTEGER PRIMARY KEY, street_number INTEGER NOT NULL, street_name TEXT NOT NULL, city TEXT NOT NULL, province TEXT NOT NULL, postal_code TEXT NOT NULL, country TEXT NOT NULL, user_id INTEGER, FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE)");
  await db.run("CREATE TABLE user_auth (auth_id INTEGER PRIMARY KEY, username TEXT NOT NULL UNIQUE, hash_pwd TEXT NOT NULL, is_admin INTEGER NOT NULL)");
  await db.run("CREATE TABLE truck (truck_id INTEGER PRIMARY KEY, truck_no INTEGER NOT NULL UNIQUE, truck_make TEXT NOT NULL, truck_model TEXT NOT NULL, truck_year INTEGER NOT NULL, truck_plate_no TEXT NOT NULL UNIQUE, truck_type TEXT NOT NULL, truck_status TEXT NOT NULL, user_id INTEGER, FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE)");
  await db.run("CREATE TABLE trailer (trailer_id INTEGER PRIMARY KEY, trailer_no INTEGER NOT NULL UNIQUE, trailer_make TEXT NOT NULL, trailer_year INTEGER NOT NULL, trailer_type TEXT NOT NULL, trailer_plate_no TEXT NOT NULL UNIQUE, trailer_length INTEGER NOT NULL, trailer_volume INTEGER NOT NULL, ride_type TEXT NOT NULL, trailer_status TEXT NOT NULL, truck_id INTEGER, FOREIGN KEY (truck_id) REFERENCES truck (truck_id) ON DELETE CASCADE)");
  await db.run("CREATE TABLE client (client_id INTEGER PRIMARY KEY, client_name TEXT NOT NULL UNIQUE, client_phone_no INTEGER NOT NULL UNIQUE, client_type TEXT NOT NULL, client_status TEXT NOT NULL)");
  await db.run("CREATE TABLE client_address (client_address_id INTEGER PRIMARY KEY, street_number INTEGER NOT NULL, street_name TEXT NOT NULL, city TEXT NOT NULL, province TEXT NOT NULL, postal_code TEXT NOT NULL, country TEXT NOT NULL, client_id INTEGER, FOREIGN KEY (client_id) REFERENCES client (client_id) ON DELETE CASCADE)");
  await db.run("CREATE TABLE orders (order_id INTEGER PRIMARY KEY, weight INTEGER NOT NULL, skids INTEGER NOT NULL, cost INTEGER NOT NULL, pickup_date TEXT NOT NULL, delivery_date TEXT NOT NULL, status TEXT NOT NULL, client_id INTEGER, truck_id INTEGER, trailer_id INTEGER, FOREIGN KEY (client_id) REFERENCES client (client_id), FOREIGN KEY (truck_id) REFERENCES truck (truck_id), FOREIGN KEY (trailer_id) REFERENCES trailer (trailer_id) ON DELETE CASCADE)");
  
  await db.run("INSERT INTO user (user_id, first_name, last_name, user_email, sin_number, license_number, home_phone, cell_phone, status) VALUES (null, 'Nenad', 'Skocic', 'nenad@jsdtransportation.ca', 111111, 'S4913-47535-73581', 9055782526, 3654764643, 'Active')");
  await db.run("INSERT INTO user_address (street_number, street_name, city, province, postal_code, country, user_id) VALUES (78, 'Sunrise Dr', 'Hamilton', 'ON', 'L8K 4C3', 'Canada', 1)");
  // await db.run("INSERT INTO user (user_id, first_name, last_name, user_email, sin_number, license_number, home_phone, cell_phone, status) VALUES (null, 'Sinisa', 'Radisa', 'sinisa@jsdtransportation.ca', 343434, 'S4813-47535-65781', 9055784526, 365856864, 'Active')");
  // await db.run("INSERT INTO user_address (street_number, street_name, city, province, postal_code, country, user_id) VALUES (48, 'Winslow Way', 'Hamilton', 'ON', 'L8K 5R9', 'Canada', 2)");

  await db.run("INSERT INTO truck (truck_id, truck_no, truck_make, truck_model, truck_year, truck_plate_no, truck_type, truck_status, user_id) VALUES (null, 101, 'Volvo', 'T680', 2017, '409-4PL', 'Semi-trailer', 'Active', 1)");

  await db.run("INSERT INTO trailer (trailer_id, trailer_no, trailer_make, trailer_year, trailer_type, trailer_plate_no, trailer_length, trailer_volume, ride_type, trailer_status, truck_id) VALUES (null, 37995, 'Great Dane', 2015, 'Reefer', 'M6540C', 50,  3001, 'Air', 'Active', 1)");

  await db.run("INSERT INTO client (client_id, client_name, client_phone_no, client_type, client_status) VALUES (null, 'ABD GOUP', 9567171995, 'Importer', 'Active')");
  await db.run("INSERT INTO client_address (client_address_id, street_number, street_name, city, province, postal_code, country, client_id) VALUES (null, 12122, 'Jeff Drive', 'Laredo', 'TX', '78045', 'USA', 1)");
  await db.run("INSERT INTO client (client_id, client_name, client_phone_no, client_type, client_status) VALUES (null, 'Fluke', 9055780677, 'Exporter', 'Active')");
  await db.run("INSERT INTO client_address (client_address_id, street_number, street_name, city, province, postal_code, country, client_id) VALUES (null, 450, 'Sherman Ave N', 'Hamilton', 'ON', 'L8L 8J6', 'Canada', 2)");
  register_user();

  const server = app.listen(3000, function(){
    console.log("Server listening on port 3000!")
  });
}
startup();

async function register_user() {
  try {
    const hash = await bcrypt.hash(pass, saltRounds);
    const hash2 = await bcrypt.hash(pass2, saltRounds);
    await db.run("INSERT INTO user_auth (auth_id, username, hash_pwd, is_admin) VALUES (?, '" + admin_username + "', '" + hash + "', '1')");
    await db.run("INSERT INTO user_auth (auth_id, username, hash_pwd, is_admin) VALUES (?, '" + user_username + "', '" + hash2 + "', '0')");
  } catch(e) {
    console.log(e)
  }
}

/**
 * API - User Authentication
 * 
 */
app.get("/user", async function(req, res) {
    const data = await db.all("SELECT auth_id as id, * FROM user_auth");
    res.send(data);
});
app.get("/user/:id", async function(req, res) {
    const auth_id = req.params.id;
    const stmt = "SELECT * FROM user_auth WHERE auth_id=?";
    const data = await db.all(stmt, [auth_id]);
    res.send(data);
});
app.put("/user/:id", async function(req, res)
{
  const auth_id = req.params.id;
  const username = req.body.username;
  const is_admin = req.body.is_admin;

  const user_auth = await db.all("SELECT * FROM user_auth WHERE username = '" + username + "'");

  if(user_auth.length > 0) {
    res.status(200).json("Duplicate");
  } else {
    const stmt = await db.prepare("UPDATE user_auth SET username=?, is_admin=? WHERE auth_id=?");
    stmt.run(username, is_admin, auth_id);
    stmt.finalize();
    res.send(stmt);
  } 
});
app.delete("/user/:id", async function(req, res)
{
  const auth_id = req.params.id;
  const stmt = await db.prepare("DELETE FROM user_auth WHERE auth_id=?");
  stmt.run(auth_id);
  stmt.finalize();
  res.send(stmt);  
});

/**
 * API - Driver
 * 
 */
app.get("/driver", async function(req, res) {
  const data = await db.all("SELECT user_id as id, * FROM user");
  res.send(data);
});
app.post("/driver", async function(req, res)
{
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const user_email= req.body.user_email;
  const home_phone = req.body.home_phone;
  const cell_phone = req.body.cell_phone;
  const sin_number = req.body.sin_number;
  const license_number = req.body.license_number;
  const status = req.body.status;

  const driver = await db.all("SELECT * FROM user WHERE user_email = '" + user_email + "' OR home_phone = '" + home_phone + "' OR cell_phone = '" + cell_phone + "' OR sin_number = '" + sin_number + "' OR license_number = '" + license_number + "'");

  if(driver.length > 0) {
    res.status(200).json("Duplicate");
  } else {
    const stmt = await db.prepare("INSERT INTO user VALUES (?,?,?,?,?,?,?,?,?)");
    stmt.run(null, first_name, last_name, user_email, sin_number, license_number, home_phone, cell_phone, status);
    stmt.finalize();
    res.json( { driver: { first_name: first_name, last_name: last_name, user_email: user_email, home_phone: home_phone, cell_phone: cell_phone, sin_number: sin_number, license_number: license_number, status: status }});
  }
});
app.get("/driver/:id", async function(req, res) {
  const user_id = req.params.id;
  const stmt = "SELECT * FROM user WHERE user_id=?";
  const data = await db.all(stmt, [user_id]);
  res.send(data);
});
app.put("/driver/:id", async function(req, res)
{
  const user_id = req.params.id;
  const user_email = req.body[0].user_email;
  const home_phone = req.body[0].home_phone;
  const cell_phone = req.body[0].cell_phone;
  const status = req.body[0].status;
  const stmt = await db.prepare("UPDATE user SET user_email=?, home_phone=?, cell_phone=?, status=? WHERE user_id=?");
  stmt.run( user_email, home_phone, cell_phone, status, user_id);
  stmt.finalize();
  res.send(stmt);
});

/**
 * API - Driver Address
 * 
 */
app.get("/driver_address", async function(req, res) {
  const data = await db.all("SELECT address_id as id, * FROM user_address");
  res.send(data);
});
app.post("/driver_address", async function(req, res)
{
  const street_number = req.body.street_number;
  const street_name = req.body.street_name;
  const city = req.body.city;
  const province = req.body.province;
  const postal_code = req.body.postal_code;
  const country = req.body.country;

  const last_insert = await db.all("SELECT last_insert_rowid();");
  const user_id = last_insert[0]['last_insert_rowid()'];

  const stmt = await db.prepare("INSERT INTO user_address VALUES (?,?,?,?,?,?,?,?)");
  stmt.run(null, street_number, street_name, city, province, postal_code, country, user_id);
  stmt.finalize();
  res.json( { driver_address: { street_number: street_number, street_name: street_name, city: city, province: province, postal_code: postal_code, country: country, user_id: user_id}}); 
});
app.get("/driver_address/:id", async function(req, res) {
  const address_id = req.params.id;
  const stmt = "SELECT * FROM user_address WHERE address_id=?";
  const data = await db.all(stmt, [address_id]);
  res.send(data);
});
app.put("/driver_address/:id", async function(req, res)
{
  const address_id = req.params.id;
  const street_number = req.body[0].street_number;
  const street_name = req.body[0].street_name;
  const city = req.body[0].city;
  const province = req.body[0].province;
  const postal_code = req.body[0].postal_code;
  const country = req.body[0].country;

  const stmt = await db.prepare("UPDATE user_address SET street_number=?, street_name=?, city=?, province=?, postal_code=?, country=? WHERE address_id=?");
  stmt.run( street_number, street_name, city, province, postal_code, country, address_id);
  stmt.finalize();
  res.send(stmt);
});

/**
 * API - Driver_Info (User & User_Address JOIN)
 * 
 */
app.get("/driver_info", async function(req, res) {
  const data = await db.all("SELECT * FROM user INNER JOIN user_address ON user.user_id = user_address.user_id");
  res.send(data);
});
app.get("/driver_info/:id", async function(req, res)
{
  const user_id = req.params.id;
  const stmt = "SELECT * FROM user INNER JOIN user_address ON user.user_id = user_address.user_id WHERE user.user_id=?";
  const data = await db.all(stmt, [user_id]);
  res.send(data);
});
app.delete("/driver_info/:id", async function(req, res)
{
  const user_id = req.params.id;
  const stmt = await db.prepare("DELETE FROM user WHERE user_id=?");
  stmt.run(user_id);
  stmt.finalize();
  res.send(stmt);  
});

/**
 * API - Truck
 * 
 */
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
  const truck_make = req.body.truck_make;
  const truck_model= req.body.truck_model;
  const truck_year = req.body.truck_year;
  const truck_plate_no = req.body.truck_plate_no;
  const truck_type = req.body.truck_type;
  const truck_status = req.body.truck_status;

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
    res.json( { truck: { truck_no: truck_no, truck_make: truck_make, truck_model: truck_model, truck_year: truck_year, truck_plate_no: truck_plate_no, truck_type: truck_type, truck_status: truck_status }});
  }
});

/**
 * API - Trailer
 * 
 */
app.get("/trailer", async function(req, res) {
  const data = await db.all("SELECT trailer_id as id, * FROM trailer");
  res.send(data);
});
app.get("/trailer/:id", async function(req, res) {
  const trailer_id = req.params.id;
  const stmt = "SELECT * FROM trailer WHERE trailer_id=?";
  const data = await db.all(stmt, [trailer_id]);
  res.send(data);
});
app.delete("/trailer/:id", async function(req, res)
{
  const trailer_id = req.params.id;
  const stmt = await db.prepare("DELETE FROM trailer WHERE trailer_id=?");
  stmt.run(trailer_id);
  stmt.finalize();
  res.send(stmt);  
});
app.put("/trailer/:id", async function(req, res)
{
  const trailer_id = req.params.id;
  const trailer_make = req.body.trailer_make;
  const trailer_year= req.body.trailer_year;
  const trailer_length = req.body.trailer_length;
  const trailer_volume = req.body.trailer_volume;
  const ride_type = req.body.ride_type;
  const trailer_status = req.body.trailer_status

  const stmt = await db.prepare("UPDATE trailer SET trailer_make=?, trailer_year=?, trailer_length=?, trailer_volume=?, ride_type=?, trailer_status=? WHERE trailer_id=?");
  stmt.run(trailer_make, trailer_year, trailer_length, trailer_volume, ride_type, trailer_status, trailer_id);
  stmt.finalize();
  res.send(stmt);
});
app.post("/trailer", async function(req, res)
{
  const trailer_no = req.body.trailer_no;
  const trailer_make = req.body.trailer_make;
  const trailer_year = req.body.trailer_year;
  const trailer_type = req.body.trailer_type;
  const trailer_plate_no = req.body.trailer_plate_no;
  const trailer_length = req.body.trailer_length;
  const trailer_volume = req.body.trailer_volume;
  const ride_type = req.body.ride_type;
  const trailer_status = req.body.trailer_status;

  const trailer = await db.all("SELECT * FROM trailer WHERE trailer_no = '" + trailer_no + "' OR trailer_plate_no = '" + trailer_plate_no + "'");

  if(trailer.length > 0) {
    res.status(200).json("Duplicate");
  } else {
    const stmt = await db.prepare("INSERT INTO trailer VALUES (?,?,?,?,?,?,?,?,?,?,?)");
    stmt.run(null, trailer_no, trailer_make, trailer_year, trailer_type, trailer_plate_no, trailer_length, trailer_volume, ride_type, trailer_status, null);
    stmt.finalize();
    res.json( { trailer: { trailer_no: trailer_no, trailer_make: trailer_make, trailer_year: trailer_year, trailer_type: trailer_type, trailer_plate_no: trailer_plate_no, trailer_length: trailer_length, trailer_volume: trailer_volume, ride_type: ride_type, trailer_status: trailer_status }});
  }
});

/**
 * API - Client
 * 
 */
app.get("/client", async function(req, res) {
  const data = await db.all("SELECT client_id as id, * FROM client");
  res.send(data);
});
app.post("/client", async function(req, res)
{
  const client_name = req.body.client_name;
  const client_phone_no = req.body.client_phone_no;
  const client_type = req.body.client_type;
  const client_status = req.body.client_status;


  const client = await db.all("SELECT * FROM client WHERE client_name = '" + client_name + "' OR client_phone_no = '" + client_phone_no + "'");

  if(client.length > 0) {
    res.status(200).json("Duplicate");
  } else {
    const stmt = await db.prepare("INSERT INTO client VALUES (?,?,?,?,?)");
    stmt.run(null, client_name, client_phone_no, client_type, client_status);
    stmt.finalize();
    res.json( { client: { client_name: client_name, client_phone_no: client_phone_no, client_type: client_type, client_status: client_status }});
  }
});
app.put("/client/:id", async function(req, res)
{
  const client_id = req.params.id;
  const client_phone_no = req.body[0].client_phone_no;
  const client_type = req.body[0].client_type;
  const client_status = req.body[0].client_status;

  const stmt = await db.prepare("UPDATE client SET client_phone_no=?, client_type=?, client_status=? WHERE client_id=?");
  stmt.run( client_phone_no, client_type, client_status, client_id);
  stmt.finalize();
  res.send(stmt);
});

/**
 * API - Client_Address
 * 
 */
 app.get("/client_address", async function(req, res) {
  const data = await db.all("SELECT client_address_id as id, * FROM client_address");
  res.send(data);
});
app.post("/client_address", async function(req, res)
{
  const street_number = req.body.street_number;
  const street_name = req.body.street_name;
  const city = req.body.city;
  const province = req.body.province;
  const postal_code = req.body.postal_code;
  const country = req.body.country;

  const last_insert = await db.all("SELECT last_insert_rowid();");
  const client_id = last_insert[0]['last_insert_rowid()'];

  const stmt = await db.prepare("INSERT INTO client_address VALUES (?,?,?,?,?,?,?,?)");
  stmt.run(null, street_number, street_name, city, province, postal_code, country, client_id);
  stmt.finalize();
  res.json( { client_address: { street_number: street_number, street_name: street_name, city: city, province: province, postal_code: postal_code, country: country, client_id: client_id}}); 
});
app.put("/client_address/:id", async function(req, res)
{
  const client_address_id = req.params.id;
  const street_number = req.body[0].street_number;
  const street_name = req.body[0].street_name;
  const city = req.body[0].city;
  const province = req.body[0].province;
  const postal_code = req.body[0].postal_code;
  const country = req.body[0].country;

  const stmt = await db.prepare("UPDATE client_address SET street_number=?, street_name=?, city=?, province=?, postal_code=?, country=? WHERE client_address_id=?");
  stmt.run( street_number, street_name, city, province, postal_code, country, client_address_id);
  stmt.finalize();
  res.send(stmt);
});

/**
 * API - Client_Info (Client & Client_Address JOIN)
 * 
 */
app.get("/client_info", async function(req, res) {
  const data = await db.all("SELECT * FROM client INNER JOIN client_address ON client.client_id = client_address.client_id");
  res.send(data);
});
app.delete("/client_info/:id", async function(req, res)
{
  const client_id = req.params.id;
  const stmt = await db.prepare("DELETE FROM client WHERE client_id=?");
  stmt.run(client_id);
  stmt.finalize();
  res.send(stmt);  
});

/**
 * API - Orders
 * 
 */
app.get("/orders", async function(req, res) {
  const data = await db.all("SELECT order_id as id, * FROM orders");
  res.send(data);
});
app.post("/orders", async function(req, res)
{
  const weight = req.body.weight;
  const skids = req.body.skids;
  const cost = req.body.cost;
  const pickup_date = req.body.pickup_date;
  const delivery_date = req.body.delivery_date;
  const order_status = req.body.order_status;
  const client_id = req.body.client_id;
  const truck_id = req.body.truck_id;
  const trailer_id = req.body.trailer_id;
 
  const stmt = await db.prepare("INSERT INTO orders VALUES (?,?,?,?,?,?,?,?,?,?)");
  stmt.run(null, weight, skids, cost, pickup_date, delivery_date, order_status, client_id, truck_id, trailer_id);
  stmt.finalize();
  res.json( { order: { weight: weight, skids: skids, cost: cost, pickup_date: pickup_date, delivery_date: delivery_date, order_status: order_status, client_id: client_id, truck_id: truck_id, trailer_id: trailer_id }}); 
});


/**
 * Registration
 * 
 */
app.post("/register", async function(req, res) {
    const username = req.body.username;
    const password = bcrypt.hashSync(req.body.password, saltRounds);
    const is_admin = 0;

    const user_auth = await db.all("SELECT * FROM user_auth WHERE username = '" + username + "'");

    if(user_auth.length > 0) {
        res.status(200).json("Duplicate");
    } else {
        const stmt = await db.prepare("INSERT INTO user_auth VALUES (?,?,?,?)");
        stmt.run(null, username, password, is_admin);
        stmt.finalize();
        let token = jwt.sign({ auth_id: user_auth.auth_id }, config.secret, { expiresIn: 14400 });
        res.status(200).send({ auth: true, token: token, user_auth: { username: username, password: password, is_admin: is_admin } });
    }
})

/**
 * Login
 * 
 */
app.post('/login', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const authUser = await db.all("SELECT * FROM user_auth WHERE username='" + username + "'");

    if(authUser) {
      let pass = "";

      for(i in authUser) {
        pass = authUser[i].hash_pwd;
      }
      const validPassword = bcrypt.compareSync(password, pass);

      let token = jwt.sign({ authUser: authUser.auth_id }, config.secret, { expiresIn: 14400 })

      if(validPassword) {
        res.status(200).send({ auth: true, token: token, authUser: authUser });
      } else {
        res.status(401).send({ auth: false, token: null });
      }
    } else {
      res.status(404).json("No account with the provided username exists.")
    }
  } catch (error) {
    console.log(error);
  }
});



