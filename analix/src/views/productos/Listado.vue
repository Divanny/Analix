<template>
    <PageWrapper title="Productos">
        <div class="relative overflow-x-auto">
            <div class="flex items-center justify-between pb-4">
                <div>
                    <button
                        @click="showForm()"
                        class="inline-flex items-center font-medium text-sm px-3 py-1.5 rounded-md transition-colors text-white bg-teal-600 shadow-lg hover:bg-teal-700"
                        type="button"
                    >
                        <div class="mr-1">
                            <i class="fa-solid fa-plus" />
                        </div>
                        Agregar
                    </button>
                </div>
                <label for="table-search" class="sr-only">Search</label>
                <div class="relative">
                    <div
                        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                    >
                        <svg
                            class="w-5 h-5 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </div>
                    <input
                        type="text"
                        v-model="searchFilter"
                        id="table-search"
                        class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Búsqueda por nombre del producto"
                    />
                </div>
            </div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table
                    class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                >
                    <thead
                        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                    >
                        <tr>
                            <th scope="col" class="px-6 py-3">#</th>
                            <th scope="col" class="px-6 py-3">
                                Nombre del producto
                            </th>
                            <th scope="col" class="px-6 py-3">Categoria</th>
                            <th scope="col" class="px-6 py-3">Cantidad</th>
                            <th scope="col" class="px-6 py-3">Precio</th>
                            <th scope="col" class="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="product, index in products"
                            :class="'bg-white dark:bg-gray-800 dark:border-gray-700 border-b', 'border-b'"
                        >
                            <td class="px-6 py-4">
                                {{ index + 1 + start }}
                            </td>
                            <th
                                scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {{ product.NombreProducto }}
                            </th>
                            <td class="px-6 py-4">
                                {{ product.Categorias.Nombre }}
                            </td>
                            <td class="px-6 py-4">
                                {{ product.Cantidad }}
                            </td>
                            <td class="px-6 py-4">${{ product.Precio.toLocaleString() }}</td>
                            <td class="px-6 py-4 flex items-center">
                                <button
                                    @click="showForm(product)"
                                    class="flex items-center justify-center w-9 h-9 mx-1 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-full-view hover:bg-gray-100 hover:text-teal-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                >
                                    <span class="sr-only">Editar producto</span
                                    >
                                    <i class="fa-solid fa-pen-to-square w-3.5 h-3.5"></i>
                                </button>
                                <button
                                    @click="showConfirmDelete(product.idProducto)"
                                    class="flex items-center justify-center w-9 h-9 mx-1 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-full-view focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none text-red-500 dark:border-red-500 hover:text-white dark:hover:bg-red-600 hover:bg-red-600 hover:border-red-600 focus:ring-red-900"
                                >
                                    <span class="sr-only">Eliminar producto</span
                                    >
                                    <i class="fa-solid fa-trash-can w-3.5 h-3.5"></i>
                                </button>                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <nav
                class="flex items-center justify-between pt-4"
                aria-label="Table navigation"
            >
                <span
                    class="text-sm font-normal text-gray-500 dark:text-gray-400"
                    >Mostrando
                    <span
                        class="font-semibold text-gray-900 dark:text-white"
                        >{{ start + 1 }}-{{ end + 1 }}</span
                    >
                    de
                    <span
                        class="font-semibold text-gray-900 dark:text-white"
                        >{{ totalRows }}</span
                    ></span
                >
                <ul class="inline-flex -space-x-px text-sm h-8">
                    <li>
                        <button
                        @click="changePage((currentPage != 1) ? currentPage - 1 : currentPage )"
                        class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >Anterior</button
                        >
                    </li>
                    <li v-for="page in totalPages">
                        <button
                            @click="changePage(page)"
                            :class="(page == currentPage) ? 'flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                            : 'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'"
                            
                            > {{ page }}</button
                        >
                    </li>
                    <li>
                        <button
                        @click="changePage((currentPage != totalPages) ? currentPage + 1 : totalPages )"
                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >Siguiente</button
                        >
                    </li>
                </ul>
            </nav>
        </div>
        <Modal size="xl" v-if="showFormModal" @close="showFormModal = false">
            <template #header>
                <div class="flex items-center text-lg">
                {{ isEditing ? 'Agregar producto' : 'Editar producto' }}
                </div>
            </template>
            <template #body>
                <Input v-model="product.NombreProducto" placeholder="Ingrese el nombre del producto" label="Nombre (*)" class="mb-2"/>
                <div class="justify-center flex">
                    <Select v-model="product.idCategoria" :options="categories" placeholder="Seleccione" label="Categoría (*)" class="my-2 w-full block mr-2" />
                    <button
                        @click="{ showCategoriaModal = true; showFormModal = false }"
                        class="mb-3 mt-9 inline-flex items-center font-medium text-sm px-3 py-1.5 rounded-md transition-colors text-white bg-teal-600 shadow-lg hover:bg-teal-700"
                        type="button"
                    >
                        <i class="fa-solid fa-plus" />
                    </button>
                </div>
                <div class="grid grid-cols-2 gap-4 my-3">
                    <Input v-model="product.Cantidad" placeholder="Ingrese la cantidad disponible" label="Cantidad (*)" />
                    <Input v-model="product.Precio" placeholder="Ingrese el precio del producto" label="Precio (*)" />
                </div>
            </template>
            <template #footer>
                <div class="flex justify-between">
                <button @click="showFormModal = false" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-teal-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                    Cancelar
                </button>
                <button @click="saveProduct()" :disabled="loading" type="button" class="text-white transition-colors bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">
                    <svg v-if="loading" aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                    </svg>
                    <i v-else class="fa-solid fa-floppy-disk"></i>
                    Guardar
                </button>
                </div>
            </template>
        </Modal>
        <Modal size="xl" v-if="showCategoriaModal" @close="showCategoriaModal = false">
            <template #header>
                <div class="flex items-center text-lg">
                Nueva categoría
                </div>
            </template>
            <template #body>
                <Input v-model="category.NombreCategoria" placeholder="Ingrese el nombre de la categoría" label="Nombre (*)" class="mb-2"/>
                <Textarea rows="4" placeholder="Ingrese la descripción" v-model="message" label="Descripción (*)" />
            </template>
            <template #footer>
                <div class="flex justify-between">
                <button @click="{ showCategoriaModal = false; showFormModal = true }" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-teal-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                    Cancelar
                </button>
                <button @click="saveCategory()" :disabled="loading" type="button" class="text-white transition-colors bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">
                    <svg v-if="loading" aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                    </svg>
                    <i v-else class="fa-solid fa-floppy-disk"></i>
                    Guardar
                </button>
                </div>
            </template>
        </Modal>
    </PageWrapper>
</template>

<script>
import { Modal, Input, Select, Button, Textarea } from 'flowbite-vue'
import PageWrapper from '@/components/PageWrapper.vue'
import supabase from '@/supabaseClient'
import { push } from '@/main'
import useConfirmBeforeAction from "@/utils/useConfirmBeforeAction";

export default {
    components: { PageWrapper, Modal, Input, Select, Button, Textarea },
    data() {
        return {
            loading: false,
            products: [],
            categories: [],
            totalRows: 0,
            totalPages: 0,
            currentPage: 1,
            itemsPerPage: 10,
            showFormModal: false, 
            showCategoriaModal: false,
            isEditing: false,
            start: 1,
            end: 10,
            searchFilter: "",
            category: {
                NombreCategoria: "",
                Descripcion: "",
            },
            product: {
                idProducto: 0,
                NombreProducto: "",
                idCategoria: 0,
                Cantidad: 0,
                Precio: 0
            }
        }
    },
    watch: {
        searchFilter(value) {
            this.loadProducts(true);
            this.loadTotalRows(true)
        }
    },
    mounted() {
        this.loadTotalRows();
        this.loadCategories()
        this.loadProducts()
    },
    methods: {
        async loadTotalRows(filter = null) {
            if (filter){
                const { data, count } = await supabase
                    .from('Productos')
                    .select('*', { count: 'exact', head: true })
                    .ilike('NombreProducto', `%${this.searchFilter}%`)
    
                this.totalRows = count;
                this.totalPages = Math.ceil(this.totalRows / 10);
            }
            else {
                const { data, count } = await supabase
                    .from('Productos')
                    .select('*', { count: 'exact', head: true })
    
                this.totalRows = count;
                this.totalPages = Math.ceil(this.totalRows / 10);
            }
        },
        async loadCategories() {
            let { data: Categorias, error } = await supabase
                .from('Categorias')
                .select('*')

            if (error == null) {
                this.categories = Categorias.map(x => {
                    return ({
                        value: x.idCategoria,
                        name: x.Nombre
                    })
                })
            } else {
                push.error('Error al cargar las categorías')
            }
        },
        async loadProducts(filter = null) {
            this.start = (this.currentPage - 1) * this.itemsPerPage;
            this.end = this.start + this.itemsPerPage - 1;

            if (filter) {
                let { data: Productos, error } = await supabase.from('Productos')
                .select(`
                    *,
                    Categorias (
                        Nombre
                    )
                `)
                .ilike('NombreProducto', `%${this.searchFilter}%`)
                .order('idProducto')
                .range(this.start, this.end);

                if (error == null) {
                    this.products = Productos;
                } else {
                    push.error('Error al cargar los productos')
                }
            }
            else {
                let { data: Productos, error } = await supabase.from('Productos')
                .select(`
                    *,
                    Categorias (
                        Nombre
                    )
                `)
                .order('idProducto')
                .range(this.start, this.end);

                if (error == null) {
                    this.products = Productos;
                } else {
                    push.error('Error al cargar los productos')
                }
            }

        },
        changePage(pageNumber) {
            this.currentPage = pageNumber;
            this.loadProducts();
        },
        async deleteProduct(idProducto) {
            const { error } = await supabase
                    .from('Productos')
                    .delete()
                    .eq('idProducto', idProducto);

            if (error) {
                push.error('Error al eliminar el producto')
            } else {
                push.success('Producto eliminado correctamente')
                this.loadProducts()
            }
        },
        showConfirmDelete(idProducto) {
            useConfirmBeforeAction(
                () => {
                    this.deleteProduct(idProducto);
                },
                {
                    question: "¿Estás seguro?",
                }
            );
        },
        showForm(product = null) {
            this.cleanForm();
            if (product != null) this.product = product; 
            this.showFormModal = true; 
        },
        cleanForm() {
            this.product = {
                idProducto: 0,
                NombreProducto: "",
                idCategoria: 0,
                Cantidad: 0,
                Precio: 0
            }
        },
        async saveProduct() {
            this.loading = true;
            var dataOperation, errorOperation; 
            var userID = (await supabase.auth.getUser()).data.user.id;

            const notification = push.promise("Guardando los productos...")

            try {
                if (this.product.idProducto != null && this.product.idProducto != 0) {
                    console.log(1);
                    const { data, error } = await supabase
                    .from('Productos')
                    .update({ 
                            NombreProducto: this.product.NombreProducto, 
                            idCategoria: this.product.idCategoria,
                            Cantidad: this.product.Cantidad,
                            Precio: this.product.Precio,
                            idUsuario: userID,
                        })
                    .eq('idProducto', this.product.idProducto)
                    .select();

                    dataOperation = data;
                    errorOperation = error;
                }
                else {
                    console.log(2);
                    const { data, error } = await supabase
                    .from('Productos')
                    .insert([
                        { 
                            NombreProducto: this.product.NombreProducto, 
                            idCategoria: this.product.idCategoria,
                            Cantidad: this.product.Cantidad,
                            Precio: this.product.Precio,
                            idUsuario: userID,
                        },
                    ])
                    .select();

                    console.log(error);
                    dataOperation = data;
                    errorOperation = error;
                }

                if (errorOperation == null) {
                    this.product = dataOperation;
                    notification.resolve('Guardado satisfactoriamente');
                    this.cleanForm();
                    this.showFormModal = false;
                    this.loadProducts();
                } else {
                    notification.reject(errorOperation.message)
                }

            }
            catch {
                notification.reject('Error al guardar el producto')
            }
            this.loading = false;
        },
        async saveCategory() {
            var userID = (await supabase.auth.getUser()).data.user.id;
            const notification = push.promise("Guardando los productos...")
            try {

                const { data, error } = await supabase
                    .from('Categorias')
                    .insert([
                            { 
                                Nombre: this.category.NombreCategoria,
                                Descripcion: this.category.Descripcion, 
                                idUsuario: userID,
                            },
                        ])
                    .select();
                if (error == null) {
                    notification.resolve('Guardado satisfactoriamente');
                    this.showCategoriaModal = false;
                    this.showFormModal = true;
                    this.loadCategories();
                } else {
                    notification.reject(error.message)
                }
            }
            catch {
                notification.reject('Error al guardar la categoría')
            }
        }
    },
}
</script>
