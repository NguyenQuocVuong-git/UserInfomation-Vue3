<script setup>
import { ref, computed, watch } from 'vue';
import socket from "@/socket/socket";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter();

const formRules = {
    username: [(v) => !!v || "Username is required"],
};

const form = ref({
    username: "",
});

const login = () => {
    const { username } = form.value;
    if (!username.length) return;
    socket.auth = { username };
    socket.connect();
};

const user = computed(() => {
    return store.getters.user;
});

watch(user, (newValue, oldValue) => {
    if (!oldValue && newValue) {
        router.push("/");
    }
});
</script>

<template>
    <v-main class="main">
        <v-form @submit.prevent="login">
            <v-container>
                <v-row justify="center">
                    <v-col cols="12" sm="8" md="6">
                        <v-text-field v-model="form.username" label="Username" placeholder="Username"
                            :rules="formRules.username" required outlined></v-text-field>
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-btn color="primary" type="submit" elevation="2" large>Go!</v-btn>
                </v-row>
            </v-container>
        </v-form>
    </v-main>
</template>
    
<style scoped>
.main {
    background-image: url("https://www.wallpaperbetter.com/wallpaper/555/606/469/sea-sky-beach-2K-wallpaper.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

.container {
    margin-top: 200px;
}
</style>
  