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
    
  }