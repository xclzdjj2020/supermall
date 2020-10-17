import {request} from './request';

export function getHomeMultidata() {
  return request({
    url:'/home/multidata'
    // url:'/doe.ydxx.service2018/GPServer.asmx/QueryRouteInfo',
  })
}