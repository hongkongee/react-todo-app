import {
  Link,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useReducer, useState } from 'react';
import { API_BASE_URL, USER } from '../../config/host-config';
import { initialState, joinReducer } from './joinReducer';
import { debounce } from 'lodash';

const Join = () => {
  // useReducer를 사용해서 리듀서 함수 등록, state와 dispatch를 전달 받음.
  const [state, dispatch] = useReducer(joinReducer, initialState);

  // 상태 객체에서 각각의 상태 객체값을 분해할당.
  const { userValue, message, correct } = state;

  // 이름 입력창 체인지 이벤트 핸들러
  const nameHandler = debounce((inputValue) => {
    console.log('nameHandler가 동작함!');
    const nameRegex = /^[가-힣]{2,5}$/;

    // 입력값 검증
    let msg; // 검증 메세지를 저장할 변수
    let flag = false; // 입력값 검증 여부 체크 변수

    if (!inputValue) {
      msg = '유저 이름은 필수입니다.';
    } else if (!nameRegex.test(inputValue)) {
      msg = '2~5글자 사이의 한글로 작성하세요!';
    } else {
      msg = '사용 가능한 이름입니다.';
      flag = true;
    }

    dispatch({
      type: 'SET_USER_VALUE',
      key: 'userName',
      value: inputValue,
    });
    dispatch({
      type: 'SET_MESSAGE',
      key: 'userName',
      value: msg,
    });
    dispatch({
      type: 'SET_CORRECT',
      key: 'userName',
      value: flag,
    });
  }, 500);

  // 이메일 중복 체크 서버 통신 함수
  const fetchDuplicateCheck = (email) => {
    let msg = '';
    let flag = false;

    fetch(`${API_BASE_URL}${USER}/check?email=${email}`)
      .then((res) => res.json())
      .then((result) => {
        console.log('result: ');
        if (result) {
          msg = '이메일이 중복되었습니다.';
        } else {
          msg = '사용 가능한 이메일 입니다.';
          flag = true;
        }

        dispatch({ type: 'SET_USER_VALUE', key: 'email', value: email });
        dispatch({ type: 'SET_MESSAGE', key: 'email', value: msg });
        dispatch({ type: 'SET_CORRECT', key: 'email', value: flag });
      });
  };

  // 이메일 입력창 체인지 이벤트 핸들러
  const emailHandler = debounce((inputValue) => {
    const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

    let msg;
    let flag = false;

    if (!inputValue) {
      msg = '이메일은 필수값 입니다!';
    } else if (!emailRegex.test(inputValue)) {
      msg = '이메일 형식이 올바르지 않습니다.';
    } else {
      // 이메일 중복 체크
      fetchDuplicateCheck(inputValue);
    }

    dispatch({ type: 'SET_USER_VALUE', key: 'email', value: inputValue });
    dispatch({ type: 'SET_MESSAGE', key: 'email', value: msg });
    dispatch({ type: 'SET_CORRECT', key: 'email', value: flag });
  }, 500);

  // 패스워드 입력창 체인지 이벤트 핸들러
  const passwordHandler = debounce((inputValue) => {
    document.getElementById('password-check').value = '';
    dispatch({ type: 'SET_MESSAGE', key: 'passwordCheck', value: msg });
    dispatch({ type: 'SET_CORRECT', key: 'passwordCheck', value: false });
    const pwRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

    let msg;
    let flag = false;

    if (!inputValue) {
      msg = '패스워드는 필수값 입니다!';
    } else if (!pwRegex.test(inputValue)) {
      msg = '패스워드 형식이 올바르지 않습니다.';
    } else {
      msg = '사용 가능한 패스워드 입니다.';
      flag = true;
    }

    dispatch({ type: 'SET_USER_VALUE', key: 'password', value: inputValue });
    dispatch({ type: 'SET_MESSAGE', key: 'password', value: msg });
    dispatch({ type: 'SET_CORRECT', key: 'password', value: flag });
  });

  // 패스워드 확인 입력창 체인지 이벤트 핸들러
  const passwordCheckHandler = debounce((inputValue) => {
    let msg;
    let flag = false;

    if (!inputValue) {
      msg = '패스워드를 확인해주세요';
    } else if (inputValue !== userValue.password) {
      msg = '패스워드가 일치하지 않습니다.';
    } else {
      msg = '패스워드가 일치합니다.';
      flag = true;
    }
    dispatch({ type: 'SET_MESSAGE', key: 'passwordCheck', value: msg });
    dispatch({ type: 'SET_CORRECT', key: 'passwordCheck', value: flag });
  }, 500);

  // 4개의 입력창이 모두 검증에 통과했는지 여부를 검사
  const isValid = () => {
    for (let key in correct) {
      const flag = correct[key];
      if (!flag) return false;
    }
    return true;
  };

  // 회원 가입 처리 서버 요청
  const fetchSignupPost = () => {
    fetch(`${API_BASE_URL}${USER}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(userValue),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(`${data.userName}(${data.email})님, 회원가입에 성공했습니다.`);
      })
      .catch((err) => {
        console.log('err: ', err);
        alert('서버와의 통신이 원활하지 않습니다. 관리자에게 문의하세요.');
      });
  };

  // 회원 가입 버튼 클릭 이벤트 핸들러
  const joinButtonClickHandler = (e) => {
    e.preventDefault();

    if (isValid()) {
      fetchSignupPost();
    } else {
      alert('입력란을 다시 확인해 주세요!');
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ margin: '200px auto' }}>
      <form noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5">
              계정 생성
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="fname"
              name="username"
              variant="outlined"
              required
              fullWidth
              id="username"
              label="유저 이름"
              autoFocus
              onChange={(e) => nameHandler(e.target.value)}
            />
            <span
              style={correct.userName ? { color: 'green' } : { color: 'red' }}
            >
              {message.userName}
            </span>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="이메일 주소"
              name="email"
              autoComplete="email"
              onChange={(e) => emailHandler(e.target.value)}
            />
            <span style={correct.email ? { color: 'green' } : { color: 'red' }}>
              {message.email}
            </span>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="패스워드"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => passwordHandler(e.target.value)}
            />
            <span
              style={correct.password ? { color: 'green' } : { color: 'red' }}
            >
              {message.password}
            </span>
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password-check"
              label="패스워드 확인"
              type="password"
              id="password-check"
              autoComplete="check-password"
              onChange={(e) => passwordCheckHandler(e.target.value)}
            />
            <span
              style={
                correct.passwordCheck ? { color: 'green' } : { color: 'red' }
              }
            >
              {' '}
              {message.passwordCheck}{' '}
            </span>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ background: '#38d9a9' }}
              onClick={joinButtonClickHandler}
            >
              계정 생성
            </Button>
          </Grid>
        </Grid>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              이미 계정이 있습니까? 로그인 하세요.
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Join;
