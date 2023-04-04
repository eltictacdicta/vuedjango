<template>
    <n-menu :options="options" mode="horizontal">

    </n-menu>
</template>

<script>
import { h } from "vue"
import { RouterLink } from "vue-router"
export default {
  name: 'App',
  data(){
    return {
      options:[
        {
          label: () =>
            h(
              RouterLink,
              {
                to: {
                  name: 'list-elements',
                }
              },
              { default: () => 'Elementos' }
            ),
          key: 'list elements',
        }
      ]
    }
  },
  mounted(){
    
    
    this.categories()
    this.types()
  },
  methods:{
    categories(){
            
            this.$axios.get("http://127.0.0.1:8000/api/category/?format=json").then((res)=>{
                const optionCate=[
                  {
                    label: () =>
                      h(
                        RouterLink,
                        {
                          to: {
                            name: 'list-categories',
                          }
                        },
                        { default: () => 'Listado' }
                      ),
                    key: 'list categories',
                  }
                ]
                res.data.results.forEach( c =>{
                  optionCate.push(
                    {
                      label: () =>
                      h(
                        RouterLink,
                        {
                          to: { name:'list-elements',params:{ type:'c', id:c.id} }
                        },
                        { default: () => c.title }
                      ),
                      key:"c "+c.id
                    }
                  )
                }
                )

                this.options.push({
                      
                      label:"Categorias",
                      key:"1 parent",
                      children:optionCate
                      
                })
            })

            
        }
        ,
        types(){
            
            this.$axios.get("http://127.0.0.1:8000/api/type/?format=json").then((res)=>{
                const optionType=[
                  {
                    label: () =>
                      h(
                        RouterLink,
                        {
                          to: {
                            name: 'list-types',
                          }
                        },
                        { default: () => 'Listado' }
                      ),
                    key: 'list types',
                  }
                ]
                res.data.results.forEach( t =>{
                  optionType.push(
                    {
                      label: () =>
                      h(
                        RouterLink,
                        {
                          to: { name:'list-elements',params:{ type:'t', id:t.id} }
                        },
                        { default: () => t.title }
                      ),
                      key:"t "+t.id
                    }
                  )
                }
                )

                this.options.push({
                      
                      label:"Tipos",
                      key:"2 parent",
                      children:optionType
                      
                })
            })

            
        }
  }
  }
</script>