import axios from 'axios';

import { SAVE_USER, SAVE_ERRORS } from '../../../constants/actionTypes';
//import setAuthorizationToken from './utils/setAuthorizationToken';

export const saveUser = user => ({
  type: SAVE_USER,
  user
});

export const saveErrors = errors => ({
  type: SAVE_ERRORS,
  errors
});

export function signup(data) {
  return dispatch => {
    return axios.post('/users', data)
                .then(res => {
                  const authToken = res.headers.authorization.split(' ')[1];
                  try {
                    localStorage.setItem('authToken', authToken);
                    //setAuthorizationToken(authToken);

                    const refreshToken = res.data.refreshToken;
                    localStorage.setItem('refreshToken', refreshToken);

                    const time_to_logout = Date.now() + 60000;
                    localStorage.setItem('timer', JSON.stringify(time_to_logout));
                  } catch(err) {
                    console.log(err);
                  }
                  dispatch(saveUser(res.data.user));
                  return res;
                })
                .catch(err => {
                  throw err.response.data.errors;
                });
  }
}


export function login(data) {
  return dispatch => {
    return axios.post('/users/login', data)
                .then(res => {
                  const authToken = res.headers.authorization.split(' ')[1];
                  sessionStorage.setItem('authToken', authToken);
                  //setAuthorizationToken(authToken);

                  const refreshToken = res.data.refreshToken;
                  localStorage.setItem('refreshToken', refreshToken);

                  const time_to_logout = Date.now() + 60000;
                  localStorage.setItem('timer', JSON.stringify(time_to_logout));

                  dispatch(saveUser(res.data.user));
                  return res;
                })
                .catch(err => {
                  throw err.response.data.errors;
                });
  }
}

// export function refreshToken(refreshToken) {
//   return dispatch => {
//     return axios.post('/users/refreshToken', refreshToken)
//                 .then(newToken => {
//                   return newToken;
//                 })
//                 .catch(err => {
//                   throw err;
//                 })
//   }
// }

export function logout() {
  return dispatch => {
    dispatch(saveUser({}));
    //setAuthorizationToken(false);
    sessionStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  }
}

export function isUserExists(identifier) {
  return dispatch => {
    return axios.get(`/users/search/${identifier}`);
  }
}
