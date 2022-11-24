<template>
  <div>
    <input v-model="input" type="text" placeholder="Zoeken" @keyup.enter="search()" />
    <button @click="search()"><span class="mdi mdi-search-web" /></button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useRegattaStore from "~/stores/useRegattaStore";

const regattas = useRegattaStore();

const input = ref("");

function search(): void {
  regattas.filter(input.value);
}

onMounted(async () => {
  await regattas.load();
});
</script>
