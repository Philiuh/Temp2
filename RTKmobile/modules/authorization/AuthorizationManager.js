import { API } from '../../API'

export const loginRequest = ({ loginValue, passwordValue }) => console.log('manager', API) || 
   fetch(API.LOGIN, {
    method: 'POST',
    body: JSON.stringify({
      username: loginValue,
      password: passwordValue,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then(response => response)

    //response.status === 200 ? response.json() : response.status === 401 && console.error('error')

