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

// Ruta GET: todos los usuarios
app.get("/users", async (req, res) => {
    try {
        const users = await db.collection("users").find().toArray();
        res.json(users);
    } catch (err){
        res.status(500).json({ error: "No se puede obtener la data de usuarios" }); // ✅ Correcto
    }
});

// Ruta GET con filtros por query
// http://localhost:3000/users/search?gender=Female or Male
// http://localhost:3000/users/search?gender=Male&married status=true or false
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

// Ruta PUT que modifica o crea un documento por el email
app.put('/users/update', async (req, res) => {
    try {
        const { email, updates } = req.body;

        if (!email || !updates) {
            return res.status(400).json({ error: 'Faltan campos: email y updates' });
        }

        const result = await db.collection('users').updateOne(
            { email },
            { $set: updates },
            { upsert: true }
        );

        if (result.matchedCount > 0) {
            res.status(200).json({ message: 'Usuario actualizado' });
        } else {
            res.status(201).json({ message: 'Usuario creado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error en actualización o creación' });
    }
});

// Ruta DELETE que elimina un documento por email
app.delete('/users/delete', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Falta el campo email' });
        }

        const result = await db.collection('users').deleteOne({ email });

        if (result.deletedCount === 0) {
            return res.status(204).send();
        }

        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
});

// Iniciar server
app.listen(process.env.PORT, ()=> {
    console.log(`API corriendo en http://localhost:${process.env.PORT}`);
})