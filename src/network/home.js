import {request} from './request';

export function getHomeMultidata() {
  return request({
    url:'/home/multidata'
  })
}

//获取首页列表 参数 类型，页码
export function getHomeGoods(type,page) { 
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}