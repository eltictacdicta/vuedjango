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
            type:"",
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
    async mounted(){
        if(this.$route.params.id){
            await this.getType()
            this.initType()
        }

    },
    methods:{
        async getType(){
            const respuesta = await this.$axios.get("http://127.0.0.1:8000/api/type/"+this.$route.params.id+"/?format=json")
            this.type=respuesta.data
            console.log(this.type)
        },
        initType(){
            this.form.title = this.type.title
            this.form.url_clean = this.type.url_clean
        },
        submit(){
            this.cleanForm()
            if(this.type=="")
            {
                this.$axios.post("http://127.0.0.1:8000/api/type/?format=json",this.form).then((res) => {
                    console.log(res.data)
                })
                .catch((error) => {
                    if(error.response.data.title)
                        this.errors.title = error.response.data.title[0]
                    if(error.response.data.url_clean)
                        this.errors.url_clean = error.response.data.url_clean[0]
                })
            }
            else
            {
                this.$axios.put("http://127.0.0.1:8000/api/type/"+this.$route.params.id+"/?format=json",this.form).then((res) => {
                    console.log(res.data)
                })
                .catch((error) => {
                    if(error.response.data.title)
                        this.errors.title = error.response.data.title[0]
                    if(error.response.data.url_clean)
                        this.errors.url_clean = error.response.data.url_clean[0]
                })
            }
            
        },
        cleanForm(){
            this.errors.title=""
            this.errors.url_clean=""
        }
    }
}
</script>