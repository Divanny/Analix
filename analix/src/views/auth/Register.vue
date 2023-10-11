<template>
    <form @submit.prevent="register">
        <div class="grid gap-6">
            <!-- Email input -->
            <div class="space-y-2">
                <Label for="email" value="Email" />

                <InputIconWrapper icon="mdi:email-outline">
                    <Input
                        withIcon
                        id="email"
                        type="email"
                        class="block w-full"
                        placeholder="Email"
                        v-model="registerForm.email"
                        required
                        autocomplete="username"
                    />
                </InputIconWrapper>
            </div>

            <!-- Password input -->
            <div class="space-y-2">
                <Label for="password" value="Password" />

                <InputIconWrapper icon="mdi:lock-outline">
                    <Input
                        withIcon
                        id="password"
                        type="password"
                        class="block w-full"
                        placeholder="Password"
                        v-model="registerForm.password"
                        required
                        autocomplete="new-password"
                    />
                </InputIconWrapper>
            </div>

            <!-- Password confirmation input -->
            <div class="space-y-2">
                <Label for="password_confirmation" value="Confirm Password" />

                <InputIconWrapper icon="mdi:lock-outline">
                    <Input
                        withIcon
                        id="password_confirmation"
                        type="password"
                        class="block w-full"
                        placeholder="Confirm Password"
                        v-model="registerForm.password_confirmation"
                        required
                        autocomplete="new-password"
                    />
                </InputIconWrapper>
            </div>

            <!-- Terms -->
            <div>
                <Label for="terms">
                    <div class="flex items-center">
                        <Checkbox
                            name="terms"
                            id="terms"
                            v-model:checked="registerForm.terms"
                        />

                        <div class="ml-2">
                            I agree to the
                            <a
                                target="_blank"
                                href="#"
                                class="text-sm text-blue-600 underline hover:text-blue-900"
                            >
                                Terms of Service
                            </a>
                            and
                            <a
                                target="_blank"
                                href="#"
                                class="text-sm text-blue-600 underline hover:text-blue-900"
                            >
                                Privacy Policy
                            </a>
                        </div>
                    </div>
                </Label>
            </div>

            <!-- Register button -->
            <div>
                <Button
                    type="submit"
                    class="justify-center w-full gap-2"
                    :disabled="registerForm.processing"
                    left-icon="mdi:account-plus-outline"
                >
                    <span>Registrarse</span>
                </Button>
            </div>

            <!-- Login link -->
            <p class="text-sm text-gray-600 dark:text-gray-400">
                ¿Ya posees una cuenta?
                <router-link
                    :to="{ name: 'Login' }"
                    class="text-blue-500 hover:underline"
                >
                    Iniciar sesión
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

const registerForm = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
    processing: false,
})

const register = async () => {
    try {
        if (registerForm.password_confirmation != registerForm.password) push.warning("Las contraseñas no coinciden");

        const { data, error } = await supabase.auth.signUp({
            email: registerForm.email,
            password: registerForm.password,
        })

        if (error) {
            push.error("Error al registrar. Intentar de nuevo")
        }

        else {
            push.info("Registro exitoso. Favor confirmar correo");
            router.push('/Auth/ConfirmarCorreo');
        }
    }
    catch (ex) {
        console.log(ex);
    }
}
</script>