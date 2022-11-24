<template>
  <div>
    <div class="prose-xl p-5 bg-base-200 text-center">
      {{ regattas.selected?.regattaname }} {{ regattas.selected?.jaar }}
    </div>
    <div class="tabs tabs-boxed justify-center">
      <a class="tab tab-lg" @click="navigateTo(fieldURL)">Velden</a>
      <a class="tab tab-lg" @click="navigateTo(blockURL)">Blokken</a>
      <a class="tab tab-lg" @click="navigateTo(clubsURL)">Verenigingen</a>
      <a v-if="selected" class="tab tab-lg" @click="navigateTo(drawURL)">Loting</a>
      <a v-if="selected" class="tab tab-lg" @click="navigateTo(resultsURL)">Uitslagen</a>
    </div>
    <div class="w-full">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import useRegattaStore from "~/stores/useRegattaStore";
import useFieldStore from "~/stores/useFieldStore";

const regattas = useRegattaStore();
const fields = useFieldStore();
const route = useRoute();

const selected = computed(() => fields.selected);

const fieldURL = computed(() => `/${route.params.id}/fields/`);
const blockURL = computed(() => `/${route.params.id}`);
const clubsURL = computed(() => `/${route.params.id}/clubs`);
const resultsURL = computed(() => encodeURI(`/${route.params.id}/results/${route.params.field}`));
const drawURL = computed(() => encodeURI(`/${route.params.id}/draw/${route.params.field}`));
</script>
