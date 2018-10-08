import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import home from '@/components/home'
import changeMsg from '@/components/changeMsg'
import changePsd from '@/components/changePsd'
import goodslist from '@/components/goodslist'
import classify from '@/components/classify'
import search from '@/components/search'
import page from '@/components/page'
import users from '@/components/users'



Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/', 
      redirect : '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: { requiresAuth: true },
      children:[
        {
            path:'changeMsg',
            name:'changeMsg',
            component:changeMsg,
            meta: { requiresAuth: true }
        },
        {
            path:'changePsd',
            name:'changePsd',
            component:changePsd,
            meta: { requiresAuth: true }
        },
        {
            path:'users',
            name:'users',
            component:users,
            meta: { requiresAuth: true },
//          children:[
//              {
//                  path:'insertuser',
//                  name:'insertuser',
//                  component:insertuser,
//              }
//          ]
        },
        {
            path:'goodslist',
            name:'goodslist',
            component:goodslist,
            meta: { requiresAuth: true }
        },
        {
            path:'classify',
            name:'classify',
            component:classify,
            meta: { requiresAuth: true }
        },
      ]
    },
  ],
});

  //设置路由守卫 , 相当于一个生命周期的函数
    router.beforeEach((to, from, next) => {
        
        if(to.meta.requiresAuth){
            
                if(to.params.result == 'success'){
                    next()
                }else{
                    alert('登陆失败');
                    return false;
                }
            }else{
                next();
        }
    })



export default router
