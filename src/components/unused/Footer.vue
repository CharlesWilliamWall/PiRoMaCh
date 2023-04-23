<script setup lang="ts">
import { logoIcon } from "@/assets/icons/index";
</script>

<template>
    <div>
        <div class="theFooter">
            <p class="reserved">Tous droits réservés ©Semu 2022</p>

            <logoIcon />

            <div class="contact">
                <h2>Contact</h2>
                <p>En ligne : <span class="courriel">semu.ca/info</span></p>
                <p>Téléphone : 1-800-555-SEMU</p>
                <p>Courriel : <span class="courriel">semuinfo@semu.uk</span></p>
                <p>En personne : 221b Baker St, London NW1 6XE, UK</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.theFooter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--featureGrey);
    color: var(--mainWhite);
    text-shadow: 1px 1px 4px var(--featureGreen);
    margin-top: 3rem;
    font-size: 0.7rem;
}

.theFooter p {
    font-size: 1.5rem;
    font-family: "IBM Plex Serif", serif;
    font-weight: bolder;
}
.contact {
    display: flex;
    flex-direction: column;
}
h2 {
    font-size: 1.5rem;
}
</style>
