import axios from "axios";

export default axios.create({
    //baseURL: 'http://localhost:8080/',
    baseURL: 'http://unihubapp-env.eba-66kjieua.us-east-2.elasticbeanstalk.com/',
});
