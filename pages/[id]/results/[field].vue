<template>
  <div>
    <NuxtLayout name="navigation">
      <h2 class="prose-xl bg-base-200 text-center p-5">{{ $route.params.field }}</h2>
      <table class="table table-compact w-full">
        <thead>
          <tr>
            <th v-for="heading in teams.theaders" :key="heading">
              {{ heading }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="team in teams.all" :key="team.knrbid" class="hover">
            <td>
              <BladeField :code="team.clubnameshort" />
            </td>
            <td>
              <TeamField
                :team-name="team.teamname"
                :back-number="team.times[0].backnumber"
                :rower8="team.rower8 ?? ''"
              />
            </td>
            <template v-for="time in team.times">
              <td v-for="subTime in removeDuplicates(time.times)" :key="subTime.name">
                <TimeField :sub-time="subTime" :is-altered="true" />
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import useFieldStore from "~/stores/useFieldStore";
import useTeamStore from "~/stores/useTeamStore";
import useRegattaStore from "~/stores/useRegattaStore";
import { onMounted } from "#imports";
import TeamField from "~/components/table/TeamField.vue";
import BladeField from "~/components/table/BladeField.vue";
import TimeField from "~/components/table/TimeField.vue";
import { SubTime } from "~/models/time";

const regattas = useRegattaStore();
const fields = useFieldStore();
const teams = useTeamStore();
const route = useRoute();

onMounted(async () => {
  const field = computed(() => route.params.field as string);

  await regattas.select(route.params.id as string);
  watch(field, async (value) => {
    await fields.selectByURL(value);
  });
  await teams.load();
});

function removeDuplicates(array: SubTime[]) {
  return array.filter((v, i, a) => a.indexOf(a.find((e) => e.name === v.name) ?? ({} as SubTime)) === i);
}
</script>
