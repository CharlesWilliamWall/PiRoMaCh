const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const protocol = "mongodb+srv";
const username = "dev-2b4";
const password = "6T4ZNfTlRLHdFKjb";
const url = "atlas2b4.b9duvkv.mongodb.net";
const database = "atlas-piromach";
const params = "?retryWrites=true&w=majority";

const connectionString = `${protocol}://${username}:${password}@${url}/${database}${params}`;
console.log(connectionString);
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

exports.connect = (callback) =>
    mongoose
        .connect(connectionString, options)
        .then(() => {
            console.log(`Connecté avec succès à BD ${database} sur ${url}`);
            if (callback) callback();
        })
        .catch((err) => {
            console.log(err);
        });

exports.disconnect = () => {
    mongoose.disconnect(() => {
        console.log(`Opération terminée`);
    });
};
