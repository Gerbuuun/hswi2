import { defineStore } from "pinia";
import useRegattaStore from "~/stores/useRegattaStore";
import useFieldStore from "~/stores/useFieldStore";
import { DrawGet, DrawItem } from "~/models/draw";

interface DrawState {
  ids: string[];
  entities: Map<string, DrawItem>;
  selectedId: string | null;
  sortedIds: string[];
  isLoaded: boolean;
}

export default defineStore("draw", {
  state: (): DrawState => ({
    ids: [],
    entities: new Map<string, DrawItem>(),
    selectedId: null,
    sortedIds: [],
    isLoaded: false,
  }),

  getters: {
    all: (state): DrawItem[] => state.ids.map((id) => state.entities.get(id) ?? ({} as DrawItem)),
    sorted: (state): DrawItem[] => state.sortedIds.map((id) => state.entities.get(id) ?? ({} as DrawItem)),
    selected: (state): DrawItem | null => (state.selectedId && state.entities.get(state.selectedId)) || null,
  },

  actions: {
    async load(): Promise<void> {
      const regattas = useRegattaStore();
      const fields = useFieldStore();
      try {
        const url = `wd/${regattas.selected?.shortname}/${regattas.selected?.jaar}/${fields.url}/loting`;
        const response = await $fetch<DrawGet>(useRuntimeConfig().BASE_URL + url);

        this.ids = response.teams.map((team) => team.knrbid);
        response.teams.forEach((item) => this.entities.set(item.knrbid, item));
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
