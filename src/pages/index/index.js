import './../../modules/css/common.css'
import './index.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import { InfiniteScroll } from 'mint-ui'
import foot from './../../components/foot.vue'
import swiper from './../../components/swiper.vue'
Vue.use(InfiniteScroll)

let app = new Vue({
  el: '#app',
  data: {
    lists: null,
    pageNum: 1,
    pageSize: 6,
    loading: false,
    allLoading: false,
    bannerLists: null
  },
  created () {
    this.getLists()
    this.getBanner()
  },
  methods: {
    getLists () {
      if (this.allLoading) return
      this.loading = true
      axios.get(url.hotLists, {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        let curLists = res.data.lists
        // 判断所有数据是否加载完毕
        if (curLists.lenth < this.pageSize) {
          this.allLoading = true
        }
        if (this.lists) {
          this.lists = this.lists.concat(curLists)
        } else {
          // 第一次请求数据
          this.lists = curLists
        }
        this.loading = false
        this.pageNum++
      })
    },
    getBanner () {
      axios.get(url.banner).then(res => {
        this.bannerLists = res.data.lists
      })
    }
  },
  components: {
    foot,
    swiper
  }
})
app.$mount('#app')
