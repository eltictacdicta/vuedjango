<template>
    <h1>Listado de tipos</h1>
    <n-button type="primary">
        <router-link :to="{ name:'save-type' }">Crear</router-link>
    </n-button>
    
    <n-table :single-line="false" class="my-table">
        <thead>
            <tr>
                <th>Titulo</th>
                <th>Acciones</th>
            </tr>
            
        </thead>
        <tbody>
            <tr v-for="t in types" :key="t.id">
                <td>{{ t.title }}</td>
                <td>
                    <n-button type="primary">
                        <router-link :to="{ name:'list-elements',params:{ type:'t', id:t.id} }">Elementos</router-link>
                    </n-button>
                    <router-link :to="{ name:'save-type',params:{ id:t.id} }">Editar</router-link>
                </td>
            </tr>
            
        </tbody>
    </n-table>



</template>
<script>
    export default {
        data(){
            return {
                types:[]
            }
        },
        mounted(){
            this.$axios.get("http://127.0.0.1:8000/api/type/?format=json").then((res)=>{
                this.types = res.data.results
            })
        }
        

    }
</script>
