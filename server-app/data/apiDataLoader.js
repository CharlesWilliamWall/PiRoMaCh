const axios = require("axios");
const fs = require("fs");
const path = require("path");

const baseAPIUrl = "https://collectionapi.metmuseum.org/public/collection/v1";
const objectsDataEndpoint = "/objects";
const hasImages = "/search?hasImages=true&q=e"; // un query est obligatoire en plus de 'hasImages'
// const hasImages = "/search?hasImages=true&q=Auguste Renoir"; // un query est obligatoire en plus de 'hasImages' et même avec hasImages, retourne des items sans images...
const departmentIds = "?departmentIds=21"; // alternative endpoint pour obtenir itemsIds par département (1-21) et non search

function accessAPI(baseUrl, endpoint) {
    return new Promise((resolve, reject) => {
        const apiResponse = axios.get(`${baseUrl}${endpoint}`);

        resolve(apiResponse);
    });
} // Accès à l'api qui prend le début et la fin de l'adresse en paramètres et retourne une promesse avec la réponse

//-------------------------------------------//
// Obtention & sauvegarde des données brutes //
//-------------------------------------------//
async function getIds() {
    return new Promise(async (resolve, reject) => {
        const response = await accessAPI(baseAPIUrl, hasImages);
        // const response = await accessAPI(baseAPIUrl, `${objectsDataEndpoint}${departmentIds}`); // alternative à la ligne d'avant
        const ids = response.data.objectIDs;

        resolve(ids);
    });
} // Obtenir les ids valides selon une requête (attention, certains ids invalides sont présent dans la liste retournée...)

function saveToJson(filename, data) {
    fs.writeFileSync(`${path.join(__dirname, filename)}`, JSON.stringify(data));
} // Save file in data/ (param 1 = filename with extension, 2 = data (obj))

let itemsProcessed = 0,
    itemsAccepted = 0; // variables pour la progression

async function getItemsData(itemsIds, nbItemsToProcess) {
    return new Promise(async (resolve, reject) => {
        let data = [];

        const requiredFields = [
            "isPublicDomain",
            "primaryImage",
            "primaryImageSmall",
            "department",
            "artistDisplayName",
            "objectEndDate",
            "classification",
            "title",
            "objectName",
            "tags",
        ];

        for (let index = 0; index < itemsIds.length; index++) {
            const element = itemsIds[index];
            let item;

            itemsProcessed++;

            // Décompte et % de progrès
            if (nbItemsToProcess) {
                console.clear();
                console.log(
                    `${itemsProcessed} items traités`,
                    `(${Math.floor((itemsProcessed / nbItemsToProcess) * 100)}%)`
                );
                console.log(
                    `${itemsAccepted} items acceptés`,
                    `(${Math.floor((itemsAccepted / itemsProcessed) * 100)}%)`
                );
            }

            // Obtenir le data de l'item via requête API Met
            try {
                item = await accessAPI(baseAPIUrl, `${objectsDataEndpoint}/${element}`);
            } catch (error) {
                console.log(error.response.config.url, error.response.data.message);
                continue; // REQUIS pour passer à la prochaine loop sans exécuter le reste du code si erreur survient, sinon ça plante le code au complet
            }

            // Si item répond à nos critères, ajoute à array
            if (dataInRequiredFields(item, requiredFields)) {
                itemsAccepted++;
                data.push(item.data);
            }

            // limite temporaire nb items récupérés pour fin de tests ou limiter chaque loop à traiter ce nb d'items max
            // if (index > 1000) break;
        }

        resolve(data);
    });
}

function dataInRequiredFields(item, requiredFields) {
    for (const field of requiredFields) {
        if (!item.data[`${field}`]) return false;
    }
    return true;
} // Vérifie que les champs de l'item (param 1) passés en array (2e param) ne sont pas falsy

function sliceArray(originalArray, chunksNb) {
    const result = [];
    const chunkSize = Math.ceil(originalArray.length / chunksNb);

    for (let i = 0; i < originalArray.length; i += chunkSize) {
        const chunk = originalArray.slice(i, i + chunkSize);
        result.push(chunk);
    }

    return result;
} // Découpe array (param 1) en (param 2) chunks de tailles ± égales et retourne un array contenant les nouveaux arrays

async function getRawData() {
    const timeStart = Date.now();
    const itemsIds = await getIds(); // get ids from api
    saveToJson("itemsIds.json", itemsIds); // save ids to json

    const splitIds = sliceArray(itemsIds, 8); // Séparer array de Ids en 8 chunks de Ids dans un array
    const result = await Promise.all([
        getItemsData(splitIds[0], itemsIds.length),
        getItemsData(splitIds[1]),
        getItemsData(splitIds[2]),
        getItemsData(splitIds[3]),
        getItemsData(splitIds[4]),
        getItemsData(splitIds[5]),
        getItemsData(splitIds[6]),
        getItemsData(splitIds[7]),
    ]); // Requêtes parrallèles (1 par chunk de l'array original)

    const itemsData = result.flat(Infinity); // Merge tous les arrays dans un seul array

    saveToJson("itemsRawData.json", itemsData); // save array d'items avec leur data

    console.log("Opération terminée" + ` en ${Math.round((Date.now() - timeStart) / 1000)} secondes`);
} // Fonction qui appelle les autres fonctions d'obtention + sauvegarde des données brutes;

// Exécution de la fonction. À commenter si on a déjà obtenu les données brutes //
// getRawData();
//------------------------------------------------------------------------------//

//----------------------------------------------------//
// Conversion des données brutes --> Objet utilisable //
//----------------------------------------------------//
class Item {
    constructor(rawItem) {
        function getRandomRating() {
            return Math.floor(Math.random() * 40) / 10 + 1;
        }
        function getRandomPrice() {
            return Math.floor(Math.random() * 9900) + 100;
        }
        this.objectID = rawItem.objectID;
        this.primaryImage = rawItem.primaryImage; // data is required
        this.primaryImageSmall = rawItem.primaryImageSmall; // data is required
        this.additionalImages = rawItem.additionalImages;
        this.department = rawItem.department; // data is required
        this.objectName = rawItem.objectName; // data is required
        this.title = rawItem.title; // data is required
        this.culture = rawItem.culture;
        this.period = rawItem.period;
        this.artistDisplayName = rawItem.artistDisplayName; // data is required
        this.artistDisplayBio = rawItem.artistDisplayBio;
        this.objectDate = rawItem.objectDate;
        this.objectEndDate = rawItem.objectEndDate; // data is required
        this.medium = rawItem.medium;
        this.dimensions = rawItem.dimensions;
        this.classification = rawItem.classification; // data is required
        this.objectURL = rawItem.objectURL;
        this.rating = getRandomRating(); // data is required
        this.price = getRandomPrice(); // data is required

        this.tags = [];
        for (const tag of rawItem.tags) this.tags.push(tag.term);
    }
}

function filter() {
    const filteredItems = require("./itemsRawData.json");

    let items = [];
    for (const item of filteredItems) {
        const tmpItem = new Item(item);
        items.push(tmpItem);
    }

    saveToJson("items.json", items);
}

// filter(); // À utiliser une fois les données brutes sauvegardées en json pour les transformer en objet utilisable
