<template>
    <div>
        <nav-bar title="商品评论"></nav-bar>
        <!-- 在商品详情中通过query方式传id,所以子啊这评论通过query方式拿id -->
        <comment :cid="$route.query.id"></comment>

    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>

</style>

