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

  // 조회 API 함수
  // 그리드를 먼저 그린 다음 필요한 파라미터들을 최경호에게 전달 > 경호 : API 테스트 후 적용
  retrieve = async (searchValue) => {
    const config = {
      url: '/api/bzcm/EDU010E01/list/',

      params: {
        // API에서 사용할 조회파라미터 설정
        // 파라미터 추가/수정/삭제시 최경호에게 전달
        p_edu_year: searchValue.EDU_YEAR,
        p_edu_name: searchValue.EDU_NAME,
        p_emp_no: searchValue.EMP_NAME,
      },
    };
    return this.httpRequest(config);
  };

  getMaxEduSchedule = async (searchValue) => {
    const config = {
      url: '/api/bzcm/EDU010E01/getMaxEduSchedule/',
      params: {
        // API에서 사용할 조회파라미터 설정
        // 파라미터 추가/수정/삭제시 최경호에게 전달
        // p_edu_year: searchValue.EDU_YEAR,
        // p_edu_name: searchValue.EDU_NAME,
        // p_emp_no: searchValue.EMP_NO,
      },
    };
    return this.httpRequest(config);
  };

  getEmpInfo = async (searchValue) => {
    // console.log('testtestetetsttet0' + searchValue);

    const config = {
      url: '/api/bzcm/EDU010E01/getEmpInfo/',
      params: {
        // API에서 사용할 조회파라미터 설정
        // 파라미터 추가/수정/삭제시 최경호에게 전달
        p_emp_no: searchValue,
      },
    };
    return this.httpRequest(config);
  };

  // 저장 API 함수
  saveData = async (master) => {
    const config = {
      url: '/api/bzcm/EDU010E01/',
      // 저장할 테이블을 기술
      params: { pang_edu_plan_mgnt: master },
    };
    return this.httpRequest(config);
  };
}
