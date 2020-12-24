import axios from "axios";
const KEY = "AIzaSyCxWosIBZBk-G7ybEMskWsrsO6z_PS6-Oo";
export default axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3/",
    params: {
        part: "snippet",
        maxResults: 50,
        key: KEY,
    },
});
