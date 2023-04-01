<template>
    <form @submit.prevent="submit">
    <n-form-item label="Titulo" :feedback="errors.title" :validation-status="errors.title == '' ? 'success' : 'error'">
        <n-input :status="errors.title == '' ? 'success' : 'error'" placeholder="Titulo" v-model:value="form.title" type="text" />
    </n-form-item>
    <n-form-item label="Url limpia" :feedback="errors.url_clean" :validation-status="errors.url_clean == '' ? 'success' : 'error'">
        <n-input :status="errors.url_clean == '' ? 'success' : 'error'" placeholder="Url limpia" v-model:value="form.url_clean" type="text" />
    </n-form-item>
    <n-form-item label="Descripción" :feedback="errors.description" :validation-status="errors.description == '' ? 'success' : 'error'">
        <n-input :status="errors.description == '' ? 'success' : 'error'" placeholder="Descripción" v-model:value="form.description" type="textarea" />
    </n-form-item>
    <n-form-item label="Categoría" :feedback="errors.category_id" :validation-status="errors.category_id == '' ? 'success' : 'error'">
        <n-select :status="errors.category_id == '' ? 'success' : 'error'"  v-model:value="form.category_id" :options="options_categories" type="textarea" />
    </n-form-item>
    <n-form-item label="Tipo" :feedback="errors.type_id" :validation-status="errors.type_id == '' ? 'success' : 'error'">
        <n-select :status="errors.type_id == '' ? 'success' : 'error'"  v-model:value="form.type_id" :options="options_types" type="textarea" />
    </n-form-item>
    <n-form-item label="Precio" :feedback="errors.price" :validation-status="errors.price == '' ? 'success' : 'error'">
        <n-input-number :status="errors.price == '' ? 'success' : 'error'" v-model:value=form.price  />
    </n-form-item>
    <n-button class="mt-2" type="primary" attr-type="submit">Enviar</n-button>
    </form>
</template>

<script>
export default {
    data(){
        return {
            options_categories:[],
            options_types:[],
            element:"",
            form:{
                title: "",
                url_clean: "",
                description: "",
                category_id: "",
                type_id: "",
                price: 0
            },
            errors:{
                title: "",
                url_clean: "",
                description: "",
                category_id: "",
                type_id: "",
                price: ""
            }
        }
    },
    async mounted(){
        if(this.$route.params.id){
            await this.getElement()
            this.initElement()
            
        }
        this.categories()
        this.types()
    },
    methods:{
        async getElement(){
            const respuesta = await this.$axios.get("http://127.0.0.1:8000/api/element/"+this.$route.params.id+"/?format=json")
            this.element=respuesta.data
            console.log(this.element)
        },
        initElement(){
            this.form.title = this.element.title
            this.form.url_clean = this.element.url_clean
            this.form.description = this.element.description
            this.form.price =  parseFloat(this.element.price)
            this.form.category_id = this.element.category.id;
            this.form.type_id = this.element.type.id;
        },
        categories(){
            this.$axios.get("http://127.0.0.1:8000/api/category/all/?format=json").then((res)=>{
                this.options_categories = res.data.map(c => {
                    return {
                        label: c.title,
                        value: c.id
                    }
                })
            })
        },
        types(){
            this.$axios.get("http://127.0.0.1:8000/api/type/all/?format=json").then((res)=>{
                this.options_types = res.data.map(t => {
                    return {
                        label: t.title,
                        value: t.id
                    }
                })
            })
        },
        submit(){
            this.cleanForm()
            if(this.element=="")    
            {
                //console.log(JSON.stringify(this.form))
                this.$axios.post("http://127.0.0.1:8000/api/element/?format=json",this.form).then((res) => {
                    console.log(res.data)
                })
                .catch((error) => {
                    if(error.response.data.title)
                        this.errors.title = error.response.data.title[0]
                    if(error.response.data.url_clean)
                        this.errors.url_clean = error.response.data.url_clean[0]
                    if(error.response.data.description)
                        this.errors.description = error.response.description[0]
                    if(error.response.data.price)
                        this.errors.price = error.response.price[0]
                    if (error.response.data.category_id)
                        this.errors.category_id = error.response.data.category_id[0];
                    if (error.response.data.type_id)
                        this.errors.type_id = error.response.data.type_id[0];
                })
            }
            else
            {
                this.$axios.put("http://127.0.0.1:8000/api/element/"+this.$route.params.id+"/?format=json",this.form).then((res) => {
                    console.log(res.data)
                })
                .catch((error) => {
                    if(error.response.data.title)
                        this.errors.title = error.response.data.title[0]
                    if(error.response.data.url_clean)
                        this.errors.url_clean = error.response.data.url_clean[0]
                    if(error.response.data.description)
                        this.errors.description = error.response.data.description[0]
                    if(error.response.data.description)
                        this.errors.price = error.response.data.price[0]
                    if (error.response.data.category_id)
                        this.errors.category_id = error.response.data.category_id[0];
                    if (error.response.data.type_id)
                        this.errors.type_id = error.response.data.type_id[0];
                })
            }
            
        },
        cleanForm(){
            this.errors.title=""
            this.errors.url_clean=""
            this.errors.description=""
            this.errors.price=""
        }
    }
}
</script>