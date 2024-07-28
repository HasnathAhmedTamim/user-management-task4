import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: "https://users-server-pi.vercel.app",
});

const useAxiosSecure = ()=>{
    return axiosSecure;
}

export default useAxiosSecure;