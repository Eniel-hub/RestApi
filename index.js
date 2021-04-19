const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'expressjs',
  password : 'password',
  database : 'expressjs'
});
 
connection.connect((err)=>{
  if(err){throw err;}
  console.log("Connected to database...");
});

const db = {
  
  //create a table
  createTable: () => {
    const sql = "CREATE TABLE test_table (id INT AUTO_INCREMENT, Fistname VARCHAR(80), Lastname VARCHAR(80), PRIMARY KEY (id));";
    connection.query(sql, (err) =>{
      if(err){throw err;}
      console.log("Table created...");
    })
  },

  //retreive all data from the table
  getAll: () =>{
    return new Promise ((resolve, reject) =>{
      const sql = "SELECT* FROM test_table;";
      connection.query(sql, (err, results) =>{
        if(err) {return reject(err)}
        return resolve(results);
      })
    })
  },

  //add a record
  add: (fistname, lastname) =>{
    return new Promise ((resolve, reject) => {
      const data = {fistname, lastname}
      const sql = "INSERT INTO test_table SET ?"
      connection.query(sql, data, (err) =>{
        if(err){reject(err)}
        return resolve("data inserted into database...");
      })
    })   
  },

  //update a record
  update: (id, fistname, lastname) =>{
    return new Promise ((resolve, reject) => {
      const data = {id: id, fistname, lastname}
      const sql = "REPLACE INTO test_table SET ?"
      connection.query(sql, data, (err) =>{
        if(err){reject(err)}
        return resolve("data updated...");
      })
    })   
  },

  //delete a record
  delete: (id) =>{
    return new Promise ((resolve, reject) => {
      const sql = "DELETE FROM test_table WHERE id = ?"
      connection.query(sql, id, (err) =>{
        if(err){reject(err)}
        return resolve("data deleted...");
      })
    })   
  }
};

module.exports = db;
 