const { getRandomItems } = require("../queries/items.queries");
const { deleteAllPromos, savePromo, getCurrentPromos } = require("../queries/promos.queries");

async function getPromosData(req, res, next) {
    try {
        const promos = await getCurrentPromos();

        res.status(200).json({
            status: 200,
            promos,
            message: "success",
        });
    } catch (error) {
        next(error);
    }
}

async function createPromos(req, res, next) {
    try {
        await deleteAndSeedPromosDB();

        next();
    } catch (error) {
        next(error);
    }
}

async function deleteAndSeedPromosDB() {
    return new Promise(async (resolve, reject) => {
        const promosDeleted = await deleteAllPromos();
        const promosSeeded = await seedPromos();

        if (promosDeleted.acknowledged && promosSeeded) {
            resolve(true);
        } else {
            reject(false);
        }
    });
}

async function seedPromos() {
    return new Promise(async (resolve, reject) => {
        try {
            const nbPromos = 100; // nb de promos à générer par semaine

            // 1e batch de promos durée 30s
            let shortDurationRandomItems = await getRandomItems(nbPromos);
            const now = Date.now(); // datetime actuel
            const previousEnd = new Date(now + 30 * 1000); // + 30s
            const previousStart = new Date(previousEnd.getTime() - 7 * 24 * 60 * 60 * 1000); // 7j * 24h * 60m * 60s * 1000ms

            for (const item of shortDurationRandomItems) {
                savePromo(item.objectID, previousStart, previousEnd);
            }

            // 2e batch de promos durée 7j
            let randomItems = await getRandomItems(nbPromos);
            const dateStart = new Date(previousEnd.getTime() + 1);
            const dateEnd = new Date(dateStart.getTime() + 14 * 24 * 60 * 60 * 1000 - 1); // 14j * 24h * 60m * 60s * 1000ms - 1ms

            for (const item of randomItems) {
                savePromo(item.objectID, dateStart, dateEnd);
            }

            // Timeout 1 sec pour éviter de mettre await dans la loop et empêcher le async
            // (ça rend le délais de création très long), mais éviter de sauter les dernières promos,
            // car retournerait trop vite avant d'avoir sauvé dans db.
            // Idéalement je trouverais une façon plus élégante de faire...
            setTimeout(() => {
                resolve(true);
            }, 1000);

            // resolve(true);
        } catch (error) {
            console.log(error.message);
            reject(false);
        }
    });
}

module.exports = { createPromos, getPromosData };
