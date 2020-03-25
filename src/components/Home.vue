<template>
  <div>
    <div v-if="!loading">
      <v-container
        class="pa-0"
        fluid
      >
        <v-carousel>
          <v-carousel-item
            v-for="ad of promoAds"
            :key="ad.id"
            :src="ad.imageSrc"
          >
            <div class="carousel-link">
              <v-btn
                class="error"
                :to="`/ad/${ad.id}`"
              >
                {{ad.title}}
              </v-btn>
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-container>

      <v-container>
        <v-row>
          <v-col
            :key="ad.id"
            v-for="ad of ads"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-img :src="ad.imageSrc" height="200px"></v-img>
              <v-card-title>
                {{ ad.title }}
              </v-card-title>
              <v-card-subtitle>
                {{ ad.description }}
              </v-card-subtitle>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :to="`/ad/${ad.id}`"
                >Open</v-btn>
                <!--v-if="ad.ownerId !== ownerId"-->
                <app-buy-modal
                  :ad="ad"
                >
                </app-buy-modal>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-else>
      <v-container>
        <v-row>
          <v-col class="d-flex justify-center align-center preloader">
            <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import BuyModal from './Shared/BuyModal'

export default {
  name: 'Home',
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    promoAds () {
      return this.$store.getters.promoAds
    },
    ads () {
      return this.$store.getters.ads
    }
  },
  components: {
    appBuyModal: BuyModal
  }
}
</script>

<style lang="scss" scoped>
  .carousel-link {
    position: absolute;
    bottom: 50px;
    left: 50%;
    background-color: rgba(0, 0, 0, 0.3);
    transform: translate(-50%, 0);
    padding: 10px 20px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }

  .preloader {
    height: calc(100vh - 56px - 24px);
    @media (min-width: 959px) {
      height: calc(100vh - 64px - 24px);
    }
  }
</style>
