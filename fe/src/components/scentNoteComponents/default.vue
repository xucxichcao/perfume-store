<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col offset-md="1" cols="12" md="10">
        <v-card light>
          <v-container>
            <v-row justify="center">
              <v-col v-for="(scentNote, i) in scentNotes" :key="i" cols="12">
                <v-card plain outlined>
                  <v-card-title>
                    {{ scentNote.name }}
                  </v-card-title>
                  <v-card-text>
                    {{ scentNote.description }}
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      :to="{
                        name: 'noteDetails',
                        params: { noteSlug: scentNote.id },
                      }"
                      plain
                      text
                      >Xem thêm</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NHDataService from "../../services/NHDataServices";

export default {
  data() {
    return {
      scentNotes: [],
    };
  },
  methods: {
    async retrieveScentNote() {
      await NHDataService.getAllScents()
        .then((response) => {
          const waitting = response.data;
          this.scentNotes = waitting;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  async created() {
    await this.retrieveScentNote();
  },
};
</script>
