import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function BoardWrite() {
    const [state, setState] = useState({
        title: "",
        writer: "",
        contents: ""
    });
    const navigate = useNavigate();
    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/board/insert', state)
            .then(navigate("/board/1"))
            .catch((error) => {
                console.log(error)
            })
    }
    const onChangeInput = (e) => {
        console.log(state);
        const { name, value } = e.target;
        setState({
            ...state,
            [name] : value
        })
    }
    return (
        <div>
            <h1>글쓰기</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>title : </label>
                    <input 
                        type="text" 
                        className="form-control"
                        onChange={onChangeInput}
                        name='title'    
                    />
                </div>
                <div className="form-group">
                    <label>writer : </label>
                    <input 
                        type="text" 
                        className="form-control"
                        onChange={onChangeInput}
                        name='writer' 
                    />
                </div>

                <div className="form-group">
                    <label>contents : </label>
                    <input
                        type="text"
                        className="form-control"
                        name='contents'    
                        onChange={onChangeInput}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">등록</button>
                </div>
            </form>
        </div>
    )
}

export default BoardWrite