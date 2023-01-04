<template>
    <form @submit.prevent="submit">
    <n-input placeholder="Titulo" v-model:value="form.title" type="text" />
    <n-input placeholder="Url limpia" v-model:value="form.url_clean" type="text" />
    <n-button class="mt-2" type="primary" attr-type="submit">Enviar</n-button>
    </form>
</template>

<script>
export default {
    data(){
        return {
            form:{
                title: "",
                url_clean: ""
            }
        }
    },
    methods:{
        submit(){
            this.$axios.post("http://127.0.0.1:8000/api/category/",this.form).then((res) => {
                console.log(res)
            })
        }
    }
}
</script>