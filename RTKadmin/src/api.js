//const BASE_URL = 'https://rtvoice.south.rt.ru'
const BASE_URL = ''

const ENDPOINTS = {
  SIGNIN: `${BASE_URL}/api/signin`,

  POSTS: `${BASE_URL}/api/v2/posts?all=true`,
  POSTS_CREATE: `${BASE_URL}/api/posts`,
  getDeletePost: id => `${BASE_URL}/api/posts/${id}`,

  FEEDBACK: `${BASE_URL}/api/mails`,
  DOWNLOAD_FEEDBACK: `${BASE_URL}/api/mails/download`,
  STATISTICS: `${BASE_URL}/api/listens`,
}

export default ENDPOINTS
