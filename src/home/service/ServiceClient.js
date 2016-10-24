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
        const api = this.apiUrl;
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${api}/web/user/checkUserIsValide?phone=${phone}`,
                type: "GET",
            }).then((data, textStatus, jqXHR) => {
                if (jqXHR.status === 200)
                {
                    resolve(data);
                }
                else
                {
                    reject("checkUserIsValide error");
                }
            });
        });
    }

    sendAuthCode(phone)
    {
        const api = this.apiUrl;
        const sendData = JSON.stringify({ "phone": phone });
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${api}/web/user/sendAuthCode`,
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
                    reject("sendAuthCode error");
                }
            });
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
            $.ajax({
                url: `${api}/web/user/register`,
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
                    reject("register error");
                }
            });
        });
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


    getCourseSpeciality()
    {
        const api = this.apiUrl;
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${api}/web/course/speciality`,
                type: "GET"
            }).then((data, textStatus, jqXHR) => {
                if (jqXHR.status === 200) {
                    resolve(data);
                }
                else
                {
                    reject("getCourseSpeciality error");
                }
            });
        });
    }

    getCourseList(courseKey)
    {
        const api = this.apiUrl;
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
        // return new Promise((resolve, reject) => {
        //     $.ajax({
        //         url: `${api}/web/course/courseList`,
        //         method: "GET",
        //         data: {
        //             page: 1,
        //             limit: 1000,
        //             key: courseKey.name
        //         }
        //     }).then((data, textStatus, jqXHR) => {
        //         if (jqXHR.status === 200) {
        //             resolve(data);
        //         }
        //         else
        //         {
        //             console.log("getCourseList error");
        //         }
        //     });
        // });
    }


}
