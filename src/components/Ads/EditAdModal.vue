<template>
  <v-dialog
    v-model="modal"
    width="500"
  >
    <template v-slot:activator="{ on }">
      <v-btn color="warning" dark v-on="on">Edit</v-btn>
    </template>

    <v-card>
      <v-container>
        <v-row>
          <v-col>
            <v-card-title class="headline px-0">Edit Ad</v-card-title>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              label="Title"
              name="title"
              type="text"
              v-model="editedTitle"
            />
            <v-textarea
              label="Description"
              name="description"
              v-model="editedDescription"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="onCancel">Cancel</v-btn>
              <v-btn color="success" @click="onSave">Save</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'editAdModal',
  props: ['ad'],
  data () {
    return {
      modal: false,
      editedTitle: this.ad.title,
      editedDescription: this.ad.description
    }
  },
  methods: {
    onSave () {
      this.modal = false

      if (this.editedDescription !== '' && this.editedTitle !== '') {
        this.$store.dispatch('updateAd', {
          title: this.editedTitle,
          description: this.editedDescription,
          id: this.ad.id
        })

        this.modal = false
      }
    },
    onCancel () {
      this.editedDescription = this.ad.description
      this.editedTitle = this.ad.title
      this.modal = false
    }
  }
}
</script>
