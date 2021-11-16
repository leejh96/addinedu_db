//board_edit.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function BoardEdit() {
    const [state, setState] = useState({
        title : '',
        writer : '',
        contents : '',
    })
    const { title, writer, contents } = state;
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:4000/board/${id}`)
        .then(res => {
            const { title, writer, contents} = res.data[0];
            setState({
                ...state,
                title,
                writer,
                contents
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }, [id, state])

    const onClickSave = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:4000/board/${id}`, state)
            .then(navigate("/board/1"))
            .catch((error) => {
                console.log(error)
            })
    };

    const onChangeInput = (e) => {
        const { name, value} = e.target;
        setState({
            ...state,
            [name] : value
        })
    }
    return (
        <div>
        <h1>글쓰기</h1>
        <form onSubmit={onClickSave}>
            <div className="form-group">
                <label>title : </label>
                <input type="text" className="form-control"
                    value={title}
                    name='title'
                    onChange={onChangeInput} />
            </div>
            <div className="form-group">
                <label>writer : </label>
                <input type="text" className="form-control"
                    name='writer'
                    value={writer}
                    onChange={onChangeInput} />
            </div>

            <div className="form-group">
                <label>contents : </label>
                <input type="text" className="form-control"
                    name='contents'
                    value={contents}
                    onChange={onChangeInput} />
            </div>
            <div className="form-group">
                <button type='submit' className="btn btn-primary">저장</button>
            </div>
        </form>
    </div>
    )
}

export default BoardEdit