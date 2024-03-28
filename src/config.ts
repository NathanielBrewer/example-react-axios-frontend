const environment = process.env.NODE_ENV ?? 'development';

const config = {
  backendBaseUrl: (environment === 'development')? 'http://localhost:3000' : 'https://vast-cove-24733-f2209d5e3910.herokuapp.com/',
}

export default config;