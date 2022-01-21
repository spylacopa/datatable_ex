import { createRouter, createWebHistory } from "vue-router"
import DataTableFilterDemo from "../components/DataTableFilterDemo.vue"
import DataTableStockArne from '../components/DataTableStockArne'

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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router