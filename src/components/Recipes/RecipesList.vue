<template>
    <div>
        <!-- page nav -->
        <PageNav>
            <div slot="back-btn">
                <button class="btn back-btn" v-backBtn><i class="fas fa-chevron-left"></i></button>
            </div>
            <h4 slot="title" class="m-0">Recipes</h4>
            <button slot="nav-actions" class="btn btn-primary" @click="newRecipe"><i
                    class="fas fa-plus-circle mr-2"></i> New
                Recipe</button>
        </PageNav>
        <!-- end page nav -->

        <div class="table-responsive">
            <table class="table border" v-if="recipesList">
                <thead>
                    <tr class="gray-text">
                        <th scope="col">id</th>
                        <th scope="col">Dish Name</th>
                        <th scope="col">Preparation time</th>
                        <th scope="">View</th>
                        <!-- <th scope="">Edit</th> -->
                        <th scope="">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in recipesList" :key="item.id">
                        <th scope="row">{{ item.id }}</th>
                        <td>{{ item.name }}</td>
                        <td>{{ item.time }}</td>
                        <td class="gray-text"><i class="fas fa-eye table-icon" @click="viewRecipe(item.id)"></i></td>
                        <!-- <td class="gray-text"><i class="fas fa-pencil-alt table-icon"></i></td> -->
                        <td class="gray-text"><i class="fas fa-trash table-icon"
                                @click="showConfirmDeleteModal(item)"></i></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- view recipe modal -->
        <ViewRecipeModal :recipeItem="activeItem" />

        <!-- delete recipe modal -->
        <DeleteRecipe :itemId="activeItemId" @deleteRecipe="getRecipesList" />

        <!-- select dish modal -->
        <SelectDishModal />
    </div>
</template>
<style lang="scss" scoped>
    .table {
        background: #fff;

        .gray-text {
            color: rgba(128, 128, 128, 0.7);
        }

        .table-icon {
            cursor: pointer;
            padding: 5px;
        }
    }
</style>

<script>
    import PageNav from "../layout/PageNav";
    import ViewRecipeModal from "./viewRecipe";
    import DeleteRecipe from "./DeleteRecipe";
    import SelectDishModal from "./SelectDish";
    import axios from "../../axios";
    export default {
        name: "RecipesList",
        components: {
            PageNav,
            ViewRecipeModal,
            DeleteRecipe,
            SelectDishModal
        },
        data() {
            return {
                recipesList: null,
                activeItem: {}
            }
        },
        computed: {
            activeItemId() {
                return this.activeItem.id;
            }
        },
        created() {
            this.getRecipesList();
        },
        methods: {
            getRecipesList() {
                axios.get()
                    .then(res => {
                        this.recipesList = res.data;
                        console.log(res.data);
                    })
                    .catch(err => {
                        console.log(err.data);
                    });
            },
            viewRecipe(id) {
                axios.get(`/${id}`)
                    .then(res => {
                        console.log(res.data);
                        this.activeItem = res.data;
                        this.$bvModal.show('view-recipe-modal')
                    })
                    .catch(err => {
                        console.log(err.data);
                    });
                console.log(id);
            },
            showConfirmDeleteModal(item) {
                this.activeItem = item;
                this.$bvModal.show('delete-recipe-modal');
            },
            newRecipe() {
                this.$bvModal.show('select-dish-modal')
            }

        }
    }
</script>