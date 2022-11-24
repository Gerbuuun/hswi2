<template>
  <div>
    <NuxtLayout name="navigation">
      <table class="table table-compact w-full">
        <thead>
          <tr>
            <th v-for="heading in headings" :key="heading">
              {{ heading }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="field in fields.all" :key="field.field_id" class="hover" @click="navigateToField(field)">
            <td>{{ field.blocknumber }}</td>
            <td>{{ field.fieldnameshort }}</td>
            <td>{{ field.numberofteams }}</td>
            <td>{{ field.starttime }}</td>
          </tr>
        </tbody>
      </table>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { Field } from "~/models/field";
import useFieldStore from "~/stores/useFieldStore";
import useRegattaStore from "~/stores/useRegattaStore";

const regattas = useRegattaStore();
const fields = useFieldStore();
const route = useRoute();

const headings = ["Block", "Field", "Number of Teams", "Start Time"];

async function navigateToField(field: Field): Promise<void> {
  await fields.select(field.field_id);
  await navigateTo(`/${route.params.id}/draw/${fields.url}`);
}

onMounted(async () => {
  await regattas.select(route.params.id as string);
  await fields.load();
});
</script>
