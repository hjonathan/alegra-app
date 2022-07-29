<template>
  <v-text-field
    v-model="message"
    outlined
    clearable
    type="text"
    class="mx-auto"
    @keydown="search"
  >
    <template v-slot:prepend>
      <v-icon> mdi-magnify </v-icon>
    </template>
    <template v-slot:append>
      <v-progress-circular
        size="24"
        color="info"
        indeterminate
      ></v-progress-circular>
      <img
        width="24"
        height="24"
        src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg"
        alt=""
      />
    </template>
  </v-text-field>
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
          googleImages.getImagesAPI(message.value);
        }
      },
    };
  },
});
export default SearchText;
</script>
