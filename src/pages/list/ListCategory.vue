<template>
    <n-button type="primary">
        <router-link :to="{ name:'save-category' }">Crear</router-link>
    </n-button>
    
    <n-table :single-line="false" class="my-table">
        <thead>
            <tr>
                <th>Titulo</th>
                <th>Acciones</th>
            </tr>
            
        </thead>
        <tbody>
            <tr v-for="c in categories" :key="c.id">
                <td>{{ c.title }}</td>
                <td>
                    <n-button type="primary">
                        <router-link :to="{ name:'list-elements',params:{ type:'c', id:c.id} }">Elementos</router-link>
                    </n-button>
                </td>
            </tr>
            
        </tbody>
    </n-table>

    



</template>
<script>
    export default {
        data(){
            return {
                categories:[]
            }
        },
        mounted(){
            this.$axios.get("http://127.0.0.1:8000/api/category/?format=json").then((res)=>{
                this.categories = res.data.results
            })
        }
        

    }
</script>
