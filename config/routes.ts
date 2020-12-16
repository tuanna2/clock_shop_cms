export default [
  {
    path: '/auth',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/auth/login',
        component: './auth/login',
      },
    ],
  },
  {
    path: '/',
    redirect: '/dashboard/analysis',
  },
  // {
  //   path: '/dashboard',
  //   name: 'dashboard',
  //   icon: 'dashboard',
  //   routes: [
  //     {
  //       path: '/',
  //       redirect: '/dashboard/analysis',
  //     },
  //     {
  //       name: 'analysis',
  //       icon: 'smile',
  //       path: '/dashboard/analysis',
  //       component: './dashboard/analysis',
  //     },
  //     {
  //       name: 'monitor',
  //       icon: 'smile',
  //       path: '/dashboard/monitor',
  //       component: './dashboard/monitor',
  //     },
  //     {
  //       name: 'workplace',
  //       icon: 'smile',
  //       path: '/dashboard/workplace',
  //       component: './dashboard/workplace',
  //     },
  //   ],
  // },
  {
    path: '/kho',
    icon: 'table',
    name: 'Quản lý kho',
    routes: [
      {
        path: '/kho',
        redirect: '/kho/product-list',
      },
      {
        name: 'Kho hàng',
        icon: 'smile',
        path: '/kho/product-list',
        component: './kho/product-list',
      },
      {
        name: 'Phiếu nhập xuất',
        icon: 'smile',
        path: '/kho/phieuxuat-list',
        component: './kho/phieuxuat-list',
      },
    ],
  },
  {
    path: '/shop',
    icon: 'table',
    name: 'Quản lý cửa hàng',
    access: 'canOwnerOrAdmin',
    routes: [
      {
        path: '/shop',
        redirect: '/shop/shop-manager',
      },
      {
        name: 'Quản lý cửa hàng',
        icon: 'smile',
        path: '/shop/shop-manager',
        component: './shop/shop-manager',
      },
      {
        name: 'Quản lý nhân viên',
        icon: 'smile',
        path: '/shop/user-manager',
        component: './shop/user-manager',
      },
    ],
  },
  {
    path: '/sale',
    icon: 'table',
    name: 'Quản lý bán hàng',
    routes: [
      {
        path: '/sale',
        redirect: '/sale/sale-manager',
      },
      {
        name: 'Bán hàng',
        icon: 'smile',
        path: '/sale/sale',
        component: './sale/sale',
      },
      {
        name: 'Hoá đơn',
        icon: 'smile',
        path: '/sale/hoadon',
        component: './sale/hoadon',
      },
    ],
  },
  {
    component: './404',
  },
];
