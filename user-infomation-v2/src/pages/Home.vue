<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import axios from "@/axios";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const selectedFriend = ref(null);
const input = ref("");
const userLogin = JSON.parse(localStorage.getItem("user"));
const store = useStore();

const isYourMessage = (message) => {
  return message.sendBy ===  localStorage.getItem('id');
};

const send = () => {
  if (!input.value.length) return;
  const message = {
    content: input.value,
    to: selectedFriend.value,
    from: localStorage.getItem("id"),
  };
  store.dispatch("SEND_MESSAGEV2", message);
  input.value = "";
};

const people = ref([]);

const getAll = () => {
  axios.get("user/getAllUser").then((res) => {
    people.value = res.data.allUser.filter(item => item._id != localStorage.getItem('id'));
  });
};
getAll();

// const user = computed(() => {
//   return store.getters.user;
// });

// const friends = computed(() => store.getters.friends);

const setId = (value) => {
  selectedFriend.value = value;
};

const loadHistoryChat = async () => {
  axios
    .post("chat/history", {
      idUser1: localStorage.getItem("id"),
      idUser2: selectedFriend.value,
    })
    .then((res) => {
      store.dispatch("LOAD_MESSAGE_CURRENT", res.data.records);
    });
};

loadHistoryChat();
const messageHistory = computed(() => {
  loadHistoryChat();
  return store.getters.messageWithFriendV2;
});

// const messages = computed(() => {
//   if (!selectedFriend.value) return;
//   loadHistoryChat()
//   const friendSocketId = selectedFriend.value;
//   return store.getters.messagesWithFriend(friendSocketId);
// });
const logout = async () => {
  await axios
    .post("user/logout", {
      _id: userLogin._id,
      token: localStorage.getItem("token"),
    })
    .then(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("id");
      return router.replace(route.query.to ? String(route.query.to) : "/login");
    }).catch((err)=>{
      console.log(err)
    })
};
</script>
<template>
  <v-main>
    <v-container fluid class="home-screen">
      <v-row class="home-screen__row">
        <v-col class="d-flex flex-column left-box" cols="4">
          <div>
            <div>
              <h3 class="titlelgout">
                Hi {{ userLogin.name }},
                <button class="Logout" @click="logout()">Logout</button>
              </h3>
            </div>
            <div style="padding-top: 0">
              <h2 class="title">Friends</h2>
            </div>
          </div>
          <v-row class="friends-box">
            <v-col cols="12">
              <v-list dense class="friends_list">
                <v-list-item-group v-model="selectedFriend">
                  <v-list-item
                    @click="setId(friend._id)"
                    v-for="(friend, index) in people"
                    :key="friend._id"
                    :value="friend"
                    class="friend-info"
                  >
                    <v-list-item-icon>
                      <v-icon v-text="index"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="friend.name"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="d-flex flex-column right-box" cols="8">
          <div class="message-box">
            <div
              :class="{ message: true }"
              v-for="message in messageHistory"
              :key="message._id"
            >
              <span
                :class="{
                  'message-text': true,
                  'user-message-text': isYourMessage(message),
                }"
              >
                {{ message.content }}
              </span>
            </div>
          </div>
          <div class="message-box">
            <v-form
              @submit.prevent="send"
              class="d-flex flex-row align-center chat-box"
            >
              <v-text-field
                label="Message"
                placeholder="Message"
                solo
                hide-details="auto"
                v-model="input"
              ></v-text-field>
              <v-btn type="submit" class="chat-box__button-send" large
                >Send</v-btn
              >
            </v-form>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<style scoped>
main {
  background-image: url("https://www.wallpaperbetter.com/wallpaper/555/606/469/sea-sky-beach-2K-wallpaper.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
}

.home-screen {
  padding: 0;
  height: 100%;
  max-width: 1264px;
}

.home-screen__row {
  margin: 0;
  height: 100%;
  max-width: 1264px;
}

.left-box {
  height: 100%;
}

.title {
  height: 30px;
}

.friends-box {
  overflow: auto;
  margin-top: 10px;
  margin-bottom: 10px;
}

.friends-box > .col {
  padding-top: 0;
  padding-bottom: 0;
}

.friends_list {
  background-color: #0000003b !important;
}

.friend-info {
  color: white !important;
  height: 40px;
}

.message-box {
  height: 100%;
  margin: 10px 0;
  overflow: auto;
  background-color: #0000003b;
}

.chat-box {
  height: 48px;
}

.chat-box__button-send {
  height: 48px !important;
}

.message {
  display: flex;
  margin: 10px 20px;
}

.message-text {
  padding: 5px 10px;
  color: white;
  border-radius: 15px;
  background-color: #718093;
  display: flex;
  max-width: 70%;
}

.user-message-text {
  background-color: #2980b9 !important;
  margin-left: auto;
}
.titlelgout {
  height: 30px;
  color: rgb(85, 70, 150);
}
.Logout {
  color: rgb(104, 85, 224);
  background-color: rgba(255, 255, 255, 1);
  cursor: pointer;
  border-radius: 4px;
  font-weight: 600;
  margin: 0 10px;
  width: 70px;
  padding: 0px 0;
  box-shadow: 0 0 20px rgba(104, 85, 224, 0.2);
  transition: 0.4s;
}
.Logout:hover {
  color: white;
  box-shadow: 0 0 20px rgba(104, 85, 224, 0.6);
  background-color: rgba(104, 85, 224, 1);
}
</style>
