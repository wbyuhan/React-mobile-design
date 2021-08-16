
import { renderRoutes, RouteConfig } from 'react-router-config';


interface RouteType extends RouteConfig {
    component?: any;
    exact?: boolean;
    path?: string;
    routes?: RouteConfig[];
    wrappers?: string[];
    title?: string;
    __toMerge?: boolean;
    __isDynamic?: boolean;
    [key: string]: any;

}


const renderRoute: any = (routerConfig: RouteType) => renderRoutes(routerConfig as any)

export default renderRoute
