export default class BaseServiceClient
{

    constructor()
    {
        this._user = null;
        this._apiUrl = "http://118.178.137.101:8000/api";
    }

    get user()
    {
        return this._user;
    }

    get apiUrl()
    {
        return this._apiUrl;
    }


}
