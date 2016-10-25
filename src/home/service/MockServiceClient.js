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

    checkUserIsValide(phone)
    {
        return new Promise((resolve, reject) => {
            const data = {
                code: 0,
                message: "token"
            }
            resolve(data);
        });
    }

    sendAuthCode(phone)
    {
        return new Promise((resolve, reject) => {
            const data = {
                code: 0,
                message: "token"
            }
            resolve(data);
        });
    }

    register(user)
    {
        const api = this.apiUrl;
        const sendData = JSON.stringify({
            "phone": user.phone,
            "password": user.password,
            "verifyCode": user.code
        });
        return new Promise((resolve, reject) => {
            const data = {
                code: 0,
                message: "token"
            }
            resolve(data);
        });
    }

    login(user)
    {
        const sendData = JSON.stringify({
            "phone": user.phone,
            "password": user.password
        });
        return new Promise((resolve, reject) => {
            const data = {
                code: 0,
                message: "token"
            }
            resolve(data);
        });
    }


    getCourseSpeciality()
    {
        return new Promise((resolve, reject) => {
            const data = {
                "南京大学": {
                    id: "s001",
                    specialities: [
                        {
                            id: 1,
                            name: "软件工程"
                        },
                        {
                            id: 2,
                            name: "数学系"
                        }
                    ]
                }
            }
            resolve(data);
        });
    }

    getCourseList(courseKey)
    {
        return new Promise((resolve, reject) => {
            const data = [
                {
                    id: "c1",
                    name: "数据结构",
                    topicNum: 20,
                    resourceNum: 12,
                    schoolName: "南京大学",
                    specialityName: "软件工程",
                    specialityId: "1",
                    authors:[]
                },
                {
                    id: "c2",
                    name: "计算机网络",
                    topicNum: 18,
                    resourceNum: 16,
                    schoolName: "南京大学",
                    specialityName: "软件工程",
                    specialityId: "1",
                    authors:[]
                }
            ];

            resolve(data);
        });
    }


}
