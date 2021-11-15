import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';//bootstrap 
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function TableRow({ board, deleteList }){
    return(
        <>
        {
            board.map((post) => {
                return (
                    <tr key={post.id}>
                        <td>{post.id}</td>
                        <td>{post.title}</td>
                        <td>{post.writer}</td>
                        <td>
                            <Link to={`/board/edit/${post.id}`} className="btn btn-primary">수정</Link>
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={() => deleteList(post.id)}>삭제</button>
                        </td>
                </tr>
                )
            })
        }

        </>
    )
}

function BoardList() {
    const { page } = useParams();
    const [board, setBoard] = useState([]);
    useEffect(() => {
        const url = `http://localhost:4000/board/list/${page}`;
        axios.get(url)
            .then((res) => {
                setBoard(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [page])

    const deleteList = (id) => {
        if (window.confirm("삭제하시겠습니까?")) {
            axios.delete(`http://localhost:4000/board/${id}`)
                .then(
                    board.filter(post => {
                        return post.id === id
                    })
                )
                .catch((error) => {
                    console.log(error)
                })
        }
    }
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
                <TableRow board={board} deleteList={deleteList}/>
            </tbody>
        </table>
        <Link to={"/board/write"} className="btn btn-primary">글쓰기</Link>
    </div>
    )
}

export default BoardList;

