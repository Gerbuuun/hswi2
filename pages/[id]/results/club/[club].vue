<template>
  <div>
    <NuxtLayout name="navigation">
      <h2 class="prose-xl bg-base-200 text-center p-5">{{ clubs.selected?.clubname }}</h2>
      <table class="table table-compact w-full">
        <thead>
          <tr>
            <th v-for="heading in teams.theadersClub" :key="heading">
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
              {{ team.fieldnameshort }}
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
                <TimeField :sub-time="subTime" :is-altered="false" />
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import useRegattaStore from "~/stores/useRegattaStore";
import useTeamStore from "~/stores/useTeamStore";
import useClubStore from "~/stores/useClubStore";
import BladeField from "~/components/table/BladeField.vue";
import TeamField from "~/components/table/TeamField.vue";
import TimeField from "~/components/table/TimeField.vue";
import { SubTime } from "~/models/time";

const regattas = useRegattaStore();
const clubs = useClubStore();
const teams = useTeamStore();
const route = useRoute();

onMounted(async () => {
  const club = computed(() => route.params.club as string);

  await regattas.select(route.params.id as string);
  await clubs.selectByURL(route.params.club as string);

  watch(club, async (value) => {
    await clubs.selectByURL(value as string);
  });
  await teams.load();
});

function removeDuplicates(array: SubTime[]) {
  return array.filter((v, i, a) => a.indexOf(a.find((e) => e.name === v.name) ?? ({} as SubTime)) === i);
}
</script>
