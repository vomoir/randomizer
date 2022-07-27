//  Declare SQL Query for SQLite
var createStatement = "CREATE TABLE  IF NOT EXISTS 'class_list' ('id' INTEGER PRIMARY KEY, 'class_id' INTEGER, 'name' VARCHAR)";
var createClassStatement = "CREATE TABLE  IF NOT EXISTS 'classes' ('id' INTEGER PRIMARY KEY, 'name' VARCHAR)";

var selectAllStatement = "SELECT * FROM class_list";
var selectClassStamement = "SELECT name from classes";
var insertStatement = "INSERT INTO class_list(class_id, name) VALUES (?,?)";
var insertClassStatement = "INSERT INTO classes(name) VALUES (?)";

var updateStatement = "UPDATE class_list SET class_id = ?, name = ? WHERE id=?";
var deleteStatement = "DELETE FROM class_list WHERE id=?";
var dropStatement = "DROP TABLE class_list";
var dbSize = 5 * 1024 * 1024; // 5MB
var db = openDatabase("rndmizr", "1.0", "Randomizer Class Management DB", dbSize);

var dataset;
var DataType;

function initDatabase(){
	try {
		if (!window.openDatabase)  // Check browser is supported SQLite or not.
        {
             alert('Databases are not supported in this browser.');
        } else {
             createTable();  // If supported then call Function for create table in SQLite
        }
    }
    catch (e) {
		if (e == 2) {
             // Version number mismatch. 
             console.log("Invalid database version.");
         } else {
             console.log("Unknown error " + e + ".");
         }
         return;
     }
 }
 function createTable(){  // Function for Create Table in SQLite.
      db.transaction(function (tx) { tx.executeSql(createStatement, [], querySuccess, errorCb); });
	  db.transaction(function (tx) { tx.executeSql(createClassStatement, [], querySuccess, errorCb); });
 }
 
function insertRecord(classId, name){ 
	db.transaction(function (tx) { tx.executeSql(insertStatement, [classId, name], loadAndReset, errorCb); });
    //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
}

function insertClassRecord(className){ // Get value from Input and insert record . Function Call when Save/Submit Button Click..
	db.transaction(function (tx) { tx.executeSql(insertClassStatement, [className], queryDb, errorCb); });
}
// Query the database
function queryDb(tx) {
	tx.executeSql(selectClassStamement, [], querySuccess, errorCb);
}

// Query the success callback
function querySuccess(tx, results) {
	var len = results.rows.length;
	console.log("class Name table: " + len + " rows found.");
	for (var i=0; i<len; i++){
		console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).name);
	}
}
function getClassLists(){
	var classLists = new Array();
	db.transaction(function (tx) {
		tx.executeSql(selectClassStamement, [], function(results){
			var len = results.rows.length;
			console.log("class Name table: " + len + " rows found.");
			for (var i=0; i<len; i++){
				classLists.push(results.rows.item(i).name);
			}
			return classLists;
		},
		errorCb); 
	});
}

function errorCb(err) {
	console.log("Error processing SQL: "+err.code);
}

function deleteRecord(id) // Get id of record . Function Call when Delete Button Click..
 {
     var iddelete = id.toString();
     db.transaction(function (tx) { tx.executeSql(deleteStatement, [id], showRecords, onError); alert("Delete Sucessfull"); });
     resetForm();
 }
 function updateRecord() // Get id of record . Function Call when Delete Button Click..
 {
		//var usernameupdate = $('input:text[id=username]').val().toString();
		//var useremailupdate = $('input:text[id=useremail]').val().toString();
		var commentidupdate = $("#id").val();
		var klatemp = $('input:text[id=kla]').val().toString();
		var gradetemp = $('input:text[id=grade]').val().toString();
		var commenttemp = $('input:text[id=comment]').val().toString();
 
     db.transaction(function (tx) { tx.executeSql(updateStatement, [klatemp, gradetemp, commenttemp, Number(commentidupdate)], loadAndReset, onError); });
 }
 function dropTable() // Function Call when Drop Button Click.. Talbe will be dropped from database.
 {
     db.transaction(function (tx) { tx.executeSql(dropStatement, [], showRecords, onError); });
     resetForm();
     initDatabase();
 }
 function loadRecord(i) // Function to display records which are retrieved from database.
 {
     var item = dataset.item(i);
     $("#kla").val((item['kla']).toString());
     $("#grade").val((item['grade']).toString());
	 $("#comment").val((item['comment']).toString());
     $("#id").val((item['id']).toString());
 }

 function loadAndReset(){ //Function for Load and Reset...
 /*
     resetForm();
     showRecords()
 */
 }
 function onError(tx, error) // Function for Hendeling Error...
 {
     alert(error.message);
 }
   