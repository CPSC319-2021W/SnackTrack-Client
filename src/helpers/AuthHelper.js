import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

const refreshTokenSetup = (res) => {
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
    console.log('newToken: ', newAuthRes.id_token);
    setTimeout(refreshToken, refreshTiming);
  };
  setTimeout(refreshToken, refreshTiming);
};

const isAuthenticated = () => {
  return Cookies.get('auth');
};

const isAdmin = () => {
  const token = Cookies.get('auth');
  if (token) {
    const decoded = jwt.decode(token);
    const { is_admin } = decoded;
    if (is_admin) {
      return token;
    }
  }
  return false;
};

const isCommonLogin = (profile) => {
  const {
    userId,
    firstName,
    lastName,
    emailAddress,
    imageUri,
    balance,
    isAdmin
  } = profile;
  return (
    userId &&
    firstName &&
    lastName &&
    !emailAddress &&
    !imageUri &&
    !balance &&
    !isAdmin
  );
};

export { refreshTokenSetup, isAdmin, isAuthenticated, isCommonLogin };
