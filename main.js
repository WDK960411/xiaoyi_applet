import Vue from 'vue'
import App from './App'
import uView from 'uview-ui';
import api from 'api/api.js'  //导入接口
Vue.use(uView);
Vue.config.productionTip = false
Vue.prototype.api = api
Vue.prototype.path = 'http://192.168.0.177:8001'
App.mpType = 'app'



const app = new Vue({
    ...App
})
app.$mount()
