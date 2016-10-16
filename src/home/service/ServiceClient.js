

export default class ServiceClient
{
    static _instance = null;

    constructor()
    {
        this._userId = null;
    }

    static getInstance()
    {
        if(ServiceClient._instance === null)
        {
            ServiceClient._instance = new ServiceClient();
        }
        return ServiceClient._instance;
    }

    //获取首页的学校和专业的分类
    getHomeData()
    {
        const data = {
            "school": "南京大学",
            "majors": [
                {
                    "id": 1,
                    "name": "物理学"
                },
                {
                    "id": 2,
                    "name": "数学"
                },
                {
                    "id": 3,
                    "name": "软件工程"
                }
            ]
        };
        return new Promise((resolve, reject) => {
            if (true)
            {
                resolve(data);
            }
        });
    }

    //根据专业名获取相关课程
    getCoursesByMajor(major)
    {
        const courses = [
            {
                "name": "数据结构"
            },
            {
                "name": "计算机网络"
            }
        ];

        return new Promise((resolve, reject) => {
            if (true)
            {
                resolve(courses);
            }
        });
    }
}
