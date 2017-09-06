var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password"
});

function createDatabase(con,callback){
  con.connect(function(err) {

    if (err) throw err;

    console.log("Connected!");

    var SQL = 'CREATE DATABASE IF NOT EXISTS users';

    con.query(SQL,function(err,result){
      if(err)throw err;
      console.log('DATABASE CREATED');
      callback();
    });

  });
}

function createTables(con,callback){
  var SQL = 'CREATE TABLE IF NOT EXISTS users.Userinfo (id int PRIMARY KEY NOT NULL,name varchar(100),address varchar(200))';
  con.query(SQL,function(err,result){
    if (err) throw err;
    console.log("Userinfo table created");

    SQL = 'CREATE TABLE IF NOT EXISTS users.alias (id int NOT NULL, alias varchar(100), FOREIGN KEY (id) REFERENCES users.Userinfo(id))';
    con.query(SQL,function(err,result){
      if (err) throw err;
      console.log("Alias table created");
      callback();
    });

  });
}

function insertUserData(con,callback){
    var SQL = "INSERT IGNORE INTO users.Userinfo (ID, name, address) VALUES ?";
    var userData = [
      [1, 'John', 'Highway 71'],
      [2, 'Peter', 'Lowstreet 4'],
      [3, 'Amy', 'Apple st 652'],
      [4, 'Hannah', 'Mountain 21'],
      [5, 'Michael', 'Valley 345'],
      [6, 'Sandy', 'Ocean blvd 2'],
      [7, 'Betty', 'Green Grass 1'],
      [8, 'Richard', 'Sky st 331'],
      [9, 'Susan', 'One way 98'],
      [10, 'Vicky', 'Yellow Garden 2'],
      [11, 'Ben', 'Park Lane 38'],
      [12, 'William', 'Central st 954'],
      [13, 'Chuck', 'Main Road 989'],
      [14, 'Viola', 'Sideway 1633']
    ];

    var aliasData = [
      [2, 'Tom'],
      [4, 'Montanah']
    ];

    con.query(SQL, [userData], function(err) {
      if (err) throw err;
      SQL = "INSERT INTO users.alias (id, alias) VALUES ?";
      con.query(SQL, [aliasData], function(err) {
        if (err) throw err;
        callback();
      });
    });
}

function executeQuery(con,SQL){
  con.query(SQL, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
};

createDatabase(con,function(){
  createTables(con,function(){
    insertUserData(con,function(){
      var SQL = 'SELECT * FROM users.Userinfo';
      executeQuery(con,SQL);
    });
  });
});
