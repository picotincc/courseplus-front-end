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

    checkUserIsValid(phone)
    {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${CP_API_URL}/web/user/checkUserIsValid?phone=${phone}`,
                type: "GET",
            }).then((data, textStatus, jqXHR) => {
                const res = Object.assign(data, {textStatus});
                resolve(res);
            }, (jqXHR, textStatus, errorThrown) => {
                const res = Object.assign(jqXHR.responseJSON, {textStatus});
                resolve(res);
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
                const res = Object.assign(data, {textStatus});
                resolve(res);
            }, (jqXHR, textStatus, errorThrown) => {
                const res = Object.assign(jqXHR.responseJSON, {textStatus});
                resolve(res);
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
                const res = Object.assign(data, {textStatus});
                resolve(res);
            }, (jqXHR, textStatus, errorThrown) => {
                const res = Object.assign(jqXHR.responseJSON, {textStatus});
                resolve(res);
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
                const res = Object.assign(data, {textStatus});
                resolve(res);
            }, (jqXHR, textStatus, errorThrown) => {
                const res = Object.assign(jqXHR.responseJSON, {textStatus});
                resolve(res);
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
                resolve(data);
            }, (jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR.responseJSON);
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
                resolve(JSON.parse(data));
            }, (jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR.responseJSON);
            });
        });
    }

    search(courseKey)
    {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${CP_API_URL}/web/course/courseList`,
                type: "GET",
                data: {
                    page: 1,
                    limit: 100,
                    key: courseKey
                }
            }).then((data, textStatus, jqXHR) => {
                resolve(JSON.parse(data));
            }, (jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR.responseJSON);
            });
        });
    }

    getCourseDetail(courseId)
    {
        const id = courseId.toString();
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${CP_API_URL}/web/course/courseDetail`,
                type: "GET",
                data: {
                    id
                }
            }).then((data, textStatus, jqXHR) => {
                resolve(data);
            }, (jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR.responseJSON);
            });
        });
    }

    getTopicDetail(topicId)
    {
        const id = topicId.toString();
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${CP_API_URL}/web/course/topicDetail`,
                type: "GET",
                data: {
                    id
                }
            }).then((data, textStatus, jqXHR) => {
                resolve(data);
            }, (jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR.responseJSON);
            });
        });
    }

    getCommentList(topicId)
    {
        const id = topicId.toString();
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${CP_API_URL}/web/comment/getCommentList`,
                type: "GET",
                data: {
                    topicId: id,
                    page: 1,
                    limit: 100
                }
            }).then((data, textStatus, jqXHR) => {
                resolve(JSON.parse(data));
            }, (jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR.responseJSON);
            });
        });
    }

    postComment(comment, token)
    {
        const sendData = JSON.stringify({
            "topicId": comment.topicId,
            "content": comment.content
        });
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${CP_API_URL}/user/comment/postComment`,
                type: "POST",
                contentType: "application/json",
                headers: {
                    "Authorization": "Basic " + btoa(token + ":")
                },
                data: sendData
            }).then((data, textStatus, jqXHR) => {
                const res = Object.assign(data, {textStatus});
                resolve(res);
            }, (jqXHR, textStatus, errorThrown) => {
                const res = Object.assign(jqXHR.responseJSON, {textStatus});
                resolve(res);
            });
        });
    }


}
