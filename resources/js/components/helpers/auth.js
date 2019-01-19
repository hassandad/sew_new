function authHeader() {
  // return authorization header with basic auth credentials
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.authdata) {
    return {'Authorization': 'Basic ' + user.authdata};
  } else {
    return {};
  }
}

const auth = {
  isAuthenticated: false,
  authenticate(formValues) {
    let self = this;
    return new Promise(function (resolve, reject) {
      
      axios.post('/api/login', formValues)
      .then(function (response) {
        console.log('resolved');
        localStorage.setItem('token', response.data.token);
        self.isAuthenticated = true
        resolve(response);
      }).catch(function (error) {
        console.log('reject');
        console.log(error);

        reject(error.response.data.errors);
      });
    });
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

export { auth, authHeader }