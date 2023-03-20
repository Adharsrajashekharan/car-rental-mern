import axios from "axios"


const instance=axios.create({
    baseURL:"https://projectbackend-g67z.onrender.com"
})

export default instance;


