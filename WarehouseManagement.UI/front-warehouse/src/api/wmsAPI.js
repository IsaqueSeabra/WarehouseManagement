import axios from 'axios';

let url = 'https://localhost:5001/'; 

const instance = axios.create({
  baseURL: url,
});

export default instance;
