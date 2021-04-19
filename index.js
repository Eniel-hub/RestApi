const express = require("express");
const path = require("path");
const db = require("./db/dbindex");

const app = express();
const PORT = 5500;

//listen to a port
app.listen(PORT, (err) => {
    if(err) {throw err};

    console.log("connected to server...");
});

//make a folder static
app.use(express.static(path.join(__dirname, 'public')));

//create a table
// db.createTable();

//retrieve data
app.get('/api/users', async(req, res) =>{
    try {
        let result = await db.getAll();
        res.json(result)
    } catch (err) {
        console.log(err)
    }
});

//create new user
app.post('/api/new_user', async(req ,res) =>{
    const Firstname = "Eniel";
    const Lastname = "Leba";
    try {
        let result = await db.add(Firstname, Lastname);
        res.send(result)
    } catch (err) {
        console.log(err)
    }
})

//update user
app.put('/api/update/:id', async(req ,res) =>{
    id = req.params.id;
    const Firstname = "Sara";
    const Lastname = "White";
    try {
        let result = await db.update(id, Firstname, Lastname);
        res.send(result)
    } catch (err) {
        console.log(err)
    }
})

//delete user
app.delete('/api/delete/:id', async(req ,res) =>{
    id = req.params.id;
    try {
        let result = await db.delete(id);
        res.send(result)
    } catch (err) {
        console.log(err)
    }
})