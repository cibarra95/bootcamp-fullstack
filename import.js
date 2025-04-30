const { MongoClient } = require("mongodb");
const fs = require("fs");

const uri = "mongodb://admin:admin123@localhost:27017/?authSource=admin";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const db = client.db("bootcampdb");
        const users = JSON.parse(fs.readFileSync("./users.json", "utf8"));
        const result = await db.collection("users").insertMany(users);
        console.log(`Inserted ${result.insertedCount} users`);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);