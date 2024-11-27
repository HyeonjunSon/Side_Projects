const mongoose = require("mongoose");

module.exports = () => {
  const connect = async () => {
    try {
      if (process.env.NODE_ENV !== "production") {
        mongoose.set("debug", true); // 디버그 모드 활성화
      }

      await mongoose.connect("mongodb://localhost:27017/til", {
        dbName: "til",
      });

      console.log("몽고디비 연결 성공");
    } catch (error) {
      console.error("몽고디비 연결 에러", error);
    }
  };

  connect();

  // 연결 에러 처리
  mongoose.connection.on("error", (error) => {
    console.error("몽고디비 연결 에러", error);
  });

  // 연결 끊김 처리
  mongoose.connection.on("disconnected", () => {
    console.warn("몽고디비 연결이 끊겼습니다. 연결을 재시도 합니다.");
    connect();
  });

  // 스키마 파일 로드
  require("./user");
  require("./board");
};
