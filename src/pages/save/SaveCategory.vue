<template>
    <form @submit.prevent="submit">
    <n-form-item label="Titulo" :feedback="errors.title" :validation-status="errors.title == '' ? 'success' : 'error'">
        <n-input :status="errors.title == '' ? 'success' : 'error'" placeholder="Titulo" v-model:value="form.title" type="text" />
    </n-form-item>
    <n-form-item label="Url limpia" :feedback="errors.url_clean" :validation-status="errors.url_clean == '' ? 'success' : 'error'">
        <n-input :status="errors.url_clean == '' ? 'success' : 'error'" placeholder="Url limpia" v-model:value="form.url_clean" type="text" />
    </n-form-item>
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
            },
            errors:{
                title: "",
                url_clean: ""
            }
        }
    },
    methods:{
        submit(){
            this.cleanForm()
            this.$axios.post("http://127.0.0.1:8000/api/category/",this.form).then((res) => {
                console.log(res.data)
            })
            .catch((error) => {
                if(error.response.data.title)
                    this.errors.title = error.response.data.title[0]
                if(error.response.data.url_clean)
                    this.errors.url_clean = error.response.data.url_clean[0]
            })
        },
        cleanForm(){
            this.errors.title=""
            this.errors.url_clean=""
        }
    }
}
</script>