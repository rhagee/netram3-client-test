import axios from "axios";


const ServerRequest = (URL, obj, onDone) => {
    if (URL !== undefined && obj !== undefined) {
        axios.post(URL, obj)
            .then(res => {
                if (onDone !== undefined) {
                    onDone(res.data, false);
                }
            })
            .catch((error) => {
                if (error.request) {
                    onDone(undefined, true);
                }
                else {
                    console.log('Error', error.message);
                }
            });
    }
};

export default ServerRequest;