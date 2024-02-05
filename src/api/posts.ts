import axios from "axios";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

interface SearchQuery {
  skip?: number
  limit?: number
  type?: string
  tag?: string
  trending?: boolean
  ecosystem?: string
  search_term?: string
}

export const getPosts = (query: SearchQuery): Promise<any> => {
  const config = {
    method: "get",
    url: `${apiBaseUrl}/api/posts`,
    params: query
  }
  return new Promise((resolve, reject) => {
    axios(config).then(res => resolve(res.data))
      .catch(err => reject(err))
  })
};

export const getNextPost = (query: any): Promise<any> => {
  const config = {
    method: "get",
    url: `${apiBaseUrl}/api/posts/next`,
    params: query
  }
  return new Promise((resolve, reject) => {
    axios(config).then(res => resolve(res.data))
      .catch(err => reject(err))
  })
};

export const getPostById = (slug: string): Promise<any> => {
  const config = {
    method: "get",
    url: `${apiBaseUrl}/api/posts/${slug}`
  }
  return new Promise((resolve, reject) => {
    axios(config).then(res => resolve(res.data))
      .catch(err => reject(err))
  })
};

export const getCategories = (): Promise<any> => {
  const config = {
    method: "get",
    url: `${apiBaseUrl}/api/tags`
  }
  return new Promise((resolve, reject) => {
    axios(config).then(res => resolve(res.data))
      .catch(err => reject(err))
  })
};

export const getEcosystem = (): Promise<any> => {
  const config = {
    method: "get",
    url: `${apiBaseUrl}/api/ecosystem`
  }
  return new Promise((resolve, reject) => {
    axios(config).then(res => resolve(res.data))
      .catch(err => reject(err))
  })
};

export const getPdfs = (): Promise<any> => {
  const config = {
    method: "get",
    url: `${apiBaseUrl}/api/pdfs`
  }
  return new Promise((resolve, reject) => {
    axios(config).then(res => resolve(res.data))
      .catch(err => reject(err))
  })
};

export const getTweets = (): Promise<any> => {
  const config = {
    method: "get",
    url: `${apiBaseUrl}/api/tweets`
  }
  return new Promise((resolve, reject) => {
    axios(config).then(res => resolve(res.data))
      .catch(err => reject(err))
  })
};