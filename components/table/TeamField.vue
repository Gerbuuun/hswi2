<template>
  <span>[{{ backNumber }}] </span>
  <span>{{ teamName }}</span>
  <br />
  <span>{{ rower8 }}</span>
</template>

<script setup lang="ts">
defineProps<{
  teamName: string;
  backNumber: string;
  rower8: string;
}>();
</script>
