<template>
  <div>
    <span>{{ code }}</span>
    <br />
    <img :src="'https://images.poweredbyiris.nl/0/30/cluboars/' + code.toLowerCase() + '.png'" :alt="code" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  code: string;
}>();
</script>
