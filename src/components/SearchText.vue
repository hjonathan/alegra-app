<template>
  <div class="d-flex align-stretch">
    <v-text-field
      v-model="message"
      outlined
      clearable
      type="text"
      class="mx-auto"
      placeholder="Busca imagenes..."
      @keydown="search"
    >
      <template v-slot:prepend>
        <v-icon> mdi-magnify </v-icon>
      </template>
      <template v-slot:append>
        <!--v-progress-circular
          size="24"
          color="info"
          indeterminate
        ></v-progress-circular-->
      </template>
    </v-text-field>
    <v-btn depressed color="error" class="btn-search mx-4" @click="btnSearch">
      BUSCAR
    </v-btn>
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import { useGoogleImages } from "./../store/googleImages";
const SearchText = defineComponent({
  name: "SearchText",
  setup() {
    const googleImages = useGoogleImages(),
      message = ref("");
    return {
      message,
      search(ev) {
        if (ev.keyCode == 13) {
          googleImages.getNewSearch(message.value);
        }
      },
      btnSearch() {
        googleImages.getNewSearch(message.value);
      },
    };
  },
});
export default SearchText;
</script>
<style scoped>
.btn-search {
  height: 56px !important;
}
</style>
