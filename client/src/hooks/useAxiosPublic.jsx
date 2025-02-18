import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://marrrrry.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;