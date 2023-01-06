import { createRouter, createWebHistory} from "vue-router"
import ListCategory from  "@/pages/list/ListCategory"
import ListType from  "@/pages/list/ListType"
import ListElement from "@/pages/list/ListElement"
import BasePage from "@/pages/list/BasePage"
import BasePageDetail from "@/pages/detail/BasePageDetail"
import DetailElement from "@/pages/detail/DetailElement"
import SaveCategory from "@/pages/save/SaveCategory"
import BasePageSave from "@/pages/save/BasePageSave"

const routes = [
    {
        name: 'home',
        path: '/',
        component: ListElement
    },
    {
        path: '/list',
        componet:BasePage,
        children:[
            {
                name: 'list-categories',
                path: 'categories',
                component: ListCategory
            },
            {
                name: 'list-types',
                path: 'types',
                component: ListType
            },
            {
                name: 'list-elements',
                path: 'elements/:type?/:id?',
                component: ListElement
            }
        ]
    },
    {
        path: '/detail',
        componet:BasePageDetail,
        children:[
            {
                name: 'detail-element',
                path: 'element/:slug?',
                component: DetailElement
            }
        ]
    },
    {
        path: '/save',
        componet:BasePageSave,
        children:[
            {
                name: 'save-category',
                path: 'category/:id?',
                component: SaveCategory
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
}
)

export default router