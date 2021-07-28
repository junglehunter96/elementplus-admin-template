<template>
    <router-view />
</template>

<script>
import { changeThemeDefaultColor } from '@/utils/changeThemeColor'

export default ({
    name: 'App',
    setup() {
        changeThemeDefaultColor()
    }
})
</script>
