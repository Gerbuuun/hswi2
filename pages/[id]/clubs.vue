<template>
  <div>
    <NuxtLayout name="navigation">
      <div class="">
        <table class="table table-compact w-full">
          <thead>
            <tr>
              <th v-for="heading in headings" :key="heading">
                {{ heading }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="club in clubs.all" :key="club.clubshort" class="hover" @click="navigateToClub(club)">
              <td>
                <BladeField :code="club.clubshort" />
              </td>
              <td>{{ club.clubname }}</td>
              <td>{{ club.numberofteams }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import useClubStore from "~/stores/useClubStore";
import useRegattaStore from "~/stores/useRegattaStore";
import { onMounted, useRoute } from "#imports";
import BladeField from "~/components/table/BladeField.vue";
import { Club } from "~/models/club";

const regattas = useRegattaStore();
const clubs = useClubStore();

const headings = ["Blad", "Vereniging", "Aantal Ploegen"];

async function navigateToClub(club: Club): Promise<void> {
  await clubs.select(club.clubid);
  useRouter().push(`/${useRoute().params.id}/results/club/${clubs.url}`);
}

onMounted(async () => {
  await regattas.select(useRoute().params.id as string);
  await clubs.load();
});
</script>
1
