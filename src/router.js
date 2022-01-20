import { createRouter, createWebHistory } from "vue-router";
    import DataTableFilterDemo from "./DataTableFilterDemo.vue"

    export const router = createRouter({
    history: createWebHistory(),
    routes: [{ path: "/", component: DataTableFilterDemo }]
});