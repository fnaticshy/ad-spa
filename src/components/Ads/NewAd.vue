<template>
  <v-container>
    <v-row justify-md="center">
      <v-col cols="12" md="11">
        <h1 class="text--secondary">Create new AD</h1>
        <v-form ref="form" v-model="valid" validation class="mb-3">
          <v-text-field
            label="Ad title"
            name="title"
            type="text"
            required
            :rules="[v => !!v || 'Title is required']"
            v-model="title"
          />

          <v-textarea
            label="Ad description"
            name="description"
            :rules="[v => !!v || 'Description is required']"
            v-model="description"
          ></v-textarea>
        </v-form>

        <v-row>
          <v-col>
            <v-btn
              color="blue-grey"
              class="white--text warning"
              @click="triggerUpload"
            >
              <v-icon left dark>mdi-upload</v-icon>
              Load Image
            </v-btn>

            <input
              ref="fileInput"
              type="file"
              style="display: none;"
              accept="image/*"
              @change="onFileChange"
            >
          </v-col>
        </v-row>

        <v-row>
          <v-col>
<!--            <img :src="imageSrc" alt="" height="100">-->
            <img
              v-if="imageSrc"
              :src="imageSrc"
              height="100"
            >
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-switch v-model="promo" label="'Add to promo?'"></v-switch>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-spacer></v-spacer>
            <v-btn
              :loading="loading"
              :disabled="!valid || !image || loading"
              class="success"
              @click="createAd"
              >Creae ad</v-btn
            >
          </v-col>
        </v-row>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'NewAd',
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  data () {
    return {
      title: '',
      description: '',
      promo: false,
      valid: false,
      image: null,
      imageSrc: ''
    }
  },
  methods: {
    createAd () {
      if (this.$refs.form.validate() && this.imageSrc) {
        // logic
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          image: this.image
        }

        this.$store.dispatch('createAd', ad)
          .then(() => {
            this.$router.push('/list')
          })
          // пустой блок необходим для маршрутизации
          .catch(() => {})
      }
    },
    triggerUpload () {
      this.$refs.fileInput.click()
    },
    onFileChange (event) {
      //  забираем файл
      const file = event.target.files[0]
      const reader = new FileReader()

      reader.onload = () => {
        // по итогу загрузки,  записываем File/Blob в переменную
        this.imageSrc = reader.result
      }
      // наичнаем загрузку
      reader.readAsDataURL(file)

      this.image = file
    }
  }
}
</script>

<style scoped></style>
