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
        url: "/api/bzcm/EDU020E02/byYearEduList/",
        params: {
          p_use_yn: 'Y',
          p_edu_year:searchValue.EDU_YEAR
        },
      };
      return this.httpRequest(config);
    };

    retrieve2 = async (searchValue) => {
      const config = {
        url: "/api/bzcm/EDU020E02/byDeptEduList/",
        params: {
          p_use_yn: 'Y',
          p_edu_year:searchValue.EDU_YEAR
        },
      };
      return this.httpRequest(config);
    };

    retrieve3 = async (searchValue) => {
      const config = {
        url: "/api/bzcm/EDU020E02/byEmpEduRankList/",
        params: {
          p_use_yn: 'Y',
          p_edu_year:searchValue.EDU_YEAR
        },
      };
      return this.httpRequest(config);
    };

    retrieve4 = async (searchValue) => {
      const config = {
        url: "/api/bzcm/EDU020E02/byDeptEduRankList/",
        params: {
          p_use_yn: 'Y',
          p_edu_year:searchValue.EDU_YEAR
        },
      };
      return this.httpRequest(config);
    };

    retriveModal = async (searchValue) => {
      
      const config = {
        url: "/api/bzcm/EDU020E02/eduListGrid/",
        params: {
          p_use_yn: 'Y',
          p_emp_name: searchValue.p_emp_name,
          p_dept_code: searchValue.p_dept_code,
          p_edu_year: searchValue.p_edu_year,
          p_cmplt_yn: searchValue.p_cmplt_yn,
          p_emp_no: searchValue.p_emp_no,
        },
      };
      return this.httpRequest(config);
    };

    mailSendModal = async (mailInfo) => {
      
      const config = {
        url: "/api/bzcm/EDU020E02/eduEmailSend/",
        params: {
          p_email: mailInfo.email,
          p_edu_year: mailInfo.edu_year,
          p_edu_plan_hour: mailInfo.edu_plan_hour,
          p_edu_cmplt_hour: mailInfo.edu_cmplt_hour,
          p_edu_cmplt_rate: mailInfo.edu_cmplt_rate,
        },
      };
      return this.httpRequest(config);
    };
    
  }