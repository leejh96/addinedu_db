//board_edit.js
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
class BoardEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            writer: "",
            contents: "",
            id: "",
            _id: ""
        }
        this.save = this.save.bind(this);
    }
    save(e) {
        e.preventDefault();
        Axios.post('http://localhost:4000/board/update', this.state)
            .then((response) => {
                this.props.history.push("/board");
            })
            .catch((error) => {
                console.log(error)
            })
    }

    //객체가 화면에 렌더링이 되고 나면, 이 함수가 호출된다 
    //document.ready 나 window.onload 에 해당된다 
    componentDidMount() {
        //수정 아이디값 
        // http://localhost:3000/edit/몽고디비가생성한아이디값

        console.log(this.props.match.params._id);

        //서버로 보내야할 정보가 json 객체로 만들어서 보내면 된다 
        Axios.get('http://localhost:4000/board/view/' + this.props.match.params._id)
            .then((response) => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    writer: response.data.writer,
                    contents: response.data.contents
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    render() {
        return (
            <div>
                <h1>글쓰기</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>title : </label>
                        <input type="text" className="form-control"
                            value={this.state.title}
                            onChange={(e) => this.setState({ "title": e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>writer : </label>
                        <input type="text" className="form-control"
                            value={this.state.writer}
                            onChange={(e) => this.setState({ "writer": e.target.value })} />
                    </div>

                    <div className="form-group">
                        <label>title : </label>
                        <input type="text" className="form-control"
                            value={this.state.contents}
                            onChange={(e) => this.setState({ "contents": e.target.value })} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" onClick={this.save}>저장</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default BoardEdit;
