<script setup lang="ts">
// https://www.geoapify.com/address-autocomplete
import { GeocoderAutocomplete } from "@geoapify/geocoder-autocomplete";
import { useAddressStore } from "@/stores/address";
import { onMounted } from "vue";

const addressStore = useAddressStore();

onMounted(async () => {
    const autocomplete = new GeocoderAutocomplete(
        document.getElementById("autocomplete") as HTMLElement,
        "7d59a5034d6c4d50aae7e86bf688617e",
        {
            allowNonVerifiedHouseNumber: true,
            allowNonVerifiedStreet: true,
            skipIcons: true,
            skipDetails: true,
            type: "street",
            placeholder: "Rechercher une adresse ici...",
        }
    ); // ajoute le autocomplete input au DOM dans le div id="autocomplete"

    autocomplete.addBiasByCountry(["ca"]); // préférence de pays pour suggestions
    autocomplete.setLang("fr"); // langue des suggestions
    autocomplete.setLimit(5); // nb de suggestions

    autocomplete.on("select", (location) => {
        if (!location) return; // pour éviter erreur console quand efface champ recherche

        if (location) console.log(location.properties); // pour tester, à enlever

        if (location.properties.address_line1) addressStore.line1 = location.properties.address_line1;
        if (location.properties.address_line2) addressStore.line2 = location.properties.address_line2;
    }); // s'exécute quand une suggestion d'adresse est sélectionnée (via eventListener)

    // autocomplete.on("suggestions", (suggestions) => {
    //     // process suggestions here
    //     console.log("suggestions");
    // }); // s'exécute quand une suggestion est faite (via eventListener)
});
</script>

<template>
    <link
        rel="stylesheet"
        type="text/css"
        href="https://unpkg.com/@geoapify/geocoder-autocomplete@^1/styles/minimal.css"
    />

    <div class="address-form">
        <div id="autocomplete" class="autocomplete-container">
            <!-- Le champ autocomplete se retrouve ici lorsque le component est ajouté au DOM -->
        </div>

        <fieldset>
            <label for="name">Nom complet *</label>
            <input id="name" v-model="addressStore.fullName" type="text" name="name" required />
        </fieldset>

        <fieldset>
            <label for="phone">Téléphone</label>
            <input id="phone" v-model="addressStore.phone" type="tel" name="phone" />
        </fieldset>

        <fieldset>
            <label for="address_line1">Adresse *</label>
            <input
                id="address_line1"
                v-model="addressStore.line1"
                type="text"
                name="address_line1"
                placeholder="No. et Rue"
                required
            />
            <input
                id="address_line2"
                v-model="addressStore.line2"
                type="text"
                name="address_line2"
                placeholder="Ville, Province, Code Postal, Pays"
                required
            />
        </fieldset>

        <fieldset>
            <label for="instructions">Instructions additionnelles</label>
            <input id="instructions" v-model="addressStore.instructions" type="text" name="instructions" />
        </fieldset>

        <fieldset class="checkbox-grp">
            <input id="is-default" v-model="addressStore.isDefault" type="checkbox" name="is-default" />
            <label for="is-default">Adresse par défaut</label>
        </fieldset>

        <p>* Champ requis</p>
        <p v-if="addressStore.errorMsg" class="error">{{ addressStore.errorMsg }}</p>
        <button @click="addressStore.save">Sauvegarder</button>
        <button @click="addressStore.isEditing = false">Annuler</button>
    </div>
</template>

<style>
/* Pour s'appliquer au component externe, ne peut pas être scoped */
.autocomplete-container .geoapify-autocomplete-input {
    border: none;
    border-bottom: solid var(--secondaryFeature) 2px;
    background-color: inherit;
    color: white;
}
</style>

<style scoped>
.autocomplete-container {
    position: relative;
}

.address-form {
    display: grid;
    gap: 1rem;
    /* max-width: 60rem; */
    width: 100%;
    margin: 0 auto;
    padding: 1rem;
}

fieldset {
    display: flex;
    flex-direction: column;
    gap: 5px;
    border: none;
}
label {
    font-weight: bold;
}
input[type="text"],
input[type="tel"] {
    height: 3rem;
    font-size: 1.7rem;
    padding: 0 5px;
    border-radius: 5px;
}
.checkbox-grp {
    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 0 5px;
}
input[type="checkbox"] {
    height: 2rem;
}

.error {
    color: var(--errorColor);
    font-weight: bold;
    text-align: center;
}
</style>
