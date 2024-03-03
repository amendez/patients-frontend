<template>
    <div class="w-75">
        <v-main>
            <v-row>
                <v-col>
                    <h1 class="mb-2">
                        <v-icon size="small" class="mt-n2">mdi-account-group</v-icon>
                        Patients
                    </h1>
                </v-col>
                <v-col class="text-right">
                    <create-edit-patient
                        :edit="false"    
                        @refresh="refresh"
                    />
                </v-col>
            </v-row>

            <v-expansion-panels v-if="statusStatsValues.length || cityStatsValues.length" class="my-4">
                <v-expansion-panel>
                    <v-expansion-panel-title>Stats</v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-row>
                            <v-col cols="5" v-if="statusStatsValues.length">
                                <span class="text-caption">Patients per status</span>
                                <v-sparkline
                                    type="bar"
                                    :gradient="['red', 'blue', 'orange', 'green','yellow']"
                                    :line-width="12"
                                    gradient-direction="right"
                                    :labels="statusStatsLabels"
                                    :model-value="statusStatsValues"
                                    :smooth="false"
                                    auto-draw
                                />
                            </v-col>
                            <v-col cols="2"></v-col>
                            <v-col cols="5" v-if="cityStatsValues.length">
                                <span class="text-caption">Patients per city (top 5)</span>
                                <v-sparkline
                                    type="bar"
                                    :gradient="['red', 'blue', 'orange', 'green','yellow']"
                                    :line-width="12"
                                    gradient-direction="right"
                                    :labels="cityStatsLabels"
                                    :model-value="cityStatsValues"
                                    :smooth="false"
                                    auto-draw
                                />
                            </v-col>
                        </v-row>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>


            <v-row class="my-2">
                <v-col cols="10">
                    <v-text-field
                        v-model="search"
                        label="Search"
                        placeholder="Search by name, city, DoB or status"
                        variant="outlined"
                        density="compact"
                        :disabled="loading"
                        :loading="loading"
                        clearable
                        @keyup.enter="searching = search"
                        @click:clear="search = ''; searching = ''"
                    />
                </v-col>
                <v-col cols="2">
                    <v-btn
                        color="primary"
                        :loading="loading"
                        prepend-icon="mdi-magnify"
                        @click="searching = search"
                    >
                        Search
                    </v-btn>
                </v-col>
            </v-row>

            <v-data-table-server
                v-model:items-per-page="itemsPerPage"
                v-model:page="currentPage"
                v-model:sort-by="sortBy"
                :headers="headers"
                :items="serverItems"
                :items-length="totalItems"
                :loading="loading"
                :search="searching"
                hover
                @click:row="handleClick"
                @update:options="loadPatients"
            >
                <template v-slot:loading>
                    <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
                </template>
            </v-data-table-server>
        </v-main>
        
        <NuxtPage @refresh="refresh" />
    </div>
</template>
<script setup lang="ts">
    import { onMounted } from 'vue';
import { VSparkline } from 'vuetify/labs/VSparkline'

    const api = useApi()
    const router = useRouter()

    const loading = ref(true)

    const itemsPerPage = ref(10)
    const totalItems = ref(0)
    const search = ref('')
    const searching = ref('')
    const serverItems = ref([])
    const currentPage = ref(1)
    const sortBy = ref([])

    const cityStatsValues = ref([])
    const cityStatsLabels = ref([])

    const statusStatsValues = ref([])
    const statusStatsLabels = ref([])

    const loadPatients = async ({ page, itemsPerPage, sortBy }) => {
        loading.value = true
        const offset = (page - 1) * itemsPerPage

        let ordering = ""
        if (sortBy.length > 0) {
            const field = sortBy[0].key === 'full_name' ? 'last_name' : sortBy[0].key
            ordering = (sortBy[0].order === 'asc') ? `ordering=${field}&` : `ordering=-${field}&`
        }

        const { data } = await api({url: `/patients/?offset=${offset}&limit=${itemsPerPage}&${ordering}search=${search.value}`})
        serverItems.value = data.results
        totalItems.value = data.count
        loading.value = false
    }

    const headers = ref([
        {
          title: 'Name',
          align: 'start',
          sortable: true,
          key: 'full_name',
        },
        { title: 'Birthdate', key: 'date_of_birth' },
        { title: 'City', key: 'city', sortable: false, },
        { title: 'Status', key: 'status' },
    ])

    const refresh = async () => {
        loadPatients({ page: currentPage.value, itemsPerPage: itemsPerPage.value, sortBy: sortBy.value })
        getStats()
    }

    const handleClick = (_, row: any) => {
        router.push(`/patients/${row.item.id}`)
    }

    const getStats = async () => {
        const { data } = await api({url: `/patients/stats/`})
        cityStatsLabels.value = data.city.map((c: any) => c["addresses__city"])
        cityStatsValues.value = data.city.map((c: any) => c["count"])

        statusStatsLabels.value = data.status.map((c: any) => c["status"])
        statusStatsValues.value = data.status.map((c: any) => c["count"])
    }

    onMounted(getStats)
</script>