<template>
    
    <div v-if="detailElement != Object" class="max-w-lg">
    <h1 class="text-4xl">{{ detailElement.title }}</h1>
    <hr class="my-4">    
    <p class="text-sm">{{ detailElement.description }}</p></div>


</template>
<script>
    export default {
        data(){
            return {
                detailElement:Object
            }
        },
        mounted(){
            const url = "http://127.0.0.1:8000/api/element/url/?format=json&url_clean=" + this.$route.params.slug
            console.log(url)
            this.$axios.get(url).then((res)=>{
                this.detailElement = res.data
            })
        }
        

    }
</script>
