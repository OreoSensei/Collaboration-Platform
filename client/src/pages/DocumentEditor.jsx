import React, {useState, useEffect, useRef} from "react";
import { io } from 'socket.io-client';
import ReactQuill from 'react-quill';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import 'react-quill/dist/quill.snow.css';

function DocumentEditor() {
    const {id: documentId} = useParams();
    const [content, setContent] = useState('');
    const socketRef = useRef();
    const navigate = useNavigate();

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        if(!isAuthenticated) {
            //Redirecting to login page if not authenticated
            navigate('/');
        }
    }, [isAuthenticated, navigate])

    useEffect(() => {
        socketRef.current = io('http://localhost:5000');

        socketRef.current.emit('join-document', documentId);

        socketRef.current.on('load-document', (document) => {
            setContent(document.content);
        });

        socketRef.current.on('receive-changes', (delta) => {
            setContent(delta);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [documentId]);

    const handleChange = (value) => {
        setContent(value);
        socketRef.current.emit('send-changes', value);
    };

    return (
        <div>
            <ReactQuill value={content} onChange={handleChange} />
        </div>
    );
}

export default DocumentEditor;