export default class AuthenticationUtils {
  static isAuthenticated() {
    AuthenticationUtils.loadDataIfNeed();
    return !!AuthenticationUtils.accessToken;
  }

  static saveAuthenticationData(data) {
    const { token, user } = data;
    window.localStorage.setItem('access_token', token || '');
    AuthenticationUtils.accessToken = token || '';
    window.localStorage.setItem('user', JSON.stringify(user) || '');
    AuthenticationUtils.user = user;
  }

  static removeAuthenticationData() {
    AuthenticationUtils.saveAuthenticationData({ token: null, user: null });
    AuthenticationUtils.accessToken = '';
    AuthenticationUtils.user = '';
  }

  static loadData() {
    AuthenticationUtils.accessToken = window.localStorage.getItem('access_token') || '';
    AuthenticationUtils.user = JSON.parse(window.localStorage.getItem('user')) || '';
    AuthenticationUtils.dataLoaded = true;
  }

  static loadDataIfNeed() {
    if (AuthenticationUtils.dataLoaded === undefined || !AuthenticationUtils.dataLoaded) {
      AuthenticationUtils.loadData();
    }
  }

  static getUser() {
    AuthenticationUtils.loadDataIfNeed();
    return AuthenticationUtils.user;
  }

  static getAccessToken() {
    AuthenticationUtils.loadDataIfNeed();
    return AuthenticationUtils.accessToken;
  }
}
