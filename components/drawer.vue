<template>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      location="right"
      width="720"
      @update:model-value="close"
    >
    <div class="d-flex drawer-header align-center justify-space-between bg-background px-3">
        <div class="qtm-h1 text-uppercase" v-text="title" />
          <v-hover v-slot="{ isHovering }">
              <v-btn variant="text" :color="isHovering ? 'secondary' : 'primary'" icon="mdi-close" @click="close" />
          </v-hover>
        </div>
        <div class="drawer-content px-3">
            <slot />
        </div>
        <div class="bg-white drawer-footer d-flex align-center justify-space-between pa-8">
            <div>
                <slot name="actions-left" />
            </div>
            <div>
                <slot name="actions-right" />
            </div>
        </div>
    </v-navigation-drawer>        
</template>

<script setup lang="ts">
    export interface Props {
        title?: string
    }

    withDefaults(defineProps<Props>(), {
        title: '',
    })
    const emit = defineEmits(['close'])
    const drawer = ref(true)

    const close = () => {
        emit('close')
    }
</script>

<style>
.drawer-header {
height: 64px;
position: absolute;
width: 100%;
}

.drawer-content {
height: calc(100vh - 169px);
margin-bottom: 105px;
margin-top: 64px;
overflow-y: auto;
}

.drawer-footer {
bottom: 0;
height: 105px;
position: absolute;
width: 100%;
}
</style>