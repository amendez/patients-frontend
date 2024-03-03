<template>
    <div>
      <v-dialog
        v-model="dialog"
        max-width="600"
      >
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            :text="props.edit ? '' : 'Add Address'"
            :prepend-icon="props.edit ? 'mdi-pencil' : 'mdi-plus'"
            color="primary"
            :variant="props.edit ? 'icon' : 'text'"
            v-bind="activatorProps"
          ></v-btn>
        </template>
  
        <v-card
          prepend-icon="mdi-map-marker"
          :title="title"
        >
          <v-card-text>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="internalAddress.address1"
                  label="Address 1"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="internalAddress.address2"
                  label="Address 2"
                  required
                />
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="internalAddress.state"
                  label="State"
                  :items="states"
                  required
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="internalAddress.city"
                  label="City"
                  required
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="internalAddress.zip_code"
                  label="Zipcode"
                  required
                />
              </v-col>
            </v-row>
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
  
            <v-btn
              text="Close"
              variant="plain"
              :loading="loading"
              @click="dialog = false"
            ></v-btn>
  
            <v-btn
              color="primary"
              text="Save"
              :loading="loading"
              @click="save"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>

<script setup lang="ts">
    const dialog = ref(false)
    const internalAddress = ref({})
    const loading = ref(false)
    const api = useApi()
    const { $nt } = useNuxtApp()

    const states = ref(["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"])
    
    const props = defineProps({
      patientId: {
          type: Number,
          required: true
      },
      address: {
          type: Object,
          default: () => ({})
      },
      edit: {
          type: Boolean,
          default: false
      }
    })

    onMounted(() => {
        if (props.edit) {
          internalAddress.value = props.address
        }
    })

    const emit = defineEmits(['refresh'])

    const title = computed(() => props.edit ? 'Edit Address' : 'Add address')

    const save = async () => {
        loading.value = true
        let url, method

        internalAddress.value.patient = props.patientId
        internalAddress.value.country = 'USA'
        
        if (props.edit) {
            url = `/addresses/${props.address.id}/`
            method = 'PATCH'
        } else {
            url = `/addresses/`
            method = 'POST'
        }

        try {
          const { data } = await api({
              url,
              method,
              data: internalAddress.value
          })
          internalAddress.value = {}
          emit('refresh')
          dialog.value = false
        }
        catch (error) {          
          for (const key of Object.keys(error.response.data)) {
              $nt.show(`${key}: ${error.response.data[key]}`)
          }
        }
        loading.value = false
    }
</script>