export default class BaseServiceClient
{

    constructor()
    {
        this._user = null;
        this._apiUrl = "/api";
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
