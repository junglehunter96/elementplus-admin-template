<template>
    <div>
        <p style='height: 1500px;'>高度超出，滚动条测试</p>
        <span>aa</span>
    </div>
</template>

<script >
import {  ref } from 'vue'
export default ({
    name: 'ProjectImport',
    setup() {
        const input = ref('')
        return {
            input
        }
    }
})
</script>

