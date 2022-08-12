import { Swipe, SwipeItem, Popup } from 'vant';

let plugins = [ Swipe, SwipeItem, Popup ]

export default function getVant(app){
    plugins.forEach((plugin)=>{
        return app.use(plugin)
    })
}