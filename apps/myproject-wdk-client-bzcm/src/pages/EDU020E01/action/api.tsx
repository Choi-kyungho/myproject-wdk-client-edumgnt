/**
 * http api POST 통신 처리 Class
 *
 * @param {object} data Request Data
 * @return {Object} Request Data
 */
 export default class ApiCall {
    private httpRequest;
    constructor(apiFunc) {
      this.httpRequest = apiFunc;
    }
    /*
    * 마스터 그리드 조회 Api Call
    */
    retrieve = async (searchValue) => {
      const config = {
        url: "/api/bzcm/EDU020E01/empCountlist/",
        params: {
          p_use_yn: 'Y'
        },
      };
      return this.httpRequest(config);
    };
    retrieve2 = async (searchValue) => {
      const config = {
        url: "/api/bzcm/EDU020E01/empByJobCountlist/",
        params: {
          p_use_yn: 'Y'
        },
      };
      return this.httpRequest(config);
    };
    retrieve3 = async (searchValue) => {
      const config = {
        url: "/api/bzcm/EDU020E01/empByRespCountlist/",
        params: {
          p_use_yn: 'Y'
        },
      };
      return this.httpRequest(config);
    };
    retriveModal = async (searchValue) => {
      console.log("api 조회조건====>"+JSON.stringify(searchValue));
      
      const config = {
        url: "/api/bzcm/EDU020E01/emplistGrid/",
        params: {
          p_use_yn: 'Y',
          p_emp_name: searchValue.p_emp_name,
          p_dept_code: searchValue.p_dept_code,
          p_responsi_code: searchValue.p_responsi_name,
          p_job_code: searchValue.p_job_name,
        },
      };
      return this.httpRequest(config);
    };
  }