import { defineStore } from "pinia";
import { Club, ClubGet } from "~/models/club";
import useRegattaStore from "~/stores/useRegattaStore";

interface ClubState {
  ids: string[];
  entities: Map<string, Club>;
  selectedId: string | null;
  isLoaded: boolean;
}

export default defineStore("clubs", {
  state: (): ClubState => ({
    ids: [],
    entities: new Map<string, Club>(),
    selectedId: null,
    isLoaded: false,
  }),

  getters: {
    all: (state): Club[] => state.ids.map((id) => state.entities.get(id) ?? ({} as Club)),
    selected: (state): Club | null => (state.selectedId && state.entities.get(state.selectedId)) || null,
    url: (state): string => (state.selectedId && state.entities.get(state.selectedId)?.clubshort) || "",
  },

  actions: {
    async load(): Promise<void> {
      const regattas = useRegattaStore();
      try {
        const url = `wd/${regattas.selected?.shortname}/${regattas.selected?.jaar}/clublist/`;
        const response = await $fetch<ClubGet>(useRuntimeConfig().BASE_URL + url);

        this.ids = response.clubs.map((club) => club.clubid);
        response.clubs.forEach((club) => this.entities.set(club.clubid, club));
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

    async selectByURL(name: string): Promise<void> {
      if (!this.isLoaded) await this.load();
      const club = this.all.find((e: Club) => e.clubshort === name);
      this.selectedId = club?.clubid ?? null;
    },
  },
});
