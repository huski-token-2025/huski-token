import { ProLayoutProps } from '@ant-design/pro-components';

const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  colorPrimary: '#d6ab56',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Huski',
  pwa: true,
  logo: 'https://huski-img.pages.dev/logo.png',
  iconfontUrl: '',
  token: {},
};

export default Settings;
