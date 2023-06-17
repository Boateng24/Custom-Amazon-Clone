import axios from 'axios'

const stripeApifetch = axios.create({
  baseURL: "https://us-central1-clone-bd749.cloudfunctions.net/api/v1",
  // "http://127.0.0.1:5001/clone-bd749/us-central1/api/v1",  firebase cloud functions api url localhost for debugging purposes
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export default stripeApifetch