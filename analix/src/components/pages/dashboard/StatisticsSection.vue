<script setup>
import QuiclStatisticsCard from '@/components/QuiclStatisticsCard.vue'

const customersData = [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13]
const visitsData = [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13].reverse()
const ordersData = [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13]
const growthData = [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13]
</script>

<template>
    <section class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <h2 class="sr-only">Quick statistics</h2>

        <!-- Customers card -->
        <QuiclStatisticsCard
            title="Ordenes"
            :chartData="{
                data: [120, 150, 180, 200, 170, 190, 220],
                categories: ['1/11/2023', '2/11/2023', '3/11/2023', '4/11/2023', '5/11/2023', '6/11/2023', '7/11/2023']

            }"
            
            result="220k"
            percentage="32.40%"
            :actions="[{ title: 'View', to: '#' }]"
            icon="mdi:cart-outline"
        />


        <!-- Visits card -->
        <QuiclStatisticsCard
            title="Visits"
            :chartData="visitsData"
            result="-2.6k"
            status="danger"
            percentage="-2.10%"
            :actions="[{ title: 'View', to: '#' }]"
            icon="mdi:eye-outline"
        />

        <!-- Orders card -->
        <QuiclStatisticsCard
            title="Orders"
            :chartData="ordersData"
            result="34.4k"
            status="warning"
            percentage="0.60%"
            :actions="[{ title: 'View', to: '#' }]"
            icon="mdi:cart-outline"
        />

        <!-- Growth card -->
        <QuiclStatisticsCard
            title="Growth"
            :chartData="growthData"
            result="15.6%"
            percentage="7.20%"
            :actions="[{ title: 'View', to: '#' }]"
            icon="mdi:chart-pie"
        />
    </section>
</template>
