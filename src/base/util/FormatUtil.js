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

    static expandTopics(topics, authors)
    {
        const indexs = Object.keys(topics);
        let tempTopics = {};
        for (let i = 0; i < indexs.length; i++)
        {
            let id = indexs[i];
            tempTopics[id] = topics[id].sort((a, b) => a.weight < b.weight);
        }

        let tempAuthors = authors.map(author => {
            author.weight = tempTopics[author.id][0].weight;
            return author;
        }).sort((a, b) => a.weight < b.weight ? 1 : -1);

        let resTopics = tempAuthors.reduce((pre, cur) => {
            pre = pre.concat(tempTopics[cur.id]);
            return pre;
        }, []);

        return {topics: resTopics, authors: tempAuthors, sortedTopics: tempTopics};
    }

    static getCurrentTime()
    {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
        return currentdate;
    }

    static  parseQuery(str){
        return str.split('&').reduce((memo, x) => {
            let qa = x.split('=');
            if(!qa[0]) return memo;
            return Object.assign(memo, {
              [qa[0]]: qa[1]?qa[1]:""
            })
        }, {})
    }

    static isValidEmail(sText)
    {
        const reEmail = /^(?:\w+\.?)*\w+@(?:\w+\.)+\w+$/;
        return reEmail.test(sText);
    }

    static isValidImage(file)
    {
        if(typeof FileReader != 'undefined')
        {
             if((file.type).indexOf("image/")==-1)
             {
                 return false;
             }
        }
        else
        {
            var fileName=file.name;
            var suffixIndex=fileName.lastIndexOf(".");
            var suffix=fileName.substring(suffixIndex+1).toUpperCase();
            if(suffix!="BMP"&&suffix!="JPG"&&suffix!="JPEG"&&suffix!="PNG"&&suffix!="GIF")
            {
                return false;
            }
        }

        return true;
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
