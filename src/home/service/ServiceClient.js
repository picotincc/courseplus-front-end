

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
        const courses1 = [
            {
                "id": 1,
                "name": "数据结构"
            },
            {
                "id":2,
                "name": "计算机网络"
            },
            {
                "id":3,
                "name": "操作系统"
            },
            {
                "id": 4,
                "name": "软件工程"
            }
        ];

        const courses2 = [
            {
                "id": 1,
                "name": "微积分"
            },
            {
                "id":2,
                "name": "线性代数"
            },
            {
                "id":3,
                "name": "概率论"
            },
            {
                "id": 4,
                "name": "傅里叶"
            }
        ];

        return new Promise((resolve, reject) => {
            if (true)
            {
                if (major === "数学")
                {
                    resolve(courses2)
                }else {
                    resolve(courses1);
                }
            }
        });
    }

    search(key)
    {
        const result = [
            {
                "id": 1,
                "name": "人机交互"
            },
            {
                "id":2,
                "name": "数据仓库"
            },
            {
                "id":3,
                "name": "数据挖掘"
            },
            {
                "id": 4,
                "name": "云计算"
            },
            {
                "id":5,
                "name": "软件工程管理"
            },
            {
                "id": 6,
                "name": "前沿软件技术"
            }
        ];

        return new Promise((resolve, reject) => {
            if (true)
            {
                resolve(result);
            }
        });
    }
}
