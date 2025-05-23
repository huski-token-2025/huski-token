import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { matchRoutes } from 'umi';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
// const loginPath = '/outPage';
// const loginPath = '/home';
const loginPath = '/publicFrame';

export function onRouteChange({ clientRoutes, location }) {
  const route = matchRoutes(clientRoutes, location.pathname)?.pop()?.route;
  if (route) {
    // if (route.path !== loginPath && route.path !== '/developing' && route.path !== '/') {
    //   history.push('/developing');
    // }
  }
}

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  // currentUser?: API.CurrentUser;
  loading?: boolean;
  // fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const { location } = history;
  if (location.pathname !== loginPath) {
    return {
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

export const request = {
  ...errorConfig,
};
