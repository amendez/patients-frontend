<template>
    <div>
      <v-dialog
        v-model="dialog"
        max-width="600"
      >
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            prepend-icon="mdi-file"
            text="Create Field"
            color="primary"
            v-bind="activatorProps"
          ></v-btn>
        </template>
  
        <v-card
          prepend-icon="mdi-file"
          title="New custom field"
        >
          <v-card-text>
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-model="field.name"
                  label="Name"
                  required
                  :rules="[required]"
                />
              </v-col>
  
              <v-col cols="6">
                <v-select
                  v-model="field.type"
                  :items="['Number', 'Text']"
                  label="Type"
                  required
                  :rules="[required]"
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
    const field = ref({})
    const loading = ref(false)
    const api = useApi()
    const { $nt } = useNuxtApp()
    
    const emit = defineEmits(['refresh'])

    const save = async () => {
        loading.value = true
        try {
          const { data } = await api({
              url: `/additional_field_configurations/`,
              method: 'POST',
              data: field.value
          })
          dialog.value = false
          field.value = {}
        }
        catch (error) {          
          for (const key of Object.keys(error.response.data)) {
              $nt.show(`${key}: ${error.response.data[key]}`)
          }
        }
        loading.value = false
        emit('refresh')
    }

    const required = (v: string) => {
        return !!v || 'Field is required'
    }
</script>