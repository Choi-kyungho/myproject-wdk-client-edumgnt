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
    retrieve1 = async (searchValue) => {
      const config = {
        url: "/api/bzcm/EDU020E04/byYearEduCostList/",
        params: {
          p_use_yn: 'Y',
          p_edu_year:searchValue.EDU_YEAR
        },
      };
      return this.httpRequest(config);
    };

    retrieve2 = async (searchValue) => {
      const config = {
        url: "/api/bzcm/EDU020E04/byDeptEduCostList/",
        params: {
          p_use_yn: 'Y',
          p_edu_year:searchValue.EDU_YEAR
        },
      };
      return this.httpRequest(config);
    };

    retrieve3 = async (searchValue) => {
      const config = {
        url: "/api/bzcm/EDU020E04/byEmpEduCostList/",
        params: {
          p_use_yn: 'Y',
          p_edu_year:searchValue.EDU_YEAR
        },
      };
      return this.httpRequest(config);
    };

    retrieveGrid1 = async (searchValue) => {
      const config = {
        url: "/api/bzcm/EDU020E04/byYearEduCostList_Grid1/",
        params: {
          p_use_yn: 'Y',
        },
      };
      return this.httpRequest(config);
    };

    retrieveGrid2 = async (searchValue) => {
      const config = {
        url: "/api/bzcm/EDU020E04/byDeptEduCostList_Grid1/",
        params: {
          p_use_yn: 'Y',
          p_edu_year:searchValue.EDU_YEAR
        },
      };
      return this.httpRequest(config);
    };
    
  }