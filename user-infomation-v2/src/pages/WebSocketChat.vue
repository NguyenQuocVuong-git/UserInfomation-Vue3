<script setup>
import { ref } from 'vue';

const connect = ref(false);
const username = ref('');
const text = ref('');
const messages = ref([]);

let socket = new WebSocket('ws://localhost:3000')
console.log("🚀 ~ file: WebSocketChat.Vue:10 ~ socket:", socket)

const handleSubmit = () => {
    connect.value = true;
};

const handleMessageSubmit = () => {
    const newMessage = { username: username.value, message: text.value };
    messages.value.push(newMessage);
    socket.send(JSON.stringify(newMessage))
    text.value = '';
};

socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        messages.value.push(message);
      }

</script>
<template>
    <div class="chat-container">
        <div v-if="!connect">
            <div class="modal-background">
                <div class="modal-content">
                    <form @submit.prevent="handleSubmit">
                        <h3> Enter your name to start chatting </h3>
                        <input type="text" v-model="username" placeholder="Enter your name" />
                        <br>
                        <button type="submit"> Connect </button>
                    </form>
                </div>
            </div>
        </div>
        <div v-if="connect" class="chat-window">
            <div class="messages-container">
                <div v-for="(message, index) in messages" :key="index"
                    :class="[message.username === username ? 'left-bubble' : 'right-bubble']">
                    <b>{{ message.username }}</b>: <em>{{ message.message }}</em>
                </div>
            </div>
            <div class="chat-input">
                <form @submit.prevent="handleMessageSubmit">
                    <input type="text" v-model="text" placeholder="Write message..." />
                    <button type="submit"><i class="bi bi-send "></i> </button>
                </form>
            </div>
        </div>
    </div>
</template>
  

  
<style scoped>
.left-bubble {
    text-align: left;
    background-color: #e0e0e0;
    padding: 8px;
    margin: 4px;
}

.right-bubble {
    text-align: right;
    background-color: #4CAF50;
    color: white;
    padding: 8px;
    margin: 4px;
}

.chat-container {
    max-width: 600px;
    margin: 0 auto;
}

.chat-window {
    border: 1px solid #ccc;
    margin-top: 16px;
}

.messages-container {
    max-height: 200px;
    overflow-y: auto;
}

.chat-input {
    display: flex;
}

.chat-input input {
    flex: 1;
    margin-right: 8px;
}
</style>
  