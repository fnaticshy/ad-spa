<template>
  <v-dialog v-model="modal" width="500">
    <template v-slot:activator="{ on }">
      <v-btn
        color="primary ml-3"
        dark v-on="on"
      >
        Buy
      </v-btn>
    </template>

    <v-card>
      <v-container>
        <v-row>
          <v-col>
            <v-card-title class="headline px-0"
              >Do you want to buy it?</v-card-title
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              label="Your name"
              name="name"
              type="text"
              v-model="name"
            />
            <v-text-field
              label="Your phone"
              name="phone"
              type="text"
              v-model="phone"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="onCancel" :disabled="localLoading">
                Close
              </v-btn>
              <v-btn
                color="success"
                @click="onSave"
                :disabled="localLoading"
                :loading="localLoading"
              >
                Buy it
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'BuyModal',
  props: ['ad'],
  computed: {
    ownerId () {
      return this.$store.getters.user.id
    }
  },
  data () {
    return {
      modal: false,
      name: '',
      phone: '',
      // используем локальное состояние загрузки, что бы не перезагружать стр.
      // показываем загрузку только в модально окне.
      localLoading: false
    }
  },
  methods: {
    onSave () {
      if (this.name !== '' && this.phone !== '') {
        this.localLoading = true
        this.$store
          .dispatch('createOrder', {
            name: this.name,
            phone: this.phone,
            adId: this.ad.id,
            ownerId: this.ad.ownerId
          })
          .finally(() => {
            this.name = ''
            this.phone = ''
            this.localLoading = false
            this.modal = false
          })
      }
    },
    onCancel () {
      this.name = ''
      this.phone = ''
      this.modal = false
    }
  }
}
</script>
