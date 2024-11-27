const express = require("express");
const router = express.Router();
const Board = require("../schemas/board");

// 게시글 삭제
router.post("/delete", async (req, res) => {
  try {
    await Board.deleteOne({ _id: req.body._id });
    res.json({ message: true });
  } catch (err) {
    console.error(err);
    res.json({ message: false });
  }
});

// 게시글 수정
router.post("/update", async (req, res) => {
  try {
    await Board.updateOne(
      { _id: req.body._id },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
        },
      }
    );
    res.json({ message: "게시글이 수정되었습니다." });
  } catch (err) {
    console.error(err);
    res.json({ message: false });
  }
});

// 게시글 작성
router.post("/write", async (req, res) => {
  try {
    const obj = {
      writer: req.body._id,
      title: req.body.title,
      content: req.body.content,
    };

    const board = new Board(obj);
    await board.save();
    res.json({ message: "게시글이 업로드되었습니다." });
  } catch (err) {
    console.error(err);
    res.json({ message: false });
  }
});

// 게시글 목록 가져오기
router.post("/getBoardList", async (req, res) => {
  try {
    const _id = req.body._id;
    const board = await Board.find({ writer: _id })
      .sort({ createdAt: -1 }); // 정렬
    res.json({ list: board });
  } catch (err) {
    console.error(err);
    res.json({ message: false });
  }
});

// 게시글 상세보기
router.post("/detail", async (req, res) => {
  try {
    const _id = req.body._id;
    const board = await Board.findById(_id); // findById 사용 권장
    res.json({ board });
  } catch (err) {
    console.error(err);
    res.json({ message: false });
  }
});

module.exports = router;
