const KEY_USER = "COURSEPLUS_USER";
const KEY_TOKEN = "COURSEPLUS_TOKEN";

export default class WebStorageUtil
{
    static setUserStorage(user)
    {
        _setStorage(KEY_USER, JSON.stringify(user));
    }

    static getUserStorage()
    {
        const res = _getStorage(KEY_USER);
        if (res)
        {
            return JSON.parse(res);
        }
        return false;
    }

    static removeUserStorage()
    {
        _removeStorage(KEY_USER);
    }

    static setToken(value)
    {
        _setCookie(KEY_TOKEN, value);
    }

    static getToken()
    {
        const res = _getCookie(KEY_TOKEN);
        if (res)
        {
            return res;
        }
        return false;
    }
}

function _setCookie(key, value)
{
    document.cookie  = `${key}=${value}`;
}

function _getCookie(c_name)
{
    if (document.cookie.length>0)
    {　　
        var c_start = document.cookie.indexOf(c_name + "=")　　　
        if (c_start != -1)
        {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1)
            {
                c_end = document.cookie.length;
            }　　
            return unescape(document.cookie.substring(c_start, c_end))
        }
　　　　}
　　　　return ""
　　}

function _getStorage(key)
{
    return localStorage.getItem(key);
}

function _setStorage(key, value)
{
    localStorage.setItem(key, value);
}

function _removeStorage(key)
{
    localStorage.removeItem(key);
}
