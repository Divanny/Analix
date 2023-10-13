<template>
    <PageWrapper title="Ventas">
        <div class="relative overflow-x-auto">
            <div class="flex items-center justify-between pb-4">
                <div>
                    <router-link
                        :to="{name: 'FormularioVentas'}"
                        class="inline-flex items-center font-medium text-sm px-3 py-1.5 rounded-md transition-colors text-white bg-teal-600 shadow-lg hover:bg-teal-700"
                        type="button"
                    >
                        <div class="mr-1">
                            <i class="fa-solid fa-plus" />
                        </div>
                        Agregar
                    </router-link>
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
                        placeholder="Búsqueda por número de venta"
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
                            <th scope="col" class="px-6 py-3"># de Venta</th>
                            <th scope="col" class="px-6 py-3">Cantidad de Productos</th>
                            <th scope="col" class="px-6 py-3">Total</th>
                            <th scope="col" class="px-6 py-3">Fecha de Venta</th>
                            <th scope="col" class="px-6 py-3">
                                Fecha de Registro
                            </th>
                            <th scope="col" class="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="sale in sales"
                            :class="'bg-white dark:bg-gray-800 dark:border-gray-700 border-b', 'border-b'"
                        >
                            <td
                                    scope="row"
                                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                {{ sale.idventa }}
                            </td>
                            <td class="px-6 py-4">
                                {{ sale.cantidadproductos }}
                            </td>
                            <td class="px-6 py-4">
                                ${{ sale.total.toLocaleString() }}
                            </td>
                            <td class="px-6 py-4">
                                {{ formatDate(sale.fechaventa) }}
                            </td>
                            <td class="px-6 py-4">
                                {{ formatDate(sale.fecharegistro) }}
                            </td>
                            <td class="px-6 py-4 flex items-center">
                                <button
                                    class="flex items-center justify-center w-9 h-9 mx-1 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-full-view hover:bg-gray-100 hover:text-teal-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                >
                                    <span class="sr-only">Editar venta</span
                                    >
                                    <i class="fa-solid fa-pen-to-square w-3.5 h-3.5"></i>
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
    </PageWrapper>
</template>

<script>
import { Modal, Input, Select, Button, Textarea } from 'flowbite-vue'
import PageWrapper from '@/components/PageWrapper.vue'
import supabase from '@/supabaseClient'
import { push } from '@/main'

export default {
    components: { PageWrapper, Modal, Input, Select, Button, Textarea },
    data() {
        return {
            loading: false,
            sales: [],
            totalRows: 0,
            totalPages: 0,
            currentPage: 1,
            itemsPerPage: 10,
            start: 1,
            end: 10,
            searchFilter: ""
        }
    },
    watch: {
        searchFilter(value) {
            this.loadSales(true);
            this.loadTotalRows(true)
        }
    },
    mounted() {
        this.loadTotalRows();
        this.loadSales();
    },
    methods: {
        async loadTotalRows(filter = null) {
            if (filter){
                const { data, count } = await supabase
                    .from('Ventas')
                    .select('*', { count: 'exact', head: true })
                    .ilike('idVenta', `%${this.searchFilter}%`)
    
                this.totalRows = count;
                this.totalPages = Math.ceil(this.totalRows / 10);
            }
            else {
                const { data, count } = await supabase
                    .from('Ventas')
                    .select('*', { count: 'exact', head: true })
    
                this.totalRows = count;
                this.totalPages = Math.ceil(this.totalRows / 10);
            }
        },
        async loadSales(filter = null) {
            this.start = (this.currentPage - 1) * this.itemsPerPage;
            this.end = this.start + this.itemsPerPage - 1;

            const query = `
                select
                *,
                (
                    select
                    sum("VentaProductos"."Cantidad") as "CantidadProductos"
                    from
                    "VentaProductos"
                    where
                    "VentaProductos"."idVenta" = "Ventas"."idVenta"
                )
                from
                "Ventas"
            `;


            if (filter) {
                let { data: Ventas, error } = await supabase.from('Ventas')
                .select(`*`)
                .ilike('idVenta', `%${this.searchFilter}%`)
                .order('FechaVenta')
                .range(this.start, this.end);

                if (error == null) {
                    this.sales = Ventas;
                } else {
                    push.error('Error al cargar las ventas')
                }
            }
            else {
                let { data, error } = await supabase.rpc('getventas')      

                if (error == null) {
                    this.sales = data;
                } else {
                    push.error('Error al cargar las ventas')
                }
            }

        },
        changePage(pageNumber) {
            this.currentPage = pageNumber;
            this.loadSales();
        },
        formatDate(dateString) {
            // Create a new Date object from the date string.
            const date = new Date(dateString);

            // Format the date as "MM/DD/YYYY HH:mm:ss".
            const formattedDate = date.toLocaleDateString("en-US", {
                month: "numeric",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
            });

            return formattedDate;
        }
    },
}
</script>
