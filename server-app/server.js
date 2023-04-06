// require dotenv se ferait ici

const db = require("./database/index");
const app = require("./app");

// Connexion DB
db.connect().catch((err) => {
    console.log(err);
});

const PORT = 3000;
const HOST = "localhost";

app.listen(PORT, HOST, () => {
    console.log(`Serveur NodeJS démarré sur ${HOST}:${PORT}`);
});
