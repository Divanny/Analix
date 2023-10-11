<template>
    <form @submit.prevent="login">
        <div class="grid gap-6">
            <!-- Email input -->
            <div class="space-y-2">
                <Label for="email" value="Correo electrónico de la empresa" />

                <InputIconWrapper icon="mdi:email-outline">
                    <Input
                        withIcon
                        id="email"
                        type="email"
                        class="block w-full"
                        placeholder="Email"
                        v-model="loginForm.email"
                        required
                        autofocus
                        autocomplete="username"
                    />
                </InputIconWrapper>
            </div>

            <!-- Password input -->
            <div class="space-y-2">
                <Label for="password" value="Contraseña" />

                <InputIconWrapper icon="mdi:lock-outline">
                    <Input
                        withIcon
                        id="password"
                        type="password"
                        class="block w-full"
                        placeholder="Contraseña"
                        v-model="loginForm.password"
                        required
                        autocomplete="current-password"
                    />
                </InputIconWrapper>
            </div>

            <!-- Remember me -->
            <div class="flex items-center justify-between flex-wrap">
                <label class="flex items-center">
                    <Checkbox
                        name="remember"
                        v-model:checked="loginForm.remember"
                    />
                    <span class="ml-2 text-sm text-gray-600">Recuérdame</span>
                </label>

                <router-link
                    :to="{ name: 'ForgotPassword' }"
                    class="text-sm text-blue-500 hover:underline"
                >
                    ¿Has olvidado la contraseña?
                </router-link>
            </div>

            <!-- Login button -->
            <div>
                <Button
                    type="submit"
                    class="justify-center w-full gap-2"
                    :disabled="loginForm.processing"
                    left-icon="mdi:login"
                >
                    <span>Iniciar sesión</span>
                </Button>
            </div>

            <p class="text-sm text-gray-600 dark:text-gray-400">
                ¿No te has registrado?
                <router-link
                    :to="{ name: 'Registro' }"
                    class="text-blue-500 hover:underline"
                >
                    Registrarse
                </router-link>
            </p>
        </div>
    </form>
</template>

<script setup>
import { reactive } from 'vue'
import InputIconWrapper from '@/components/InputIconWrapper.vue'
import Label from '@/components/Label.vue'
import Input from '@/components/Input.vue'
import Checkbox from '@/components/Checkbox.vue'
import Button from '@/components/Button.vue'
import supabase from '@/supabaseClient'
import { push } from '@/main'
import router from '@/router'

const loginForm = reactive({
    email: '',
    password: '',
    remember: false,
    processing: false,
})


const login = async () => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: loginForm.email,
            password: loginForm.password,
        })
        console.log(data, error);

        if (error) {
            push.warning("Credenciales inválidas")
        }

        else {
            push.success("Inicio de sesión exitoso");
            router.push('/');
        }
    }
    catch (ex) {
        console.log(ex);
    }

}
</script>