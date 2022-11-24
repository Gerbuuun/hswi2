<template>
  <div class="card card-side bg-base-200 shadow-xl min-w-lg hover:bg-base-300" @click="navigateToRegatta(regatta)">
    <figure><img :src="logo" alt="logo" /></figure>
    <div class="card-body">
      <h2 class="card-title align-middle">{{ regatta.regattaname }} {{ regatta.jaar }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { Regatta } from "~/models/regatta";
import useRegattaStore from "~/stores/useRegattaStore";

const regattaStore = useRegattaStore();

defineProps({
  regatta: { type: Object as PropType<Regatta>, required: true },
  logo: { type: String, default: "/logo.png" },
});

async function navigateToRegatta(regatta: Regatta): Promise<void> {
  await regattaStore.select(regatta.rid);
  navigateTo(`/${regatta.rid}`);
}
</script>
