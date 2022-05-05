// Create in-memory database
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

// DB Helper functions to return promises (wrapped around the db.run, db.all and db.get functions)
const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        console.log('Error running sql ' + sql);
        console.log(err);
        reject(err);
      } else {
        resolve({ id: this.lastID });
      }
    })
  })
};

const all = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, function (err, rows) {
      if (err) {
        console.log('Error running sql ' + sql);
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    })
  })
};

const get = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, function (err, result) {
      if (err) {
        console.log('Error running sql ' + sql);
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
};

// Initialise database
const init = async () => {
  // Create tables
  await run(`create table users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        created_date DATE DEFAULT CURRENT_TIMESTAMP
    );`);
  
  // Insert data
  await run(`INSERT INTO users (name)
    VALUES ('Jamie'), ('Ella')`);
};

// Repository functions
const getUsers = async () => {
  const result = await all(`
    SELECT name
    FROM users u
  `);
  return result;
}


module.exports = {
  init,
  getUsers,
}