<script setup lang="ts">
import LandingPageLayout from "@/layouts/LandingPageLayout.vue";
import LandingHero from "@/components/LandingHero.vue";
import Promo from "@/components/items/PromoList.vue";
</script>
<template>
    <LandingPageLayout>
        <template #hero>
            <LandingHero />
        </template>

        <template #featured>
            <Promo />
        </template>
    </LandingPageLayout>
</template>
<style scoped></style>
