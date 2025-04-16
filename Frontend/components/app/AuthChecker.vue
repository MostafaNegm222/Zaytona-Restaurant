<script setup>
const token = useCookie("token");
</script>

<template >
<div v-if="!token">
    <slot name="unAuth"/>
</div>
<div v-else>
    <slot name="auth"/>
</div>
</template>