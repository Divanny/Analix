<script>
import QuiclStatisticsCard from '@/components/QuiclStatisticsCard.vue'
import supabase from '@/supabaseClient'

export default {
    components: { QuiclStatisticsCard },
    data() {
        return {
            ventas: {
                porcentaje: '',
                data: [],
                result: '',
            },
            numeroVentas: {
                porcentaje: '',
                data: [],
                result: '',
            },
            numeroProductos: {
                porcentaje: '',
                data: [],
                result: '',
            },
            crecimiento: {
                porcentaje: '',
                data: [],
                result: '',
            },
            visitsData: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13].reverse(),
            ordersData: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13],
            growthData: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13],
            loading: false
        }
    },
    mounted() {
        this.loadAllData();
    },
    methods: {
        async loadAllData() {
            this.loading = true;
            await this.loadVentas();
            await this.loadNumeroVentas();
            await this.loadNumeroProductos();
            await this.loadCrecimientoVentas();
            this.loading = false;
        },
        formatNumber(num) {
            let absNum = Math.abs(num);
            if (absNum >= 1000) {
                return (num / 1000).toFixed(1) + 'k';
            } else {
                return num;
            }
        },
        async loadVentas() {
            let fechaHoy = new Date();
            let fechaInicio = new Date();
            let fechas = [];
            let ventasData = Array(7).fill(0); // Inicializar un array con 7 valores '0'

            // Restamos 7 días a la fecha de hoy
            fechaInicio.setDate(fechaHoy.getDate() - 7);
            let fechaInicioFormateada = fechaInicio.toISOString().split('T')[0];
            let fechaHoyFormateada = fechaHoy.toISOString().split('T')[0];

            for (let i = 0; i < 7; i++) {
                let fechaConsulta = new Date(fechaInicio); // Clonar la fecha para no modificarla
                fechaConsulta.setDate(fechaInicio.getDate() + i); // Avanzar un día en cada iteración
                fechas.push(fechaConsulta.toISOString().split('T')[0]);
            }


            let { data: Ventas, error } = await supabase
            .from('Ventas')
            .select('*')
            .gte('FechaVenta', fechaInicioFormateada)
            .lte('FechaVenta', fechaHoyFormateada);

            // Mapear los datos de ventas a los días correspondientes
            Ventas.forEach(venta => {
                let fechaVenta = new Date(venta.FechaVenta); // Clonar la fecha para no modificarla

                const index = fechas.indexOf(fechaVenta.toISOString().split('T')[0]);
                if (index !== -1) {
                    ventasData[index] = venta.Total;
                }
            });

            this.ventas.data = ventasData;
            this.ventas.categories = fechas;

            const totalVentas = Ventas.reduce((accumulator, venta) => {
                return accumulator + parseInt(venta.Total);
            }, 0);

            let fechaInicio14 = new Date();
            fechaInicio14.setDate(fechaHoy.getDate() - 14);
            let fechaInicio14Formateada = fechaInicio14.toISOString().split('T')[0];

            const response = await supabase
            .from('Ventas')
            .select('*')
            .gte('FechaVenta', fechaInicio14Formateada)
            .lte('FechaVenta', fechaInicioFormateada);

            console.log(Ventas);

            const totalVentasAnterior = response.data.reduce((accumulator, venta) => {
                return accumulator + parseInt(venta.Total);
            }, 0);

            this.ventas.porcentaje = (((totalVentas  - totalVentasAnterior) / totalVentasAnterior) * 100).toFixed(2);
            this.ventas.result = this.formatNumber(totalVentas - totalVentasAnterior);
        },
        async loadNumeroVentas() {
            let fechaHoy = new Date();
            let fechaInicio = new Date();
            let fechas = [];
            let ventasData = Array(7).fill(0); // Inicializar un array con 7 valores '0'

            // Restamos 7 días a la fecha de hoy
            fechaInicio.setDate(fechaHoy.getDate() - 7);
            let fechaInicioFormateada = fechaInicio.toISOString().split('T')[0];

            for (let i = 0; i < 7; i++) {
                let fechaConsulta = new Date(fechaInicio); // Clonar la fecha para no modificarla
                fechaConsulta.setDate(fechaInicio.getDate() + i); // Avanzar un día en cada iteración
                fechas.push(fechaConsulta.toISOString().split('T')[0]);
            }


            let { data: Ventas, error } = await supabase
            .from('Ventas')
            .select('*')
            .gte('FechaVenta', fechaInicioFormateada);
            
            // Mapear los datos de ventas a los días correspondientes
            Ventas.forEach(venta => {
                let fechaVenta = new Date(venta.FechaVenta); // Clonar la fecha para no modificarla

                const index = fechas.indexOf(fechaVenta.toISOString().split('T')[0]);
                if (index !== -1) {
                    ventasData[index] = ventasData[index] + 1;
                }
            });

            this.numeroVentas.data = ventasData;
            this.numeroVentas.categories = fechas;

            const totalVentas = Ventas.reduce((accumulator, venta) => {
                return accumulator + 1;
            }, 0);

            let fechaInicio14 = new Date();
            fechaInicio14.setDate(fechaHoy.getDate() - 14);
            let fechaInicio14Formateada = fechaInicio14.toISOString().split('T')[0];

            const response = await supabase
            .from('Ventas')
            .select('*')
            .gte('FechaVenta', fechaInicio14Formateada)
            .lte('FechaVenta', fechaInicioFormateada);

            const totalVentasAnterior = response.data.reduce((accumulator, venta) => {
                return accumulator + 1;
            }, 0);
            console.log(totalVentas, totalVentasAnterior)
            this.numeroVentas.porcentaje = (((totalVentas  - totalVentasAnterior) / totalVentasAnterior) * 100).toFixed(2);
            this.numeroVentas.result = this.formatNumber(totalVentas - totalVentasAnterior);
        },
        async loadNumeroProductos() {
            let fechaHoy = new Date();
            let fechaInicio = new Date();
            let fechas = [];
            let productosData = Array(7).fill(0); // Inicializar un array con 7 valores '0'

            // Restamos 7 días a la fecha de hoy
            fechaInicio.setDate(fechaHoy.getDate() - 7);
            let fechaInicioFormateada = fechaInicio.toISOString().split('T')[0];

            for (let i = 0; i < 7; i++) {
                let fechaConsulta = new Date(fechaInicio); // Clonar la fecha para no modificarla
                fechaConsulta.setDate(fechaInicio.getDate() + i); // Avanzar un día en cada iteración
                fechas.push(fechaConsulta.toISOString().split('T')[0]);
            }


            let { data: Productos, error } = await supabase
            .from('Productos')
            .select('*')
            .gte('FechaRegistro', fechaInicioFormateada);
            
            // Mapear los datos de ventas a los días correspondientes
            Productos.forEach(producto => {
                let FechaRegistro = new Date(producto.FechaRegistro); // Clonar la fecha para no modificarla

                const index = fechas.indexOf(FechaRegistro.toISOString().split('T')[0]);
                if (index !== -1) {
                    productosData[index] = productosData[index] + 1;
                }
            });

            this.numeroProductos.data = productosData;
            this.numeroProductos.categories = fechas;

            const totalVentas = Productos.reduce((accumulator, producto) => {
                return accumulator + 1;
            }, 0);

            let fechaInicio14 = new Date();
            fechaInicio14.setDate(fechaHoy.getDate() - 14);
            let fechaInicio14Formateada = fechaInicio14.toISOString().split('T')[0];

            const response = await supabase
            .from('Productos')
            .select('*')
            .gte('FechaRegistro', fechaInicio14Formateada)
            .lte('FechaRegistro', fechaInicioFormateada);
            
            const totalVentasAnterior = response.data.reduce((accumulator, venta) => {
                return accumulator + 1;
            }, 0);
            this.numeroProductos.porcentaje = (totalVentasAnterior != 0) ? ((((totalVentas  - totalVentasAnterior) / totalVentasAnterior) * 100).toFixed(2)) : 0;
            this.numeroProductos.result = this.formatNumber(totalVentas - totalVentasAnterior);
        },
        async loadCrecimientoVentas() {
            let fechaHoy = new Date();
            let fechaInicio = new Date();
            let fechas = [];
            let ventasData = Array(12).fill(0); // Inicializar un array con 12 valores '0'

            // Restamos 12 meses a la fecha de hoy
            fechaInicio.setMonth(fechaHoy.getMonth() - 12);

            for (let i = 0; i < 12; i++) {
                let fechaConsulta = new Date(fechaInicio);
                fechaConsulta.setMonth(fechaInicio.getMonth() + i + 1);
                fechas.push(fechaConsulta.toISOString().split('T')[0]);
            }

            let { data: Ventas, error } = await supabase
                .from('Ventas')
                .select('*')
                .gte('FechaVenta', fechas[0])
                .lte('FechaVenta', fechas[11]); // Ajusta las fechas según tus necesidades

            // Mapear los datos de ventas a los meses correspondientes
            Ventas.forEach(venta => {
                let fechaVenta = new Date(venta.FechaVenta);
                const index = fechas.findIndex(fecha => (new Date(fecha)).getMonth() === fechaVenta.getMonth());
                if (index !== -1) {
                    ventasData[index] = venta.Total;
                }
            });


            this.crecimiento = {
                data: ventasData,
                categories: fechas
            };

            console.log(ventasData, fechas)
            // Calcular el crecimiento porcentual con respecto al año anterior
            let fechaInicioAnoAnterior = new Date(fechaInicio);
            fechaInicioAnoAnterior.setFullYear(fechaInicioAnoAnterior.getFullYear() - 1);
            let fechaInicioAnoAnteriorFormateada = fechaInicioAnoAnterior.toISOString().split('T')[0];

            const responseAnoAnterior = await supabase
                .from('Ventas')
                .select('*')
                .gte('FechaVenta', fechaInicioAnoAnteriorFormateada)
                .lte('FechaVenta', fechas[0]); // Ajusta las fechas según tus necesidades

            const totalVentasAnoAnterior = responseAnoAnterior.data.reduce((accumulator, venta) => {
                return accumulator + parseInt(venta.Total);
            }, 0);

            console.log(responseAnoAnterior);
            this.crecimiento.porcentaje = (((ventasData[11] - totalVentasAnoAnterior) / totalVentasAnoAnterior) * 100).toFixed(2);
            this.crecimiento.result = this.formatNumber(ventasData[11] - totalVentasAnoAnterior);
        },

    }
}
</script>

<template>
    <section class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <h2 class="sr-only">Quick statistics</h2>


        <QuiclStatisticsCard
            title="Ingresos (ult. 7 días)"
            :chartData="{
                data: this.ventas.data ?? [0,0,0,0,0,0,0],
                categories: this.ventas.categories
            }"
            :result=this.ventas.result
            :percentage="(this.ventas.porcentaje + '%')"
            :status="(this.ventas.porcentaje < 0) ? 'danger' : (this.ventas.porcentaje > 0) ? 'success' : 'warning'"
            :actions="[{ title: 'View', to: '#' }]"
            icon="mdi:cash"
            v-if="!loading"
        />


        <!-- Visits card -->
        <QuiclStatisticsCard
            title="# de Ventas"
            :chartData="{
                data: this.numeroVentas.data ?? [0,0,0,0,0,0,0],
                categories: this.numeroVentas.categories
            }"
            :result=this.numeroVentas.result
            :percentage="(this.numeroVentas.porcentaje + '%')"
            :status="(this.numeroVentas.porcentaje < 0) ? 'danger' : (this.numeroVentas.porcentaje > 0) ? 'success' : 'warning'"
            :actions="[{ title: 'View', to: '#' }]"
            icon="mdi:cart-outline"
            v-if="!loading"
        />

        <!-- Orders card -->
        <QuiclStatisticsCard
            title="Nuevos Productos"
            :chartData="{
                data: this.numeroProductos.data ?? [0,0,0,0,0,0,0],
                categories: this.numeroProductos.categories
            }"
            :result=this.numeroProductos.result
            :percentage="(this.numeroProductos.porcentaje + '%')"
            :status="(this.numeroProductos.porcentaje < 0) ? 'danger' : (this.numeroProductos.porcentaje > 0) ? 'success' : 'warning'"
            :actions="[{ title: 'View', to: '#' }]"
            icon="mdi:archive-edit-outline"
            v-if="!loading"
        />

        <!-- Growth card -->
        <QuiclStatisticsCard
            title="Crecimiento"
            :chartData="{
                data: this.crecimiento.data ?? [0,0,0,0,0,0,0],
                categories: this.crecimiento.categories
            }"
            :result=this.crecimiento.result
            :percentage="(this.crecimiento.porcentaje + '%')"
            :status="(this.crecimiento.porcentaje < 0) ? 'danger' : (this.crecimiento.porcentaje > 0) ? 'success' : 'warning'"
            :actions="[{ title: 'View', to: '#' }]"
            icon="mdi:google-analytics"
            v-if="!loading"
        />
    </section>
</template>
