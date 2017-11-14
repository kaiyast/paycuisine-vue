import Mainpage from '@/components/mainpage'
import PromotionDetail from '@/components/promotion/PromotionDetail'
import StoreDetail from '@/components/store/StoreDetail'
import ManageStore from '@/components/manage/ManageStore'
import Signin from '@/components/login/Signin'
import Signup from '@/components/login/Signup'
import Firebaseauth from '@/components/login/Firebaseauth'

import StorePage from '@/components/store/StorePage'
import PromotionPage from '@/components/promotion/PromotionPage'

export const routes = [{
    path: '',
    component: Mainpage,
    name: 'Home'
  },
  {
    path: '/promotion',
    component: PromotionDetail,
    name: 'PromotionDetail'
  },
  {
    path: '/store',
    component: StoreDetail,
    name: 'StoreDetail'
  },
  {
    path: '/manage',
    component: ManageStore,
    name: 'ManageStore',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/signin',
    component: Signin,
    name: 'Signin'
  },
  {
    path: '/signup',
    component: Signup,
    name: 'Signup'
  },
  {
    path: '/promotionpage',
    component: PromotionPage,
    name: 'PromotionPage'
  },
  {
    path: '/storepage',
    component: StorePage,
    name: 'StorePage'
  },
  {
    path: '/*',
    redirect: {
      name: 'Home'
    }
  },
]
