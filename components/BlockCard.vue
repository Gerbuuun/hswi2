<template>
  <div>
    <div class="prose-xl text-center p-3 bg-base-200 rounded-t">{{ blockHeader }}</div>
    <table class="table table-compact w-full">
      <thead>
        <tr>
          <th v-for="heading in headings" :key="heading">
            {{ heading }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="field in fields" :key="field.field_id" class="hover" @click="navigateToField(field)">
          <td>{{ field.fieldnameshort }}</td>
          <td>{{ field.numberofteams }}</td>
          <td>
            <StatusField :status="parseInt(field.status)" :time="field.starttime" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { Field } from "~/models/field";
import StatusField from "~/components/table/StatusField.vue";
import useFieldStore from "~/stores/useFieldStore";

const headings = ["Veld", "Aantal Ploegen", "Status"];
const fieldStore = useFieldStore();

const props = defineProps<{
  fields: Field[];
}>();

const blockHeader = computed(
  () => "Blok " + props.fields[0].blocknumber + ": " + removeSeconds(props.fields[0].starttime),
);

function removeSeconds(startTime: string): string {
  return startTime.slice(0, startTime.lastIndexOf(":"));
}

async function navigateToField(field: Field): Promise<void> {
  await fieldStore.select(field.field_id);
  await navigateTo(`/${useRoute().params.id}/draw/${fieldStore.url}`);
}
</script>
