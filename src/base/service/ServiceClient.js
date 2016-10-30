import WebStorageUtil from "../util/WebStorageUtil";

const CP_API_URL = "http://118.178.137.101:8001/api";

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

    autoLogin()
    {
        const token = WebStorageUtil.getToken();
        const isSave = WebStorageUtil.getIsSaveStorage();
        const userStorage = WebStorageUtil.getUserStorage();
        const self = this;
        return new Promise((resolve, reject) => {
            if (token)
            {
                self.getUserInfo(token).then(res => {
                    if (res.textStatus === "success")
                    {
                        let info = Object.assign(res, { status:0 });
                        info.token = token;
                        resolve(info);
                    }
                    else
                    {
                        if (userStorage && isSave === "saved")
                        {
                            self.login(userStorage).then(result => {
                                if (result.textStatus === "success")
                                {
                                    const info = Object.assign(result, { status:0 });
                                    resolve(info);
                                }
                                else
                                {
                                    const info = Object.assign(result, { status:-1 });
                                    resolve(info);
                                }
                            });
                        }
                        else
                        {
                            resolve( {status: -1} );
                        }
                    }
                });
            }
            else
            {
                if (userStorage && isSave === "saved")
                {
                    self.login(userStorage).then(result => {
                        if (result.textStatus === "success")
                        {
                            const info = Object.assign(result, { status:0 });
                            resolve(info);
                        }
                        else
                        {
                            const info = Object.assign(result, { status:-1 });
                            resolve(info);
                        }
                    });
                }
                else
                {
                    resolve( {status: -1} );
                }
            }
        });
    }

    getUserInfo(token)
    {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${CP_API_URL}/user/user/getUserInfo`,
                type: "GET",
                contentType: "application/json",
                headers: {
                    "Authorization": "Basic " + btoa(token + ":")
                },
            }).then((data, textStatus, jqXHR) => {
                const res = Object.assign(data, {textStatus});
                resolve(res);
            }, (jqXHR, textStatus, errorThrown) => {
                const res = {
                    statusCode: jqXHR.status,
                    textStatus,
                }
                resolve(res);
            });
        });
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
                WebStorageUtil.setToken(res.token);
                resolve(res);
            }, (jqXHR, textStatus, errorThrown) => {
                const res = Object.assign(jqXHR.responseJSON, {textStatus});
                resolve(res);
            });
        });
    }

    resetPassword(user)
    {
        const sendData = JSON.stringify({
            "phone": user.phone,
            "password": user.password,
            "verifyCode": user.code
        });
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${CP_API_URL}/web/user/resetPassword`,
                type: "POST",
                contentType: "application/json",
                data: sendData
            }).then((data, textStatus, jqXHR) => {
                const res = Object.assign(data, {textStatus});
                WebStorageUtil.setToken(res.token);
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
                WebStorageUtil.setToken(res.token);
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

    getReplyList(paras)
    {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${CP_API_URL}/web/comment/getCommentList`,
                type: "GET",
                data: {
                    topicId: paras.topicId,
                    commentId: paras.commentId,
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
        const self = this;
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
                if (jqXHR.status === 403)
                {
                    self.loginFortoken().then(res => {
                        if (res.status === 0)
                        {
                            $.ajax({
                                url: `${CP_API_URL}/user/comment/postComment`,
                                type: "POST",
                                contentType: "application/json",
                                headers: {
                                    "Authorization": "Basic " + btoa(res.token + ":")
                                },
                                data: sendData
                            }).then((data, textStatus, jqXHR) => {
                                const res = Object.assign(data, {textStatus});
                                resolve(res);
                            }, (jqXHR, textStatus, errorThrown) => {
                                resolve(Object.assign(jqXHR.responseJSON, {textStatus}));
                            });
                        }
                        else
                        {
                            resolve({textStatus: "error", message: "请重新登录"});
                        }
                    });
                }
                else
                {
                    resolve(Object.assign(jqXHR.responseJSON, {textStatus}));
                }
            });
        });
    }

    replyComment(reply, token)
    {
        const self = this;
        const sendData = JSON.stringify({
            "topicId": reply.topicId,
            "replyId": reply.replyId,
            "content": reply.content
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
                if (jqXHR.status === 403)
                {
                    self.loginFortoken().then(res => {
                        if (res.status === 0)
                        {
                            $.ajax({
                                url: `${CP_API_URL}/user/comment/postComment`,
                                type: "POST",
                                contentType: "application/json",
                                headers: {
                                    "Authorization": "Basic " + btoa(res.token + ":")
                                },
                                data: sendData
                            }).then((data, textStatus, jqXHR) => {
                                const res = Object.assign(data, {textStatus});
                                resolve(res);
                            }, (jqXHR, textStatus, errorThrown) => {
                                resolve(Object.assign(jqXHR.responseJSON, {textStatus}));
                            });
                        }
                        else
                        {
                            resolve({textStatus: "error", message: "请重新登录"});
                        }
                    });
                }
                else
                {
                    resolve(Object.assign(jqXHR.responseJSON, {textStatus}));
                }
            });
        });
    }

    updateUserInfo(userInfo, token)
    {
        const self = this;
        const sendData = JSON.stringify({
            "nickname": userInfo.nickname,
            "avatar": userInfo.avatar,
            "gender": userInfo.gender
        });
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${CP_API_URL}/user/user/updateUserInfo`,
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
                if (jqXHR.status === 403)
                {
                    self.loginFortoken().then(res => {
                        if (res.status === 0)
                        {
                            $.ajax({
                                url: `${CP_API_URL}//user/user/updateUserInfo`,
                                type: "POST",
                                contentType: "application/json",
                                headers: {
                                    "Authorization": "Basic " + btoa(res.token + ":")
                                },
                                data: sendData
                            }).then((data, textStatus, jqXHR) => {
                                const res = Object.assign(data, {textStatus});
                                resolve(res);
                            }, (jqXHR, textStatus, errorThrown) => {
                                resolve(Object.assign(jqXHR.responseJSON, {textStatus}));
                            });
                        }
                        else
                        {
                            resolve({textStatus: "error", message: "请重新登录"});
                        }
                    });
                }
                else
                {
                    resolve(Object.assign(jqXHR.responseJSON, {textStatus}));
                }
            });
        });
    }

    changePassword(passwords, token)
    {
        const self = this;
        const sendData = JSON.stringify({
            "oldPassword": passwords.oldPassword,
            "newPassword": passwords.newPassword
        });
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${CP_API_URL}/user/user/changePassword`,
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
                if (jqXHR.status === 403)
                {
                    self.loginFortoken().then(res => {
                        if (res.status === 0)
                        {
                            $.ajax({
                                url: `${CP_API_URL}/user/user/changePassword`,
                                type: "POST",
                                contentType: "application/json",
                                headers: {
                                    "Authorization": "Basic " + btoa(res.token + ":")
                                },
                                data: sendData
                            }).then((data, textStatus, jqXHR) => {
                                const res = Object.assign(data, {textStatus});
                                resolve(res);
                            },(jqXHR, textStatus, errorThrown) => {
                                resolve(Object.assign(jqXHR.responseJSON, {textStatus}));
                            });
                        }
                        else
                        {
                            resolve({textStatus: "error", message: "请重新登录"});
                        }
                    });
                }
                else
                {
                    resolve(Object.assign(jqXHR.responseJSON, {textStatus}));
                }
            });
        });
    }



    loginFortoken()
    {
        const userStorage = WebStorageUtil.getUserStorage();
        const isSave = WebStorageUtil.getIsSaveStorage();
        const self = this;
        return new Promise((resolve, reject) => {
            if (userStorage)
            {
                self.login(userStorage).then(result => {
                    if (result.textStatus === "success")
                    {
                        WebStorageUtil.setToken(result.token);
                        resolve({token: result.token, status: 0});
                    }
                    else
                    {
                        const info = Object.assign(result, { status:-1 });
                        resolve(info);
                    }
                });
            }
            else
            {
                resolve({status: -1});
            }
        });
    }

    getCharge(data)
    {
        const token = WebStorageUtil.getToken();
        let tempData = {
             channel: data.channel,
             amount: data.amount,
             topicId: data.topicId
        };
        if (data.resourceId)
        {
            tempData.resourceId = data.resourceId;
        }

        const sendData = JSON.stringify(tempData);
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: `${CP_API_URL}/user/pay`,
                contentType: "application/json",
                headers: {
                    "Authorization": "Basic " + btoa(token + ":")
                },
                data: sendData
            }).then((data, textStatus, jqXHR) => {
                const res = Object.assign(data, {textStatus});
                resolve(res);
            }, (jqXHR, textStatus, errorThrown) => {
                if (jqXHR.status === 403)
                {
                    self.loginFortoken().then(res => {
                        if (res.status === 0)
                        {
                            $.ajax({
                                url: `${CP_API_URL}/user/pay`,
                                type: "POST",
                                contentType: "application/json",
                                headers: {
                                    "Authorization": "Basic " + btoa(res.token + ":")
                                },
                                data: sendData
                            }).then((data, textStatus, jqXHR) => {
                                const res = Object.assign(data, {textStatus});
                                resolve(res);
                            },(jqXHR, textStatus, errorThrown) => {
                                resolve(Object.assign(jqXHR.responseJSON, {textStatus}));
                            });
                        }
                        else
                        {
                            resolve({textStatus: "error", message: "请重新登录"});
                        }
                    });
                }
                else
                {
                    resolve(Object.assign(jqXHR.responseJSON, {textStatus}));
                }
            });
        });
    }

    checkOrderStatus(orderId)
    {
        const token = WebStorageUtil.getToken();
        const self = this;
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${CP_API_URL}/user/pay/checkOrderStatus`,
                type: "GET",
                contentType: "application/json",
                headers: {
                    "Authorization": "Basic " + btoa(token + ":")
                },
                data: {
                    id: orderId
                }
            }).then((data, textStatus, jqXHR) => {
                const res = Object.assign(data, {textStatus});
                resolve(res);
            }, (jqXHR, textStatus, errorThrown) => {
                if (jqXHR.status === 403)
                {
                    self.loginFortoken().then(res => {
                        if (res.status === 0)
                        {
                            $.ajax({
                                url: `${CP_API_URL}/user/pay/checkOrderStatus`,
                                type: "GET",
                                contentType: "application/json",
                                headers: {
                                    "Authorization": "Basic " + btoa(res.token + ":")
                                },
                                data: {
                                    id: orderId
                                }
                            }).then((data, textStatus, jqXHR) => {
                                const res = Object.assign(data, {textStatus});
                                resolve(res);
                            },(jqXHR, textStatus, errorThrown) => {
                                resolve(Object.assign(jqXHR.responseJSON, {textStatus}));
                            });
                        }
                        else
                        {
                            resolve({textStatus: "error"});
                        }
                    });
                }
                else
                {
                    resolve(Object.assign(jqXHR.responseJSON, {textStatus}));
                }
            });
        });
    }

    getDownloadUrl(resourceId)
    {
        const token = WebStorageUtil.getToken();
        const self = this;
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${CP_API_URL}/user/resource/getDownloadUrl`,
                type: "GET",
                contentType: "application/json",
                headers: {
                    "Authorization": "Basic " + btoa(token + ":")
                },
                data: {
                    id: resourceId
                }
            }).then((data, textStatus, jqXHR) => {
                const res = Object.assign(data, {textStatus});
                resolve(res);
            }, (jqXHR, textStatus, errorThrown) => {
                if (jqXHR.status === 403)
                {
                    self.loginFortoken().then(res => {
                        if (res.status === 0)
                        {
                            $.ajax({
                                url: `${CP_API_URL}/user/resource/getDownloadUrl`,
                                type: "GET",
                                contentType: "application/json",
                                headers: {
                                    "Authorization": "Basic " + btoa(res.token + ":")
                                },
                                data: {
                                    id: resourceId
                                }
                            }).then((data, textStatus, jqXHR) => {
                                const res = Object.assign(data, {textStatus});
                                resolve(res);
                            },(jqXHR, textStatus, errorThrown) => {
                                resolve(Object.assign(jqXHR.responseJSON, {textStatus}));
                            });
                        }
                        else
                        {
                            resolve({textStatus: "error", code: -1});
                        }
                    });
                }
                else
                {
                    resolve(Object.assign(jqXHR.responseJSON, {textStatus}));
                }
            });
        });
    }

    getQuestionChance(authorId)
    {
        const token = WebStorageUtil.getToken();
        const self = this;
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${CP_API_URL}/user/author/getQuestionChance`,
                type: "GET",
                contentType: "application/json",
                headers: {
                    "Authorization": "Basic " + btoa(token + ":")
                },
                data: {
                    authorId: authorId
                }
            }).then((data, textStatus, jqXHR) => {
                const res = Object.assign(data, {textStatus});
                resolve(res);
            }, (jqXHR, textStatus, errorThrown) => {
                if (jqXHR.status === 403)
                {
                    self.loginFortoken().then(res => {
                        if (res.status === 0)
                        {
                            $.ajax({
                                url: `${CP_API_URL}/user/author/getQuestionChance`,
                                type: "GET",
                                contentType: "application/json",
                                headers: {
                                    "Authorization": "Basic " + btoa(res.token + ":")
                                },
                                data: {
                                    authorId: authorId
                                }
                            }).then((data, textStatus, jqXHR) => {
                                const res = Object.assign(data, {textStatus});
                                resolve(res);
                            },(jqXHR, textStatus, errorThrown) => {
                                resolve(Object.assign(jqXHR.responseJSON, {textStatus}));
                            });
                        }
                        else
                        {
                            resolve({textStatus: "error", code: -1});
                        }
                    });
                }
                else
                {
                    resolve(Object.assign(jqXHR.responseJSON, {textStatus}));
                }
            });
        });
    }


    publishQuestion(question)
    {
        const token = WebStorageUtil.getToken();
        const sendData = JSON.stringify(question);
        const self = this;
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${CP_API_URL}/user/author/publishQuestion`,
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
                if (jqXHR.status === 403)
                {
                    self.loginFortoken().then(res => {
                        if (res.status === 0)
                        {
                            $.ajax({
                                url: `${CP_API_URL}/user/author/publishQuestion`,
                                type: "POST",
                                contentType: "application/json",
                                headers: {
                                    "Authorization": "Basic " + btoa(res.token + ":")
                                },
                                data: sendData
                            }).then((data, textStatus, jqXHR) => {
                                const res = Object.assign(data, {textStatus});
                                resolve(res);
                            },(jqXHR, textStatus, errorThrown) => {
                                resolve(Object.assign(jqXHR.responseJSON, {textStatus}));
                            });
                        }
                        else
                        {
                            resolve({textStatus: "error", code: -1});
                        }
                    });
                }
                else
                {
                    resolve(Object.assign(jqXHR.responseJSON, {textStatus}));
                }
            });
        });
    }

    publishFeedBack(feedback)
    {
        const token = WebStorageUtil.getToken();
        const sendData = JSON.stringify(feedback);
        const self = this;
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${CP_API_URL}/user/feedback/publishFeedBack`,
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
                if (jqXHR.status === 403)
                {
                    self.loginFortoken().then(res => {
                        if (res.status === 0)
                        {
                            $.ajax({
                                url: `${CP_API_URL}/user/feedback/publishFeedBack`,
                                type: "POST",
                                contentType: "application/json",
                                headers: {
                                    "Authorization": "Basic " + btoa(res.token + ":")
                                },
                                data: sendData
                            }).then((data, textStatus, jqXHR) => {
                                const res = Object.assign(data, {textStatus});
                                resolve(res);
                            },(jqXHR, textStatus, errorThrown) => {
                                resolve(Object.assign(jqXHR.responseJSON, {textStatus}));
                            });
                        }
                        else
                        {
                            resolve({textStatus: "error", code: -1});
                        }
                    });
                }
                else
                {
                    resolve(Object.assign(jqXHR.responseJSON, {textStatus}));
                }
            });
        });
    }


    getFileToken(key)
    {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${CP_API_URL}/web/file/getFileToken`,
                type: "GET",
                data: {
                    key: key
                }
            }).then((data, textStatus, jqXHR) => {
                resolve(data);
            }, (jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR.responseJSON);
            });
        });
    }

}
