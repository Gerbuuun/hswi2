import { defineStore } from "pinia";
import { GetRegattasResponse, Regatta } from "~/models/regatta";
import { useDateFormatter } from "~/composables/useDateFormatter";

interface RegattaState {
  ids: string[];
  entities: Map<string, Regatta>;
  selectedId: string | null;
  filteredIds: string[];
  isLoaded: boolean;
}

export default defineStore("regattas", {
  state: (): RegattaState => ({
    ids: [],
    entities: new Map<string, Regatta>(),
    selectedId: null,
    filteredIds: [],
    isLoaded: false,
  }),

  getters: {
    all: (state): Regatta[] =>
      state.ids
        .map((id) => state.entities.get(id) ?? ({} as Regatta))
        .sort((a: Regatta, b: Regatta) => useDateFormatter().isBeforeOrAfter(a.jaar, b.jaar)),
    selected: (state): Regatta | null => (state.selectedId && state.entities.get(state.selectedId)) || null,
    recent: (state): Regatta[] => state.ids.map((id) => state.entities.get(id) ?? ({} as Regatta)).slice(0, 3),
    filtered: (state): Regatta[] =>
      state.filteredIds
        .map((id) => state.entities.get(id) ?? ({} as Regatta))
        .sort((a: Regatta, b: Regatta) => useDateFormatter().isBeforeOrAfter(a.jaar, b.jaar)),
    exists: (state): boolean => state.selectedId !== null,
  },

  actions: {
    async load(): Promise<void> {
      try {
        const response = await $fetch<GetRegattasResponse>(useRuntimeConfig().BASE_URL);
        this.ids = response.regattas.map((regatta) => regatta.rid);
        this.filteredIds = this.ids;
        response.regattas.forEach((regatta) => this.entities.set(regatta.rid, regatta));
        this.isLoaded = true;
      } catch (error) {
        console.error(error);
        // TODO: Toaster met error message
      }
    },

    async select(rid: string): Promise<void> {
      if (!this.isLoaded) await this.load();
      this.selectedId = rid;
    },

    filter(name: string): void {
      if (name.length === 0) {
        this.filteredIds = this.ids;
      }
      this.filteredIds = this.ids.filter((id) => {
        const regatta = this.entities.get(id) ?? ({} as Regatta);
        return (
          regatta.regattaname.toLowerCase().includes(name.toLowerCase()) ||
          regatta.shortname.includes(name) ||
          regatta.jaar.getFullYear().toString().includes(name)
        );
      });
    },
  },
});
