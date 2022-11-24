<template>
  <div>
    <span>
      {{ timeFormatter.secondsToTime($props.isAltered ? $props.subTime.alteredTime : $props.subTime.time) }}
    </span>
    <span> [ - ]</span>
  </div>
</template>

<script setup lang="ts">
import { SubTime } from "~/models/time";
import { useTimeFormatter } from "~/composables/useTimeFormatter";

defineProps<{
  subTime: SubTime;
  isAltered: boolean;
}>();

const timeFormatter = useTimeFormatter();
</script>
