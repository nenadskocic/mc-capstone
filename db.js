// const sqlite3 = require("sqlite3").verbose();
// const bcrypt = require('bcrypt');

// const admin_username = "nenad.skocic";
// const pass = "Admin123!";
// const saltRounds = 10;

// class Database {
//     constructor(db_file) {
//         this.db = new sqlite3.Database(db_file);
//         this.startup();
//     }

//     startup()
//     {
//         this.db.run("DROP TABLE IF EXISTS role"); 
//         this.db.run("DROP TABLE IF EXISTS user_address");  
//         this.db.run("DROP TABLE IF EXISTS user");
//         this.db.run("DROP TABLE IF EXISTS user_auth");
//         this.db.run("DROP TABLE IF EXISTS user_role");
//         this.db.run("DROP TABLE IF EXISTS user_status"); 

//         this.db.run("CREATE TABLE role (role_id INTEGER NOT NULL UNIQUE, role_name TEXT NULL, PRIMARY KEY (role_id AUTOINCREMENT));");
//         this.db.run("CREATE TABLE user_address (address_id INTEGER NOT NULL UNIQUE, street_number INTEGER NOT NULL, street_name TEXT NOT NULL, city TEXT NOT NULL, province TEXT NOT NULL, postal_code TEXT NOT NULL, country TEXT NOT NULL, PRIMARY KEY (address_id AUTOINCREMENT))");
//         this.db.run("CREATE TABLE user (user_id INTEGER NOT NULL UNIQUE, first_name TEXT NOT NULL, last_name TEXT NOT NULL, user_email TEXT NOT NULL UNIQUE, sin_number INTEGER NOT NULL UNIQUE, license_number TEXT NOT NULL UNIQUE, home_phone INTEGER NOT NULL UNIQUE, cell_phone INTEGER NOT NULL UNIQUE, address_id INTEGER NOT NULL, PRIMARY KEY (user_id AUTOINCREMENT), FOREIGN KEY (address_id) REFERENCES user_address (address_id))");
//         this.db.run("CREATE TABLE user_auth (auth_id INTEGER NOT NULL UNIQUE, username TEXT NOT NULL UNIQUE, hash_pwd TEXT NOT NULL, user_id INTEGER NOT NULL, PRIMARY KEY (auth_id AUTOINCREMENT), FOREIGN KEY (user_id) REFERENCES user (user_id))");
//         this.db.run("CREATE TABLE user_role (user_role_id INTEGER NOT NULL UNIQUE, user_id INTEGER NOT NULL, role_id INTEGER NOT NULL, PRIMARY KEY (user_role_id AUTOINCREMENT), FOREIGN KEY (user_id) REFERENCES user (user_id), FOREIGN KEY (role_id) REFERENCES role (role_id))");
//         this.db.run("CREATE TABLE user_status (status_id INTEGER NOT NULL UNIQUE, status TEXT NOT NULL, status_description TEXT NOT NULL, user_id INTEGER NOT NULL, PRIMARY KEY (status_id AUTOINCREMENT), FOREIGN KEY (user_id) REFERENCES user (user_id))");
//     }
//     insert_user() {
//        // this.db.run("INSERT INTO user (first_name, last_name, user_email, sin_number, license_number, home_phone, cell_phone, address_id) VALUES ('nenad', 'skocic', 'nenad@jsdtransportation.ca', 111111, 'S4913-47535-73581', 9055782526, 3654764643, 1)");
//         //this.db.run("INSERT INTO user_address (street_number, street_name, city, province, postal_code, country) VALUES (78, 'Sunrise Dr', 'Hamilton', 'ON', 'L8K 4C3', 'Canada')");
//     }
//     register_user() {
//         try {
//             const hash = bcrypt.hash(pass, saltRounds);
//             this.db.run("INSERT INTO user_auth (username, hash_pwd, user_id) VALUES ('" + admin_username + "', '" + hash + "', 1)");
//         } catch(e) {
//             console.log(e)
//         }
//     }
// }

// module.exports = Database