let host = 'http://192.168.0.168:9999'
if(!IS_DEV){
  host = 'http://www.itheima.com'
}

let url = host + '/getUserInfo'

import axios from 'axios'

export const getUserInfo = () => axios.get(url)