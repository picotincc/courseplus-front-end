const CP_API_URL = "/api";

export default class ServiceClient
{
    static _instance = null;

    constructor()
    {
        this._user = null;
    }

    get user()
    {
        return this._user;
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
            $.ajax({
                url: `${CP_API_URL}/web/user/checkUserIsValid?phone=${phone}`,
                type: "GET",
            }).then((data, textStatus, jqXHR) => {
                if (jqXHR.status === 200)
                {
                    resolve(data);
                }
                else
                {
                    reject("checkUserIsValid error");
                }
            });
        });
    }

    sendAuthCode(phone)
    {
        const sendData = JSON.stringify({ "phone": phone });
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${CP_API_URL}/web/user/sendAuthCode`,
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
        const sendData = JSON.stringify({
            "phone": user.phone,
            "password": user.password,
            "verifyCode": user.code
        });
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${CP_API_URL}/web/user/register`,
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
        const sendData = JSON.stringify({
            "phone": user.phone,
            "password": user.password
        });
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${CP_API_URL}/web/user/login`,
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
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${CP_API_URL}/web/course/speciality`,
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

    getCourseList(specialityId)
    {
        const id = specialityId.toString();
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${CP_API_URL}/web/course/courseList`,
                type: "GET",
                data: {
                    page: 1,
                    limit: 100,
                    specialityId: id
                }
            }).then((data, textStatus, jqXHR) => {
                if (jqXHR.status === 200) {
                    resolve(JSON.parse(data));
                }
                else
                {
                    console.log("getCourseList error");
                }
            });
        });
    }


}
