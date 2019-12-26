import Vue from "vue";
import VueRouter from "vue-router";
import Kitchen from "../views/Kitchen.vue";
import RecipesList from "../components/Recipes/RecipesList.vue";
import CreateRecipe from "../components/Recipes/AddNewRecipe.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Kitchen",
    component: Kitchen
  },
  {
    path: "/Recipes",
    name: "RecipesList",
    component: RecipesList
  },
  {
    path: "/Recipes/create",
    name: "CreateRecipe",
    component: CreateRecipe,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;