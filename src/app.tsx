import React from 'react';
import { Settings as LayoutSettings, PageLoading } from '@ant-design/pro-layout';
import { notification } from 'antd';
import { history, RunTimeLayoutConfig } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { queryCurrent } from './services/user';
import defaultSettings from '../config/defaultSettings';
import AuthenticationUtils from './common/AuthenticationUtils';

export const initialStateConfig = {
  loading: <PageLoading />,
};

export async function getInitialState(): Promise<{
  settings?: LayoutSettings;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const token = AuthenticationUtils.getAccessToken();
      if(!token){
        return undefined;
      }
      const data = await queryCurrent({ headers: { Authorization: token } });
      if(data.success){
        return data.data;
      }
    } catch (error) {
      history.push('/auth/login');
    }
    return undefined;
  };
  
  if (history.location.pathname !== '/auth/login') {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      if (!initialState?.currentUser && location.pathname !== '/auth/login') {
        history.push('/auth/login');
      }
    },
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};

const errorHandler = (error: any) => {
    notification.error({
      description: 'Vui lòng thử lại sau',
      message: 'Có lỗi xảy ra',
    });
  throw error;
};

export const request = {
  errorHandler,
  skipErrorHandler: true,
};
