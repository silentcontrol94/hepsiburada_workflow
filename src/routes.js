import App from "./App.vue";
import Home from "./Components/LinksPage"
import AddLink from "./Components/AddLink"

export const routes = [
    { path : '' , component : Home},
    { path : '/add-link' , component : AddLink},
]