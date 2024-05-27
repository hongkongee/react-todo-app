const handleError = (error, onLogout, redirection) => {
  console.log('handleError 호출됨!');
  if (error.response && error.response.status === 401) {
    alert('로그인 시간이 만료되었습니다. 다시 로그인 해 주세요.');
    onLogout();
    redirection('/');
  } else if (error.response && error.response.status === 400) {
    // 400 error 에 대한 내용
  } else if (error.response && error.response.status === 403) {
    // 403 error 에 대한 내용
  }
};

const handleRequest = async (requestFunc, onSuccess, onLogout, redirection) => {
  try {
    const res = await requestFunc();
    if (res.status === 200) {
      onSuccess(res.data);
    }
  } catch (error) {
    console.log(error);
    handleError(error, onLogout, redirection);
  }
};

export default handleRequest;