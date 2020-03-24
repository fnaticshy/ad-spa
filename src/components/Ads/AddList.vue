<template>
  <v-container>
    <v-row v-if="!loading && myAds.length !== 0">
      <v-col cols="12" sm="8" offset-sm="2">
        <h1 class="text--secondary">My ads</h1>

        <v-card
          class="elevation-10 mb-3"
          v-for="ad of myAds"
          :key="ad.id"
        >
          <v-row>
            <v-col cols="5 py-0 pr-0">
              <v-img
                :src="ad.imageSrc"
                height="175"
              ></v-img>
            </v-col>
            <v-col cols="7">
              <v-card-text>
                <h2 class="text--primary">{{ad.title}}</h2>
                <p>{{ad.description}}</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  class="info"
                  :to="`/ad/${ad.id}`"
                >Open</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else-if="!loading && myAds.length === 0">
      <v-col>
        <h1>You have no ads</h1>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col class="d-flex justify-center align-center preloader">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AddList',
  computed: {
    myAds () {
      return this.$store.getters.myAds
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  data () {
    return {
    }
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
