//board_list.js 

import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';//bootstrap 
import axios from 'axios';
import TableRow from './TableRow';
import { Link } from 'react-router-dom';

class BoardList extends Component {
    //생성자는 무조건 
    constructor(props) {
        super(props);
        this.state = { board: [], key: "", searchTxt: "" }
        //정보를 저장할공간 , board 라는 배열을 저장하겠다 
    }

    //모든 컴포넌트가 화면애 뿌리진 이후에 componentDidMount라는 함수가 호출되도록 약속되어 있다
    //jquery의 document.ready나 window.onload 에 대응된다 
    //
    componentDidMount() {
        //ajax호출하기
        var url = "http://localhost:4000/board/list/1";
        axios.get(url)
            .then((response) => {
                console.log(response);
                this.setState({
                    board: response.data
                }
                )
            })
            .catch((error) => {
                console.log(error);
            })

    }

    // 함수 - map 함수가 모든 요소에 대해서 이 함수를 적용하라 
    // [{"id":1,"title":"제목1","contents":"내용1","writer":"작성자1"},
    //{"id":2,"title":"제목2","contents":"내용2","writer":"작성자2"},
    //{"id":3,"title":"제목3","contents":"내용3","writer":"작성자3"},
    //{"id":4,"title":"제목4","contents":"내용4","writer":"작성자4"},
    //{"id":5,"title":"제목5","contents":"내용5","writer":"작성자5"}]

    tabRow() {
        return this.state.board.map(function (object, i) {
            //대상과 인덱스
            console.log(object, i)  //위 배열의 객체와 파라미터값 
            /*return(
                <tr>
                    <td>{object.id}</td>
                    <td>{object.title}</td>
                    <td>{object.writer}</td>
                </tr>
            )*/
            return <TableRow obj={object} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>목록불러오기</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>title</th>
                            <th>writer</th>
                            <th colSpan="2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tabRow()}
                    </tbody>
                </table>
                <Link to={"/board_write"} className="btn btn-primary">글쓰기</Link>
            </div>
        )
    }
}

export default BoardList;

