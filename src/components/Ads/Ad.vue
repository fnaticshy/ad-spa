<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card v-if="!loading">
          <v-img :src="ad.imageSrc" height="300"></v-img>
          <v-card-text>
            <h2 class="text--primary">
              {{ ad.title }}
            </h2>
            <p>
              {{ ad.description }}
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-edit-modal
              :ad="ad"
              v-if="isOwner"
            ></app-edit-modal>
            <v-btn class="success">Buy</v-btn>
          </v-card-actions>
        </v-card>
        <v-col
          v-else
          class="d-flex justify-center align-center preloader"
        >
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import editAdModal from './EditAdModal'

export default {
  name: 'Ad',
  props: ['id'],
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    ad () {
      const id = this.id
      return this.$store.getters.adById(id)
    },
    isOwner () {
      return this.ad.ownerId === this.$store.getters.user.id
    }
  },
  components: {
    appEditModal: editAdModal
  }
}
</script>

<style lang="scss" scoped>
  .preloader {
    height: calc(100vh - 56px - 24px);
    @media (min-width: 959px) {
      height: calc(100vh - 64px - 24px);
    }
  }
</style>
