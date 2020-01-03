import './../../modules/css/common.css'
import './index.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import { InfiniteScroll } from 'mint-ui'

Vue.use(InfiniteScroll)
import foot from './../../components/foot.vue'
let app = new Vue({
  el: '#app',
  data: {
    lists: null,
    pageNum: 1,
    pageSize: 6,
    loading: false,
    allLoading: false
  },
  created () {
    this.getLists()
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
    }
  },
  components: {
    foot:foot
  }
})
app.$mount('#app')
