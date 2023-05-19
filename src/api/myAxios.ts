import axios, {AxiosResponse} from "axios"
import config from "../config/ipconfig.json"
export default function myAxios(url:string, data={}, type="GET"):any{
    axios.defaults.baseURL = `${config.ip}:5001`;
    console.log("url:", url, "type:", type );
    console.log("Axios Data:", data);
    return new Promise((resolve, reject)=>{
        let promise;
        if(type === "GET"){
            promise = axios.get(url, {
                params: data,
            })
        }else if(type === "POST"){
            promise = axios.post(url, data)
        }else if(type === "PUT"){
            promise = axios.put(url, data)
        }else if(type === "DELETE"){
            promise = axios.delete(url)
        }
    
        (promise as Promise<AxiosResponse<any, any>>).then(
            res => resolve(res.data)
        )
    })
}