<script setup>
import { useRouter } from 'vue-router'
import PerfrectScrollbar from '@/components/PerfectScrollbar.vue'
import SidebarLink from '@/components/sidebar/SidebarLink.vue'
import SidebarCollapsible from '@/components/sidebar/SidebarCollapsible.vue'
import SidebarCollapsibleItem from '@/components/sidebar/SidebarCollapsibleItem.vue'

const isCurrentRoute = (routeName) => {
    return useRouter().currentRoute.value.name == routeName
}

const isCurrentPath = (path) => {
    return useRouter().currentRoute.value.path.startsWith(path)
}
</script>

<template>
    <PerfrectScrollbar
        tagname="nav"
        aria-label="main"
        class="relative flex flex-col flex-1 max-h-full gap-4 px-3"
    >
        <SidebarLink
            title="Dashboard"
            :to="{ name: 'Dashboard' }"
            :active="isCurrentRoute('Dashboard')"
            icon="mdi:view-dashboard"
        />

        <SidebarCollapsible
            icon="mdi:note-outline"
            title="Registro"
            :active="isCurrentPath('/Productos') || isCurrentPath('/Ventas')"
        >
            <SidebarCollapsibleItem
                :to="{ name: 'Ventas' }"
                title="Ventas"
                :active="isCurrentRoute('Ventas') || isCurrentRoute('FormularioVentas')"
            />
            <SidebarCollapsibleItem
                :to="{ name: 'Productos' }"
                title="Productos"
                :active="isCurrentRoute('Productos')"
            />
        </SidebarCollapsible>

        <SidebarLink
            title="Recomendaciones"
            :to="{ name: 'Blank' }"
            :active="isCurrentRoute('Blank')"
            icon="mdi:star-outline"
        />

        <!-- <SidebarCollapsible icon="mdi:shield-star-outline" title="Authentication">
            <SidebarCollapsibleItem :to="{ name: 'Login' }" title="Login" />
            <SidebarCollapsibleItem
                :to="{ name: 'Register' }"
                title="Register"
            />
            <SidebarCollapsibleItem
                :to="{ name: 'VerifyEmail' }"
                title="Verify Email"
            />
            <SidebarCollapsibleItem
                :to="{ name: 'ForgotPassword' }"
                title="Forgot Password"
            />
            <SidebarCollapsibleItem
                :to="{ name: 'ResetPassword' }"
                title="Reset Password"
            />
            <SidebarCollapsibleItem
                :to="{ name: 'ConfirmPassword' }"
                title="Confirm Password"
            />
        </SidebarCollapsible> -->
    </PerfrectScrollbar>
</template>
