<template>
    <PageWrapper title="Productos">
        <div class="relative overflow-x-auto">
            <div class="flex items-center justify-between pb-4">
                <div>
                    <button
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
                        id="table-search"
                        class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Búsqueda por palabras claves"
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
                                {{ index + 1 }}
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
                                    class="flex items-center justify-center w-9 h-9 mx-1 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-full-view hover:bg-gray-100 hover:text-teal-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                >
                                    <span class="sr-only">Editar producto</span
                                    >
                                    <i class="fa-solid fa-pen-to-square w-3.5 h-3.5"></i>
                                </button>
                                <button
                                    @click="showConfirmDelete( product.idProducto)"
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
                        >1-10</span
                    >
                    de
                    <span
                        class="font-semibold text-gray-900 dark:text-white"
                        >{{ totalRows }}</span
                    ></span
                >
                <ul class="inline-flex -space-x-px text-sm h-8">
                    <li>
                        <a
                            href="#"
                            class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >Anterior</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                            >1</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >2</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            aria-current="page"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >3</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >4</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >5</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >Siguiente</a
                        >
                    </li>
                </ul>
            </nav>
        </div>
        
    </PageWrapper>
</template>

<script>
import PageWrapper from '@/components/PageWrapper.vue'
import supabase from '@/supabaseClient'
import { push } from '@/main'
import useConfirmBeforeAction from "@/utils/useConfirmBeforeAction";

export default {
    components: {
        PageWrapper
    },
    data() {
        return {
            loading: true,
            products: [],
            categories: [],
            totalRows: 0,
            totalPages: 0,
            isConfirmed: false
        }
    },
    mounted() {
        this.loadCategories()
        this.loadProducts()
    },
    methods: {
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
        async loadCategories() {
            let { data: Categorias, error } = await supabase
                .from('Categorias')
                .select('*')

            if (error == null) {
                this.categories = Categorias
            } else {
                push.error('Error al cargar las categorías')
            }
        },

        async loadProducts(filter = false) {
            if (filter) {
                
            }

            else {
                let { data: Productos, error } = await supabase.from('Productos')
                .select(`
                *,
                Categorias (
                    Nombre
                )
                `)

                console.log(Productos, error)

                if (error == null) {
                    this.products = Productos;
                    this.totalRows = this.products.length;
                    this.totalPages = this.totalRows / 10;
                } else {
                    push.error('Error al cargar los productos')
                }
            }

        },
    },
}
</script>
