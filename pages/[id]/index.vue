<template>
  <div>
    <NuxtLayout name="navigation">
      <div class="grid grid-rows-auto gap-5 p-5">
        <div v-for="block in fields.groupedBlock" :key="block[0].blockid">
          <BlockCard :fields="block" />
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import useRegattaStore from "~/stores/useRegattaStore";
import useFieldStore from "~/stores/useFieldStore";
import BlockCard from "~/components/BlockCard.vue";

const regattas = useRegattaStore();
const fields = useFieldStore();

onMounted(async () => {
  await regattas.select(useRoute().params.id as string);
  await fields.load();
});
</script>
