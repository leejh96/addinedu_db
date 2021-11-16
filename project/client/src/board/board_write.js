//board_write.js
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
class BoardWrite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            writer: "",
            contents: ""
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault(); //서버로 가는거 막음 
        console.log(`${this.state.title} ${this.state.writer}`);

        //서버로 보내야할 정보가 json 객체로 만들어서 보내면 된다 
        Axios.post('http://localhost:4000/board/insert', this.state)
            .then((response) => {
                this.props.history.push("/board");
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
                        <button className="btn btn-primary">등록</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default BoardWrite;
