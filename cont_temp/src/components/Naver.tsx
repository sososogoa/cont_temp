const NaverLoginButton = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:3000/api/oauth/naver";
  };

  return <button onClick={handleLogin}>네이버로 로그인</button>;
};

export default NaverLoginButton;
