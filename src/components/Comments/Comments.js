import React, { useState, useContext, useEffect } from 'react';

import { Form, Button, Col, Row } from 'react-bootstrap';

import { SiteContext } from '../../context/DiveSiteContext';

import { AccountContext, AuthContext } from '../../context/AuthContext';

import classes from './Comments.module.css';

const Comments = () => {

    const [comment, setComment] = useState(null);

    const [siteComments, setSiteComments] = useState([]);

    const [selectedSite, setSelectedSite] = useContext(SiteContext);

    const [account, setAccount] = useContext(AccountContext);

    const [isAuth, setIsAuth] = useContext(AuthContext);


    async function getComments() {

        try {
            const response = await fetch('http://localhost:8080/diveSites/getComments',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                        siteId: selectedSite._id
                })
            });
            const data = await response.json();
            console.log(data.commentData);
            setSiteComments(data.commentData.reverse());
            
        } catch (error) {
        console.log(error);
        //setIsLoading(null);
        }
    }

    useEffect(() => {
           
    getComments();

    }, []);


    const cancelComment = () => {
        setComment("");
    }


    const submitComment = () => {
        console.log('Comment Clicked!');
        console.log(comment);
        console.log(selectedSite._id);

        async function postComment() {

            try {
                const response = await fetch('http://localhost:8080/diveSites/addComment',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        siteId: selectedSite._id,
                        comment: comment 
                    }) 
                });
                const data = await response.json();
                console.log(data);
                if (data.success){
                    getComments();
                }
   
            } catch (error) {
            console.log(error);
            }
        }

        postComment();


    }


    const deleteCommentHandler = (commentId) => {
        // console.log(commentId);
        // console.log(selectedSite._id);
        // console.log(account.id);
        async function deleteComment() {

            try {
                const response = await fetch('http://localhost:8080/diveSites/deleteComment',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        commentId: commentId,
                        siteId: selectedSite._id
                    })
                });
                const data = await response.json();
                console.log(data);
                if (data.success){
                    getComments();
                }
   
            } catch (error) {
            console.log(error);
            }
        }

        deleteComment();
    }

    return (
        <div>
            {isAuth && (
                <Form className={classes.form}>
                    <Form.Group controlId="exampleForm.ControlTextarea1" as={Row} >
                    <Form.Label className={classes.addCommentHeader} column sm="3">{account.username} says </Form.Label>
                        <Col sm="9">
                        <Form.Control as="textarea" 
                                    rows="1"
                                    name="comment"
                                    onChange={e => setComment(e.target.value)}
                                    value={comment}
                                    placeholder="Add a comment..."
                                    className={classes.commentTextArea}
                        />
                        </Col>
                    </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1" as={Row} >
                        <Col sm="12">

                        <Button variant="secondary" 
                                onClick={cancelComment}
                                className={classes.cancelButton}
                        >
                            Cancel
                        </Button>
                    
                        <Button variant="primary" 
                                onClick={submitComment}
                                className={classes.commentButton}
                        >
                            Comment
                        </Button>

                       


                        </Col>
                    </Form.Group>
                </Form>
            )}
            {!isAuth && (
                <b>Log in or Sign up to add comments.</b>
            )}

            
            {siteComments.map(comment => (
                <div className={classes.commentsContainer}>
                    <div  className={classes.usernameContainer}>
                        <h6 className={classes.commentUsername}><a href={"/viewprofile/" + comment.userId}> {comment.commentUsername}</a></h6>
                    </div>

                    {account.id == comment.userId && (
                        <div  className={classes.deleteButtonContainer}>
                            <Button variant="danger" 
                                    onClick={() => deleteCommentHandler(comment.commentId)}
                                    className={classes.deleteButton}> Delete </Button>
                        </div>
                    )}

                    <div  className={classes.commentContainer}>
                        <p className={classes.comment}> {comment.userComment}</p>
                    </div>
                    {/* <p>CommentId = {comment.commentId}</p>
                    <p>UserId = {comment.userId}</p> */}
                </div>
            ))}
            
        </div>
    );
};

export default Comments;