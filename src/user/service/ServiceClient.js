import BaseServiceClient from "../../base/service/BaseServiceClient";


export default class ServiceClient extends BaseServiceClient
{
    static _instance = null;

    constructor(...args)
    {
        super(...args);
    }

    static getInstance()
    {
        if(ServiceClient._instance === null)
        {
            ServiceClient._instance = new ServiceClient();
        }
        return ServiceClient._instance;
    }

    login(user)
    {
        console.log("login api");
        const api = this.apiUrl;
        const sendData = JSON.stringify({
            "phone": user.phone,
            "password": user.password
        });
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${api}/web/user/login`,
                type: "POST",
                contentType: "application/json",
                data: sendData
            }).then((data, textStatus, jqXHR) => {
                if (jqXHR.status === 200)
                {
                    resolve(data);
                }
                else
                {
                    reject("Login error");
                }
            });
        });
    }
}
