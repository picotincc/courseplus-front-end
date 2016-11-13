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

    static isQQ(qq)
    {
        if (qq !== "")
        {
            return _isNum(qq);
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
            tempTopics[id] = topics[id].sort((a, b) => {
                if (a.weight !== b.weight)
                {
                    return b.weight - a.weight;
                }
                else
                {
                    return a.id - b.id;
                }
            });
        }

        let tempAuthors = authors.map(author => {
            author.weight = tempTopics[author.id][0].weight;
            return author;
        }).sort((a, b) => a.weight - b.weight);

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
        if (str === "")
        {
            return false;
        }
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

    static getWindowOpenTemp()
    {
        var Sys = {};
        var ua = navigator.userAgent.toLowerCase();
        var s;
        (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
        (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
        (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
        (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
        var temp=null;
        if(Sys.ie){//ie浏览器
            temp='about:newTab';
        }else{
            temp='_blank';
        }
        return temp;
    }

    static isPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
                    "SymbianOS", "Windows Phone",
                    "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    static checkBower()
    {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
      var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
      var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
      var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
      var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
      var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
      var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

      if (isIE)
      {
          return false;
       }//isIE end

       if (isFF) {  return false;}
       if (isOpera) {  return false;}
       if (isSafari) {  return false;}
       if (isChrome) { return true;}
       if (isEdge) { return true;}
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
