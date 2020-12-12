declare namespace API {
  export interface CurrentUser {
    avatar?: string;
    fullname?: string;
    memberType?: number;
    username?: string;
    id?: string;
  }

  export interface Response {
    success?: Boolean;
    message?: string;
    errorCode?: number;
    totalRow?: number;
    data?: any;
  }

  export interface NoticeIconData {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  }
}
