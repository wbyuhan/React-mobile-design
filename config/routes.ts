import Home from '@/pages/Home'
import Demo from "@/pages/Demo";
import Ower from "@/pages/Ower";


export const routerConfig = [
    {
        path: '/',
        name: 'index',
        component: Home,
    },
    {
        path: 'demo',
        name: 'Demo',
        component: Demo,
    },
    {
        path: 'ower',
        name: 'Ower',
        component: Ower,
    },
]