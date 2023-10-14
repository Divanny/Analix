<script>
import BaseCard from '@/components/BaseCard.vue'
import supabase from '@/supabaseClient'
import { isDark } from '@/composables'
export default {
    components: { BaseCard },
    data() {
        return {
            isDark: isDark,
            products: [],
            categories: [],
            Top10ProductosPorMesChart: {},
            CategoriasConMasVentas: {},
            VentasPorTemporada: {},
            VentasPorMes: {},
        }
    },
    mounted() {
        this.loadTop10ProductosPorMes()
        this.loadCategoriasConMasVentas()
        this.loadVentasPorTemporada()
        this.loadVentasPorMes()
    },
    methods: {
        async loadTop10ProductosPorMes() {
            let { data, error } = await supabase.rpc('top10productosmasvendidos')      

            const labels = data.map(item => item.NombreProducto);
            const series = data.map(item => item.TotalVendido);
            this.Top10ProductosPorMesChart.optionsDark = {
                chart: {
                    type: 'bar',
                    background:'transparent'
                },
                xaxis: {
                    categories: labels,
                },   
                theme: {
                    mode: 'dark', 
                    palette: 'palette4', 
                },
                stroke: {
                    width: 2,
                    curve: 'smooth',
                },
            };
            this.Top10ProductosPorMesChart.optionsLight = {
                chart: {
                    type: 'bar',
                    background:'transparent'
                },
                xaxis: {
                    categories: labels,
                },   
                theme: {
                    mode: 'light', 
                    palette: 'palette4', 
                },
                stroke: {
                    width: 2,
                    curve: 'smooth',
                },
            };
            this.Top10ProductosPorMesChart.series = [
                {
                    name: "Ventas",
                    data: series,
                },
            ];
        },
        async loadCategoriasConMasVentas() {
            let { data, error } = await supabase.rpc('categoriasconmasventas')      

            const labels = data.map(item => item.Nombre);
            const series = data.map(item => item.TotalVendido);
            this.CategoriasConMasVentas.optionsDark = {
                chart: {
                    type: 'bar',
                    background:'transparent'
                },
                xaxis: {
                    categories: labels,
                },   
                theme: {
                    mode: 'dark', 
                    palette: 'palette4', 

                },
                stroke: {
                    width: 2,
                    curve: 'smooth',
                },
            };
            this.CategoriasConMasVentas.optionsLight = {
                chart: {
                    type: 'bar',
                    background:'transparent'
                },
                xaxis: {
                    categories: labels,
                },   
                theme: {
                    mode: 'light', 
                    palette: 'palette4', 

                },
                stroke: {
                    width: 2,
                    curve: 'smooth',
                },
            };
            this.CategoriasConMasVentas.series = [
                {
                    name: "Ventas",
                    data: series,
                },
            ];
        },
        async loadVentasPorTemporada() {
            let { data, error } = await supabase.rpc('ventarportemporada')      

            this.VentasPorTemporada.optionsDark = {
                chart: {
                    type: 'bar',
                    background:'transparent'
                },
                xaxis: {
                    categories: ['Primavera', 'Verano', 'Otoño', 'Invierno'],
                },   
                theme: {
                    mode: 'dark', 
                    palette: 'palette4', 

                },
                stroke: {
                    width: 2,
                    curve: 'smooth',
                },
            };
            this.VentasPorTemporada.optionsLight = {
                chart: {
                    type: 'bar',
                    background:'transparent'
                },
                xaxis: {
                    categories: ['Primavera', 'Verano', 'Otoño', 'Invierno'],
                },   
                theme: {
                    mode: 'light', 
                    palette: 'palette4', 

                },
                stroke: {
                    width: 2,
                    curve: 'smooth',
                },
            };
            this.VentasPorTemporada.series = data.map(product => ({
                name: product.producto,
                data: [product.primavera, product.verano, product.otoño, product.invierno],
            }));
        },
        async loadVentasPorMes() {
            let { data, error } = await supabase.rpc('ventarpormes')      

            this.VentasPorMes.optionsDark = {
                chart: {
                    type: 'line',
                    background:'transparent'
                },
                xaxis: {
                    categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                },   
                theme: {
                    mode: 'dark', 
                    palette: 'palette4', 
                },
                stroke: {
                    width: 2,
                    curve: 'smooth',
                },
            };
            this.VentasPorMes.optionsLight = {
                chart: {
                    type: 'line',
                    background:'transparent'
                },
                xaxis: {
                    categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                },   
                theme: {
                    mode: 'light', 
                    palette: 'palette4', 

                },
                stroke: {
                    width: 2,
                    curve: 'smooth',
                },
            };

            const years = Array.from(new Set(data.map(item => item.year)));

            this.VentasPorMes.series = years.map(year => {
                return {
                    name: year.toString(),
                    data: Array.from({ length: 12 }, (_, monthIndex) => {
                        const monthlyData = data.find(item => item.year === year && item.month === (monthIndex + 1));
                        return monthlyData ? monthlyData.total_ventas : 0;
                    }),
                };
            });
        },
    }
}
</script>

<template>
    <section class="grid grid-cols-1">
        <h2 class="sr-only">Sales charts</h2>

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <!-- Bar chart -->
            <BaseCard title="Productos más vendidos" :actions="[{ title: 'View', to: '#' }]">
                <apexchart type="bar" :options="(isDark) ? Top10ProductosPorMesChart.optionsDark : Top10ProductosPorMesChart.optionsLight" :series="Top10ProductosPorMesChart.series" />
            </BaseCard>
            <BaseCard title="Ventas por meses (ult. 5 años)" :actions="[{ title: 'View', to: '#' }]">
                <apexchart type="line" :options="(isDark) ? VentasPorMes.optionsDark : VentasPorMes.optionsLight" :series="VentasPorMes.series" />
            </BaseCard>
        </div>
    </section>
    <section class="grid grid-cols-1">
        <h2 class="sr-only">Sales charts</h2>
        
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <BaseCard title="Categorias con más ventas" :actions="[{ title: 'View', to: '#' }]">
                <apexchart type="bar" :options="(isDark) ? CategoriasConMasVentas.optionsDark : CategoriasConMasVentas.optionsLight" :series="CategoriasConMasVentas.series" />
            </BaseCard>
            <BaseCard title="Productos más vendidos por temporada" :actions="[{ title: 'View', to: '#' }]">
                <apexchart type="bar" :options="(isDark) ? VentasPorTemporada.optionsDark : VentasPorTemporada.optionsLight" :series="VentasPorTemporada.series" />
            </BaseCard>
        </div>
    </section>
</template>
