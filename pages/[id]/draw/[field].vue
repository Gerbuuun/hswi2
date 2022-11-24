<template>
  <div>
    <NuxtLayout name="navigation">
      <h2 class="prose-xl bg-base-200 text-center p-5">{{ $route.params.field }}</h2>
      <table class="table table-compact w-full">
        <thead>
          <tr>
            <th v-for="heading in headings" :key="heading">
              {{ heading }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="draw in draws.all" :key="draw.knrbid" class="hover">
            <td>
              <BladeField :code="draw.clubnameshort" />
            </td>
            <td>
              <TeamField
                :team-name="draw.teamname"
                :back-number="draw.backnumber.toString()"
                :rower8="draw.rower8 ?? ''"
              />
            </td>
            <td>[ {{ draw.tossorder }} ]</td>
          </tr>
        </tbody>
      </table>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import useFieldStore from "~/stores/useFieldStore";
import useRegattaStore from "~/stores/useRegattaStore";
import { onMounted } from "#imports";
import TeamField from "~/components/table/TeamField.vue";
import BladeField from "~/components/table/BladeField.vue";
import useDrawStore from "~/stores/useDrawStore";

// Stores
const regattas = useRegattaStore();
const fields = useFieldStore();
const draws = useDrawStore();
const route = useRoute();

const headings = ["Vereniging", "Ploeg", "Volgorde"];

onMounted(async () => {
  const field = computed(() => route.params.field as string);

  await regattas.select(useRoute().params.id as string);
  watch(field, async (value) => {
    await fields.selectByURL(value);
  });
  await draws.load();
});
</script>
