<template>
  <div>
    <div class="hero min-h-screen bg-base-300">
      <div class="hero-content text-center">
        <h1 class="text-5xl font-bold">HOE SNEL WAS IK?</h1>
        <RegattaSearch />
      </div>
    </div>
    <div class="prose-2xl font-bold text-center p-5">Alle wedstrijden</div>
    <div class="grid grid-cols-2 grid-rows-auto gap-2 pb-5">
      <RegattaCard v-for="regatta in regattas.filtered" :key="regatta.rid" :regatta="regatta" />
    </div>
  </div>
</template>

<script setup lang="ts">
import RegattaSearch from "~/components/RegattaSearch.vue";
import useRegattaStore from "~/stores/useRegattaStore";

const regattas = useRegattaStore();

onMounted(async () => {
  await regattas.load();
});
</script>
