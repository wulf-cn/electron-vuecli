<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>

    <div>
        测试数据请求：{{ admin }}
    </div>

    <button @click="add">调用DLL</button>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

import { ipcRenderer } from 'electron'

export default {
    name: 'Home',
    components: {
        HelloWorld
    },
    data(){
        return{
            admin:""
        }
    },
    mounted () {
        // var _self =this;
        // this.$axios.post("http://XXXXXXXX").then(res=>{
        //     _self.admin = res
        // });
    },
    methods: {
        add(){
            var data = {
                "name":"小明",
                sex:"男",
                age:18
            }
            ipcRenderer.send("calltest" , JSON.stringify(data));
        },
    }
}
</script>
