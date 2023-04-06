const db = require("../database/index");
const Item = require("../database/models/item.model");

const data = require("./items.json");
const sortedData = data.sort((a, b) => a.objectID - b.objectID);

async function seed() {
    await db.connect();

    await Item.collection
        .drop()
        .then(console.log("Collection deleted"))
        .catch((err) => {
            console.log(err);
        });

    let itemsDone = 0;

    sortedData.forEach((item, index, array) => {
        const {
            objectID,
            primaryImage,
            primaryImageSmall,
            additionalImages,
            department,
            objectName,
            title,
            culture,
            period,
            artistDisplayName,
            artistDisplayBio,
            objectDate,
            objectEndDate,
            medium,
            dimensions,
            classification,
            objectURL,
            rating,
            price,
            tags,
        } = item;

        const newItem = new Item({
            objectID,
            primaryImage,
            primaryImageSmall,
            additionalImages,
            department,
            objectName,
            title,
            culture,
            period,
            artistDisplayName,
            artistDisplayBio,
            objectDate,
            objectEndDate,
            medium,
            dimensions,
            classification,
            objectURL,
            rating,
            price,
            tags,
        });

        newItem
            .save()
            .then(() => {
                itemsDone++;
                console.clear();

                // Affiche le % de progrès du seed
                console.log(`${Math.floor((itemsDone / array.length) * 100)}% effectués`);

                // Termine la connexion une fois le dernier item ajouté
                if (itemsDone === array.length) {
                    db.disconnect();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });
}

seed();
