<template>
    <v-container>
        <v-btn>
            <v-tooltip
                text="Example"
                activator="parent" />
        </v-btn>
        <v-list>
            <v-list-item>...</v-list-item>
        </v-list>
    </v-container>
</template>

<script lang="ts" setup>
console.log("script setup");
</script>

<style lang="scss" scoped>
@use "./main" as x;

a {
    font-family: x.$body-font-family;
}
</style>
