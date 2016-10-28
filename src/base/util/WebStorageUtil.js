const KEY_USER = "COURSEPLUS_USER";
const KEY_ISSAVE = "COURSEPLUS_ISSAVE";
const KEY_TOKEN = "COURSEPLUS_TOKEN";
const KEY_COURSE_ID = "COURSEPLUS_COURSE_ID";

export default class WebStorageUtil
{
    static setUserStorage(user)
    {
        _setLocalStorage(KEY_USER, JSON.stringify(user));
    }

    static getUserStorage()
    {
        const res = _getLocalStorage(KEY_USER);
        if (res)
        {
            return JSON.parse(res);
        }
        return false;
    }

    static removeUserStorage()
    {
        _removeLocalStorage(KEY_USER);
    }

    static setIsSaveStorage(isSave)
    {
        _setLocalStorage(KEY_ISSAVE, isSave);
    }

    static getIsSaveStorage()
    {
        const res = _getLocalStorage(KEY_ISSAVE);
        if (res)
        {
            return res;
        }
        return false;
    }

    static removeIsSaveStorage()
    {
        _removeLocalStorage(KEY_ISSAVE);
    }

    static setCourseStorage(courseId)
    {
        _setSessionStorage(KEY_COURSE_ID, courseId);
    }

    static getCourseStorage()
    {
        const res = _getSessionStorage(KEY_COURSE_ID);
        if (res)
        {
            return res;
        }
        return false;
    }

    static removeCourseStorage()
    {
        _removeSessionStorage(KEY_COURSE_ID);
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

    static removeToken()
    {
        _removeCookie(KEY_TOKEN);
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
        let c_start = document.cookie.indexOf(c_name + "=")　　　
        if (c_start != -1)
        {
            c_start = c_start + c_name.length + 1;
            let c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1)
            {
                c_end = document.cookie.length;
            }　　
            return unescape(document.cookie.substring(c_start, c_end))
        }
　　}
　　　　return ""
}

function _removeCookie(name)
{
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function _getLocalStorage(key)
{
    return localStorage.getItem(key);
}

function _setLocalStorage(key, value)
{
    localStorage.setItem(key, value);
}

function _removeLocalStorage(key)
{
    localStorage.removeItem(key);
}

function _getSessionStorage(key)
{
    return sessionStorage.getItem(key);
}

function _setSessionStorage(key, value)
{
    sessionStorage.setItem(key, value);
}

function _removeSessionStorage(key)
{
    sessionStorage.removeItem(key);
}
