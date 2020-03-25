<template>
    <v-container>

        <v-row v-if="loading">
          <v-col class="d-flex justify-center align-center preloader">
            <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </v-col>
        </v-row>
        <v-row
          v-else-if="!loading && orders.length !==0"
          justify-md="center"
        >
            <v-col cols="12" md="11" >
              <h1 class="text--secondary">Orders</h1>
              <v-list
                two-line
                flat
              >
                <v-list-item-group
                multiple
                v-for="order in orders"
                :key="order.id"
              >
                <v-list-item
                  :ripple="false"
                >
                  <template>
                    <v-list-item-action>
                      <v-checkbox
                        color="green"
                        :input-value="order.done"
                        @click="markDone(order)"
                      ></v-checkbox>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title>{{order.name}}</v-list-item-title>
                      <v-list-item-subtitle>{{order.phone}}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-btn :to="`/ad/${order.adId}`" class="primary list-item-btn">Open</v-btn>
                    </v-list-item-action>

                  </template>
                </v-list-item>

              </v-list-item-group>
              </v-list>
            </v-col>
        </v-row>
        <v-row v-else>
          <v-col>
            <h1 class="text--secondary">You have no orders</h1>
          </v-col>
        </v-row>

    </v-container>
</template>

<script>
export default {
  name: 'Orders',
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    orders () {
      return this.$store.getters.orders
    }
  },
  methods: {
    markDone (order) {
      this.$store.dispatch('markOrderDone', order.id)
        .then(() => {
          order.done = true
        })
        .catch(() => {})
    }
  },
  created () {
    this.$store.dispatch('fetchOrders')
  }
}
</script>

<style lang="scss" scoped>
  .list-item-btn {
    z-index: 1;
  }
  .preloader {
    height: calc(100vh - 56px - 24px);
      @media (min-width: 959px) {
        height: calc(100vh - 64px - 24px);
      }
  }
</style>
