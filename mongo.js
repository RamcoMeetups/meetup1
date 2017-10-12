var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/users";

function connectDB(callback){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    callback(db);
  });
}

function createCollection(db,callback){
  db.createCollection("userinfo", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    callback(db);
  });
};

function insertData(db,callback){
  var userData = [
    {id:1, name:'John', address:'Highway 71'},
    {id:2, name:'Peter', address:'Lowstreet 4', alias:'Tom'},
    {id:3, name:'Amy', address:'Apple st 652'},
    {id:4, name:'Hannah', address:'Mountain 21', alias:'Montanah'},
    {id:5, name:'Michael', address:'Valley 345'},
    {id:6, name:'Sandy', address:'Ocean blvd 2'},
    {id:7, name:'Betty', address:'Green Grass 1'},
    {id:8, name:'Richard', address:'Sky st 331'},
    {id:9, name:'Susan', address:'One way 98'},
    {id:10, name:'Vicky', address:'Yellow Garden 2'},
    {id:11, name:'Ben', address:'Park Lane 38'},
    {id:12, name:'William', address:'Central st 954'},
    {id:13, name:'Chuck', address:'Main Road 989'},
    {id:14, name:'Viola', address:'Sideway 1633'}
  ];

  db.collection('userinfo').insertMany(userData, function(err,res){
    if (err) throw err;
    console.log('Data inserted');
    db.collection("userinfo").createIndex({ "id": 1 }, { unique: true });
    callback(db);
  });
}

function queryData(db,callback){
  db.collection("userinfo").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
    callback();
  });
};

connectDB(function(db){
  createCollection(db,function(db){
    insertData(db,function(db){
      queryData(db,function(db){
        console.log('Program complete');
      });
    });
  });
});
