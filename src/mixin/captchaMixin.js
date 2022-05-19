import { ValidationProvider, ValidationObserver } from "vee-validate";
import { v4 as uuidv4 } from "uuid";
import { getCaptcha } from '@/api/login'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      svg: ''
    }
  },
  mounted() {
    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuidv4()
      localStorage.setItem('sid', sid)
    }
    this.$store.commit('SET_SID', sid)
    this.getCaptcha()
  },
  methods: {
    getCaptcha() {
      let sid = this.$store.state.sid
      getCaptcha({ sid }).then((res) => {
        if (res.code == 200) {
          this.svg = res.data
        }
      })
    },
  }

}