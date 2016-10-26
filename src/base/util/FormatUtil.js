export default class FormatUtil
{
    static isPhoneNumber(phone)
    {
        if (phone.length === 11)
        {
            return _isNum(phone);
        }

        return false;
    }

    static isCodeNumber(phone)
    {
        if (phone.length === 6)
        {
            return _isNum(phone);
        }

        return false;
    }

    static expandTopics(topics)
    {
        const indexs = Object.keys(topics);
        let res = [];
        for (let i = 0; i < indexs.length; i++)
        {
            let id = indexs[i];
            res = res.concat(topics[id]);
        }
        return res;
    }
}

//判断是否为纯数字
function _isNum(s)
{
    if (s!=null && s!="")
    {
        return !isNaN(s);
    }
    return false;
}
