const developmentBackendURL = '127.0.0.1:3001';
const productionBackendURL = 'https://vast-cove-24733-f2209d5e3910.herokuapp.com/'

const config = {
  backendURL: (process.env.NODE_ENV === 'development') ? developmentBackendURL : productionBackendURL,
}

export default config;