import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class BoardDetail extends Component {
  state = {
    board: [],
    query: {}
  };

  componentDidMount() {
    const searchParams = new URLSearchParams(window.location.search);
    const query = {
      _id: searchParams.get("_id"),
      title: searchParams.get("title"),
      content: searchParams.get("content")
    };
    
    if (query._id) {
      this.setState({ query }, () => this.getDetail());
    } else {
      window.location.href = "/";
    }
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.match.params._id !== prevProps.match.params._id) {
      this.getDetail(); // URL 변경 시 데이터 재요청
    }
  }

  deleteBoard = _id => {
    const send_param = {
      headers,
      _id
    };
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .post("http://localhost:8080/board/delete", send_param)
        .then(() => {
          alert("게시글이 삭제 되었습니다.");
          window.location.href = "/";
        })
        .catch(err => {
          console.log(err);
          alert("글 삭제 실패");
        });
    }
  };

  getDetail = () => {
    const { _id } = this.state.query;
    const marginBottom = {
      marginBottom: 5
    };

    axios
      .get(`http://localhost:8080/board/detail/${this.state.query._id}`, { headers })
      .then(returnData => {
        if (returnData.data.board) {
          const boardData = returnData.data.board;
          const board = (
            <div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>{boardData.title}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      dangerouslySetInnerHTML={{
                        __html: boardData.content
                      }}
                    ></td>
                  </tr>
                </tbody>
              </Table>
              <div>
                <NavLink
                  to={{
                    pathname: "/boardWrite",
                    search: `?title=${encodeURIComponent(
                      boardData.title
                    )}&content=${encodeURIComponent(
                      boardData.content
                    )}&_id=${_id}`
                  }}
                >
                  <Button className="btn-block" style={marginBottom}>
                    글 수정
                  </Button>
                </NavLink>
                <Button
                  className="btn-block"
                  onClick={() => this.deleteBoard(_id)}
                >
                  글 삭제
                </Button>
              </div>
            </div>
          );
          this.setState({
            board: board
          });
        } else {
          alert("글 상세 조회 실패");
        }
      })
      .catch(err => {
        console.log(err);
        alert("글 상세 조회 중 오류 발생");
      });
  };

  render() {
    const divStyle = {
      margin: 50
    };
    return <div style={divStyle}>{this.state.board}</div>;
  }
}

export default BoardDetail;
