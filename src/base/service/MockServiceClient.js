const CP_API_URL = "/api";


export default class ServiceClient
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

    getCourseList(specialityId)
    {
        return new Promise((resolve, reject) => {
            const data1 = [
                {
                    id: "c1",
                    name: "数据结构",
                    topicNum: 20,
                    resourceNum: 12,
                    schoolName: "南京大学",
                    specialityName: "软件工程",
                    specialityId: "1",
                    cover: "https://img3.doubanio.com/lpic/s1106991.jpg",
                    authors:[
                        {
                            id: 1,
                            name: "王思议",
                            icon: "http://www.qqzone.org/uploads/allimg/160904/1403364961-1.jpg"
                        },
                        {
                            id: 2,
                            name: "大神",
                            icon: "http://uupaper.oss-cn-qingdao.aliyuncs.com/b6eee5a620d6e14f4f8e5786f24244f7.jpeg"
                        }
                    ]
                },
                {
                    id: "c2",
                    name: "计算机网络",
                    topicNum: 18,
                    resourceNum: 16,
                    schoolName: "南京大学",
                    specialityName: "软件工程",
                    specialityId: "1",
                    cover: "https://img3.doubanio.com/lpic/s1130756.jpg",
                    authors:[
                        {
                            id: 1,
                            name: "王思议",
                            icon: "http://uupaper.oss-cn-qingdao.aliyuncs.com/b6eee5a620d6e14f4f8e5786f24244f7.jpeg"
                        },
                        {
                            id: 2,
                            name: "大神",
                            icon: "http://img0.pconline.com.cn/pconline/1312/27/4072897_01.gif"
                        }
                    ]
                }
            ];

            resolve(data1);

        });
    }

    search(courseKey)
    {
        return new Promise((resolve, reject) => {
            const data2 = [
                {
                    id: "c1",
                    name: "微积分",
                    topicNum: 9,
                    resourceNum: 12,
                    schoolName: "南京大学",
                    specialityName: "数学系",
                    specialityId: "2",
                    cover: "http://img3.douban.com/lpic/s11126376.jpg",
                    authors:[
                        {
                            id: 1,
                            name: "王思议",
                            icon: "http://uupaper.oss-cn-qingdao.aliyuncs.com/1d3ffa6b6a8a8d52570ed953f880e03d.jpeg"
                        },
                        {
                            id: 2,
                            name: "大神",
                            icon: "http://uupaper.oss-cn-qingdao.aliyuncs.com/b6eee5a620d6e14f4f8e5786f24244f7.jpeg"
                        }
                    ]
                },
                {
                    id: "c2",
                    name: "计算机网络",
                    topicNum: 18,
                    resourceNum: 6,
                    schoolName: "南京大学",
                    specialityName: "数学系",
                    specialityId: "2",
                    cover: "https://img3.doubanio.com/lpic/s1106991.jpg",
                    authors:[
                        {
                            id: 1,
                            name: "王思议",
                            icon: "http://uupaper.oss-cn-qingdao.aliyuncs.com/b6eee5a620d6e14f4f8e5786f24244f7.jpeg"
                        },
                        {
                            id: 2,
                            name: "大神",
                            icon: "http://uupaper.oss-cn-qingdao.aliyuncs.com/9c5b17a57bbf9c3279f9e2faf3b3e118.jpeg"
                        }
                    ]
                }
            ];

            resolve(data2);
        });
    }


}
