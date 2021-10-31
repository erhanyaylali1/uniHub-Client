import axios from "axios";

export default axios.create({
    //baseURL: 'http://node-env.eba-p5v73mrw.us-east-2.elasticbeanstalk.com',
    baseURL: 'http://localhost:8080/',
});
    