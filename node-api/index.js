require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI);
let db;

async function connectDB(){
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log("Conectado a MongoDB");
}

connectDB().catch(console.error);

// Ruta GET: obtener data
app.get("/users", async (req, res) => {
    try {
        const users = await db.collection("users").find().toArray();
        res.json(users);
    } catch (err){
        res.status(500).json({ error: "No se puede obtener la data de usuarios" }); // ✅ Correcto
    }
});

// Ruta GET con filtros por query string
app.get('/users/search', async (req, res) => {
    try {
        const query = {};

        if (req.query.gender) query.gender = req.query.gender;
        if (req.query.married_status)
            query.married_status = req.query.married_status === 'true';

        const filteredUsers = await db.collection('users').find(query).toArray();
        res.json(filteredUsers);
    } catch (err) {
        res.status(500).json({ error: 'Error al buscar usuarios' });
    }
});

// Iniciar server
app.listen(process.env.PORT, ()=> {
    console.log(`API corriendo en http://localhost:${process.env.PORT}`);
})