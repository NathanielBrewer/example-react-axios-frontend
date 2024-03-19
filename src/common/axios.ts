import axios from 'axios';

// HACK: should be using env vars to establish an environment-dependent config
const axiosInstance = axios.create({
  baseURL: 'https://vast-cove-24733-f2209d5e3910.herokuapp.com/',
});

export default axiosInstance;