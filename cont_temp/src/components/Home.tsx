import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

  const fadeInVariants = {
    // hidden: { opacity: 0, y: 20 },
    // visible: (custom: number) => ({
    //   opacity: 1,
    //   y: 0,
    //   transition: { delay: custom * 0.7 },
    // }),
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        {userInfo ? (
          <div>
            <motion.h1
              className="text-4xl font-bold"
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              {userInfo.name}
            </motion.h1>
            <motion.p
              className="text-2xl"
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              {userInfo.email}
            </motion.p>
            <motion.p
              className="text-2xl"
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              {userInfo.mobile}
            </motion.p>
          </div>
        ) : (
          <div className="text-xl">로그인 정보 없음</div>
        )}
      </div>
    </div>
  );
};

export default Home;
