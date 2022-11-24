import { defineStore } from "pinia";
import useRegattaStore from "~/stores/useRegattaStore";
import { Team, TeamGet } from "~/models/team";
import { SubTime, Time } from "~/models/time";
import useClubStore from "~/stores/useClubStore";
import useFieldStore from "~/stores/useFieldStore";

interface TeamState {
  ids: string[];
  entities: Map<string, Team>;
  selectedId: string | null;
  sortedIds: string[];
  isLoaded: boolean;
}

export default defineStore("teams", {
  state: (): TeamState => ({
    ids: [],
    entities: new Map<string, Team>(),
    selectedId: null,
    sortedIds: [],
    isLoaded: false,
  }),

  getters: {
    all: (state): Team[] => state.ids.map((id) => state.entities.get(id) ?? ({} as Team)),
    sorted: (state): Team[] => state.sortedIds.map((id) => state.entities.get(id) ?? ({} as Team)),
    selected: (state): Team | null => (state.selectedId && state.entities.get(state.selectedId)) || null,
    theadersClub: (state): string[] =>
      extractHeaders(
        ["", "Veld", "Ploeg"],
        state.ids.map((id) => state.entities.get(id) ?? ({} as Team)),
      ),
    theaders: (state): string[] =>
      extractHeaders(
        ["", "Ploeg"],
        state.ids.map((id) => state.entities.get(id) ?? ({} as Team)),
      ),
  },

  actions: {
    async load(): Promise<void> {
      const regattas = useRegattaStore();
      const fields = useFieldStore();
      const clubs = useClubStore();
      try {
        let url = "";
        if ("club" in useRoute().params) {
          url = `wd/${regattas.selected?.shortname}/${regattas.selected?.jaar}/${clubs.selected?.clubshort}/vereniging`;
        }
        if ("field" in useRoute().params) {
          url = `wd/${regattas.selected?.shortname}/${regattas.selected?.jaar}/${fields.url}/uitslagen`;
        }
        const response = await $fetch<TeamGet>(useRuntimeConfig().BASE_URL + url);

        this.ids = response.teams.map((team) => team.knrbid);
        response.teams.forEach((team) => this.entities.set(team.knrbid, team));
        this.isLoaded = true;
      } catch (error) {
        console.error(error);
        // TODO: Toaster met error message
      }
    },

    async select(id: string): Promise<void> {
      if (!this.isLoaded) await this.load();
      this.selectedId = id;
    },
  },
});

const extractHeaders = (headers: string[], entities: Team[]) => {
  let arr: string[] = [];
  if (entities.length > 0) {
    arr = entities[0].times.map((time: Time) => time.times.map((t: SubTime) => t.name)).flat(1);
  }
  return headers.concat(arr).filter((v, i, a) => a.indexOf(v) === i);
};
