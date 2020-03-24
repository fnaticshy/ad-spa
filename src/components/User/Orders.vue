<template>
    <v-container>

        <v-row justify-md="center">
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

    </v-container>
</template>

<script>
export default {
  name: 'Orders',
  data () {
    return {
      orders: [
        {
          adId: '123e',
          name: 'Vlas',
          phone: '9-999-999-99-99',
          done: false
        }
      ]
    }
  },
  methods: {
    markDone (order) {
      order.done = true
    }
  }
}
</script>

<style scoped>
  .list-item-btn {
    z-index: 1;
  }
</style>
