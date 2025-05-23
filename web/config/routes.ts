export default [
  {
    path: '/',
    redirect: '/publicFrame',
  },
  {
    path: '/publicFrame',
    name: 'publicFrame',
    layout: false,
    component: './PublicFrame',
    routes: [
      { path: '/publicFrame', redirect: '/publicFrame/Mine' },
      { path: 'Home', component: '@/pages/HuskiHome/index' },
      { path: 'Mine', component: '@/pages/HuskiPlay/Mine/mine' },
      { path: 'Lottery', component: '@/pages/HuskiDeveloping/developing' },
      { path: 'Battle', component: '@/pages/HuskiDeveloping/developing' },
      { path: 'Stake', component: '@/pages/HuskiStake/index' },
      { path: 'Airdrop', component: '@/pages/HuskiDeveloping/developing' },
    ],
  },
];
