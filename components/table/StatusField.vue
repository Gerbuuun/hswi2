<template>
  <span>{{ statusString }}</span>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  status: number;
  time: string;
}>();

const fieldStatus = [
  { name: "Aangemaakt", class: "" },
  { name: "Officieel", class: "stat_official" },
  { name: "Onderworpen aan protest", class: "stat_protest" },
  { name: "Onofficieel", class: "stat_unofficial" },
  { name: "Gestart", class: "stat_started" },
  { name: "Aan het finishen", class: "stat_finishing" },
  { name: "Geannuleerd", class: "stat_canceled" },
];

const statusString = computed(() => {
  return +props.status > 0 ? fieldStatus[props.status].name : props.time;
});
</script>
