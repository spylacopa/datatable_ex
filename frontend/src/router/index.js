import { createRouter, createWebHistory } from "vue-router"
import DataTableFilterDemo from "../components/DataTableFilterDemo.vue"
import DataTableStockArne from '../components/DataTableStockArne'
import DataTableStateDemo from "../components/DataTableStateDemo.vue"

const routes = [
    {
        path: '/DataTableFilterDemo',
        name: 'DataTableFilterDemo',
        component: DataTableFilterDemo
    },
    {
        path: '/DataTableStockArne',
        name: 'StockArne',
        component: DataTableStockArne
    },
    {
        path: '/DataTableStateDemo',
        name: 'DataTableStateDemo',
        component: DataTableStateDemo
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router