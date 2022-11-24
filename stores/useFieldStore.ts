import { defineStore } from "pinia";
import useRegattaStore from "~/stores/useRegattaStore";
import { Field, GetFieldResponse } from "~/models/field";

interface FieldState {
  ids: string[];
  entities: Map<string, Field>;
  selectedId: string | null;
  isLoaded: boolean;
}

export default defineStore("fields", {
  state: (): FieldState => ({
    ids: [],
    entities: new Map<string, Field>(),
    selectedId: null,
    isLoaded: false,
  }),

  getters: {
    all: (state): Field[] => state.ids.map((id) => state.entities.get(id) ?? ({} as Field)),
    selected: (state): Field | null => (state.selectedId && state.entities.get(state.selectedId)) || null,
    groupedBlock: (state): { [id: number]: Field[] } => {
      const groupedByBlock: { [id: number]: Field[] } = {};
      state.ids.forEach((id) => {
        const field = state.entities.get(id) ?? ({} as Field);
        if (!(field.blocknumber in groupedByBlock)) groupedByBlock[field?.blocknumber as number] = [];
        groupedByBlock[field?.blocknumber as number].push(field);
      });
      return groupedByBlock;
    },
    url: (state): string => encodeURIComponent(state.entities.get(state.selectedId ?? "")?.fieldnameshort ?? ""),
  },

  actions: {
    async load(): Promise<void> {
      if (this.isLoaded) return;
      const regattas = useRegattaStore();
      try {
        const url = `wd/${regattas.selected?.shortname}/${regattas.selected?.jaar}/velden/`;
        const response = await $fetch<GetFieldResponse>(useRuntimeConfig().BASE_URL + url);

        this.ids = response.fields.map((field) => field.field_id);
        response.fields.forEach((field) => this.entities.set(field.field_id, field));
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
      const field = this.all.find((e: Field) => e.fieldnameshort === name);
      this.selectedId = field?.field_id ?? null;
    },
  },
});
