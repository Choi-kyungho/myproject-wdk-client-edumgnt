import axios from 'axios';

 const URL = "http://127.0.0.1:8000/api/bzcm/EDU040E01/crawlingList/";

 export default class ApiCall {
    private httpRequest;
    constructor(apiFunc) {
      this.httpRequest = apiFunc;
    }
    retrieve = async (searchValue) => {
      const config = {
        url: "/api/bzcm/EDU040E01/crawlingList/",
        params: {
          p_use_yn: 'Y'
        },
      };
      return this.httpRequest(config);
    };

  }