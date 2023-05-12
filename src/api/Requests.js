import ServerRequest from "./utils/ServerRequest";
import * as URL from "./utils/url";


/* 

Requests QuickGuide : 

Requests are made with AXIOS using the utility : ServerRequest.
The URLS are imported from the utility URL, where you will change the server based on : Testing/TestServer/ProductionServer -> Uncomment/Comment

Standard Input/Output : 
Every Requests have comments on the TOP telling you what you need to provide and what do you recive back.

IMPORTANT : remember to check the "error" part of the standard response.

Standard Output Object : 

The standard output object will be : 

{
    error:
    {
        value:false,
        description:"",
        code:"",
        more:{}
    },
    data:
    {
        <name>:{},
        <name>:[],
        <name>:0,
        ecc...
    },
    done : false,
}

*/


const defaultResponse =
{
    error:
    {
        value: false,
        description: "",
        code: "",
        more: {}
    },
    data: {},
    done: false
}

const serverErrorDescription = " Nessuna risposta dal server. Riprovare, e se l'errore persiste contattare l'assistenza.";
const serverErrorCode = "000";


const CreateResponse = (data, error) => {
    let response = { ...defaultResponse };
    if (error.value) {
        return { ...response, error: { value: true, description: error.description, code: error.code } };
    }
    else {
        return { ...response, data: { ...data }, done: true };
    }
}

export const Request_Tar = (tar, CallBackFunction) => {
    const onDone = (res, error) => {
        if (!error) {
            if (!res.isError) {
                CallBackFunction(CreateResponse(res.payload, res.error));
            }
            else {
                CallBackFunction(CreateResponse(undefined, { ...res.error, value: true }));
            }
        }
        else {
            CallBackFunction(CreateResponse(undefined, { value: true, description: serverErrorDescription, code: serverErrorCode }));
        }

    }

    ServerRequest(URL.RequestTar, { tar: tar }, onDone);
}