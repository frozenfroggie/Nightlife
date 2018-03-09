import axios from 'axios';

// export default function setAuthorizationToken(authToken) {
//   if (authToken) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
//   } else {
//     delete axios.defaults.headers.common['Authorization'];
//   }
// }

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  console.log(error);
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = window.localStorage.getItem('refreshToken');
    console.log(refreshToken);
    return axios.post('/users/refreshTokens', {refreshToken})
      .then(res => {
        const authToken = res.headers.authorization.split(' ')[1];
        console.log(res.headers);
        window.sessionStorage.setItem('authToken', authToken);
        window.localStorage.setItem('refreshToken', res.data.refreshToken);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + authToken;
        originalRequest.headers['Authorization'] = 'Bearer ' + authToken;
        return axios(originalRequest);
      });
  }
  return Promise.reject(error);
});
//
// Vue.axios.interceptors.response.use((response) => { // intercept the global error
//     return response
//   }, function (error) {
//     let originalRequest = error.config
//     if (error.response.status === 401 && !originalRequest._retry) { // if the error is 401 and hasent already been retried
//       originalRequest._retry = true // now it can be retried
//       return Vue.axios.post('/users/token', null).then((data) => {
//         store.dispatch('authfalse')
//         store.dispatch('authtruth', data.data)
//         originalRequest.headers['Authorization'] = 'Bearer ' + store.state.token // new header new token
//         return Vue.axios(originalRequest) // retry the request that errored out
//       }).catch((error) => {
//         for (let i = 0; i < error.response.data.errors.length; i++) {
//           if (error.response.data.errors[i] === 'TOKEN-EXPIRED') {
//             auth.logout()
//             return
//           }
//         }
//       })
//     }
//     if (error.response.status === 404 && !originalRequest._retry) {
//       originalRequest._retry = true
//       window.location.href = '/'
//       return
//     }
//     // Do something with response error
//     return Promise.reject(error)
//   })
