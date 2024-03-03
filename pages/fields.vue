<template>
    <div class="w-75">
        <v-main>
            <v-row>
                <v-col>
                    <h1 class="mb-2">
                        <v-icon size="small">mdi-cog-outline</v-icon>
                        Field configuration
                    </h1>
                </v-col>
                <v-col class="text-right">
                    <create-custom-field @refresh="fetchFields"/>
                </v-col>
            </v-row>
            
            <v-data-table
                :items="fields"
                :headers="headers"
                :loading="loading"
                hover
                @click:row="handleClick"
            >
                <template v-slot:loading>
                    <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
                </template>
            </v-data-table>
        </v-main>
        
        <NuxtPage @refresh="fetchFields" />
    </div>
</template>
<script setup lang="ts">
    const api = useApi()
    const router = useRouter()

    const fields = ref([])
    const loading = ref(true)

    const headers = ref([
        {
          title: 'Name',
          align: 'start',
          sortable: true,
          key: 'name',
        },
        { title: 'Type', key: 'type' },
    ])

    const fetchFields = async () => {
        const { data } = await api({url: '/additional_field_configurations/'})
        fields.value = data.results
    }

    onMounted(async () => {
        loading.value = true
        await fetchFields()
        loading.value = false
    })

    const handleClick = (_, row: any) => {
        router.push(`/fields/${row.item.id}`)
    }
</script>