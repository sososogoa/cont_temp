import { useEffect, useState } from "react";
import { getUserInfo } from "../api/usersAPI";
import { User } from "../types/User";

const Home = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUserInfo(data);
        setLoading(false);
      } catch (error) {
        setError(`사용자 정보를 불러오는 중 오류가 발생했습니다: ${error}`);
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <div>로딩 중</div>;
  }

  if (error) {
    return <div>오류 : {error}</div>;
  }

  return (
    <div>
      {userInfo ? (
        <div>
          <h1>{userInfo.name}</h1>
          <p>{userInfo.email}</p>
          <p>{userInfo.mobile}</p>
        </div>
      ) : (
        <div>로그인 정보 없음</div>
      )}
    </div>
  );
};

export default Home;
