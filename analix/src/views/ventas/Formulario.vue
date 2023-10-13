<template>
    <header>
        <div class="p-4 sm:p-6">
            <slot name="header">
                <div class="flex justify-between">
                    <h2 class="text-xl font-semibold leading-tight">Formulario de Ventas</h2>
                    <div class="flex">
                        <button
                            class="inline-flex items-center font-medium text-sm px-3 mx-2 py-1.5 rounded-md transition-colors text-white bg-gray-600 shadow-lg hover:bg-gray-700"
                            type="button"
                        >
                            <div class="mr-1">
                                <i class="fa-solid fa-arrow-left" />
                            </div>
                            Volver
                        </button>
                        <button
                            class="inline-flex items-center font-medium text-sm px-3 py-1.5 rounded-md transition-colors text-white bg-teal-600 shadow-lg hover:bg-teal-700"
                            type="button"
                        >
                            <div class="mr-1">
                                <i class="fa-solid fa-save" />
                            </div>
                            Guardar
                        </button>
                    </div>
                </div>
            </slot>
        </div>
    </header>

    <!-- Page Content -->
    <main class="flex-1" :class="{ 'mt-0': !$slots.header }">
        <div class="grid gap-6 px-4 sm:px-6">
            <div class="max-w-xs">
                <Input v-model="fechaVenta" type="date" placeholder="Ingrese el nombre del producto" label="Fecha de la venta (*)"/>
            </div>
            <h3 class="text-lg font-semibold leading-tight mt-2">Productos:</h3>
            <div class="flex justify-start gap-3 align-center flex-col">
                <div class="grid grid-cols-2 gap-4">
                  <Select v-model="productModel.idProducto" :options="products" placeholder="Seleccione" label="Producto (*)" />
                  <div class="grid grid-cols-2 gap-4">
                    <Input type="number" placeholder="Ingrese la cantidad disponible" label="Cantidad (*)" v-model="productModel.Cantidad" />
                    <Input placeholder="Ingrese el precio del producto" label="Precio (*)" v-model="productModel.Precio" />
                  </div>
                </div>
                <div class="justify-end">
                  <div>
                    <button @click="saveProduct()"
                      class="inline-flex block items-center font-medium my-auto text-sm px-3 py-1.5 rounded-md transition-colors text-white bg-teal-600 hover:bg-teal-700"
                      type="button"
                    >
                      <div class="mr-1">
                        <i class="fa-solid fa-plus" />
                      </div>
                      Agregar
                    </button>
                  </div>
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
                            <th scope="col" class="px-6 py-3">Producto</th>
                            <th scope="col" class="px-6 py-3">Cantidad Disponible</th>
                            <th scope="col" class="px-6 py-3">Cantidad Seleccionada</th>
                            <th scope="col" class="px-6 py-3">Cantidad Restante</th>
                            <th scope="col" class="px-6 py-3">Precio</th>
                            <th scope="col" class="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="product, index in productsSelected"
                            :class="'bg-white dark:bg-gray-800 dark:border-gray-700 border-b', 'border-b'"
                        >
                            <td class="px-6 py-4">
                                {{ index + 1 }}
                            </td>
                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ product.NombreProducto }}
                            </td>
                            <td class="px-6 py-4">
                                {{ product.CantidadDisponible }}
                            </td>
                            <td class="px-6 py-4">
                                {{ product.Cantidad }}
                            </td>
                            <td class="px-6 py-4">
                                {{ product.CantidadDisponible - product.Cantidad }}
                            </td>
                            <td class="px-6 py-4">
                                ${{ product.Precio.toLocaleString() }}
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
        </div>
    </main>
</template>

<script>
import { Modal, Input, Select, Button, Textarea } from 'flowbite-vue'
import supabase from '@/supabaseClient'
import { push } from '@/main'

export default {
    components: { Modal, Input, Select, Button, Textarea },
    data() {
        return {
            sale: {},
            products: [],
            productsSelected: [],
            productModel: {
                Cantidad: null,
                Precio: null
            },
            fechaVenta: null,
            isEditingProduct: false,
        }
    },
    mounted() {
        this.loadProducts()
    },
    methods: {
        async loadProducts(filter = null) {
            let { data: Productos, error } = await supabase.from('Productos')
            .select(`
                *,
                Categorias (
                    Nombre
                )
            `)
            .order('idProducto')

            if (error == null) {
                this.products = Productos.map(x => ({
                    value: x.idProducto,
                    name: x.NombreProducto,
                    cantidadDisponible: x.Cantidad,
                }));
            } else {
                push.error('Error al cargar los productos')
            }
        },
        saveProduct() {
            const productFiltered = this.products.filter(x => x.value == this.productModel.idProducto);

            this.productModel.NombreProducto = productFiltered[0].name;
            this.productModel.CantidadDisponible = productFiltered[0].cantidadDisponible;

            if (this.productModel.CantidadDisponible - this.productModel.Cantidad < 0) {
                push.warning("Solo quedan " + this.productModel.CantidadDisponible + " productos disponibles");
                return;
            }

            if (this.isEditingProduct) {

            }
            else {
                this.productsSelected.push(this.productModel);
            }

            this.productModel = {
                Cantidad: null,
                Precio: null
            }

            this.isEditingProduct = false;
        }
    }
}
</script>