<template>
    <n-button type="primary">
        <router-link :to="{ name:'save-element' }">Crear</router-link>
    </n-button>
    <n-table :single-line="false" class="my-table">
        <thead>
            <tr>
                <th>Titulo</th>
                <th>Acciones</th>
            </tr>
            
        </thead>
        <tbody>
            <tr v-for="e in elements" :key="e.id">
                <td>{{ e.title }}</td>
                <td><n-button type="primary">
                        <router-link :to="{ name:'detail-element',params:{ slug:e.url_clean} }">Ver</router-link>
                    </n-button>
                    <router-link :to="{ name:'save-element',params:{ id:e.id} }">Editar</router-link>
                </td>
            </tr>
            
        </tbody>
    </n-table>

    



</template>
<script>
    export default {
        data(){
            return {
                elements:[]
            }
        },
        mounted(){
            let url = "http://127.0.0.1:8000/api/element/?format=json"
            
            if(this.$route.params.type == "c")
            {
                url = "http://127.0.0.1:8000/api/category/"+this.$route.params.id+"/elements/"
            }
            else if(this.$route.params.type == "t")
            {
                url = "http://127.0.0.1:8000/api/type/"+this.$route.params.id+"/elements/"
            }

            this.$axios.get(url).then((res)=>{
                this.elements = res.data.results ? res.data.results : res.data
            })
        }
        

    }
</script>
