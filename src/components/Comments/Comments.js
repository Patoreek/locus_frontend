import React, { useState, useContext, useEffect } from 'react';

import { Form, Button } from 'react-bootstrap';

import { SiteContext } from '../../context/DiveSiteContext';

import classes from './Comments.module.css';

const Comments = () => {

    const [comment, setComment] = useState(null);

    const [siteComments, setSiteComments] = useState([]);

    const [selectedSite, setSelectedSite] = useContext(SiteContext);

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

    return (
        <div>
            <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Add Comment</Form.Label>
                    <Form.Control as="textarea" 
                                  rows="3"
                                  name="comment"
                                  onChange={e => setComment(e.target.value)}
                                  value={comment}
                    />
                    <Button variant="primary" onClick={submitComment}>
                        Comment
                    </Button>
                </Form.Group>
            </Form>

            {siteComments.map(comment => (
                <div className={classes.commentContainer}>
                    <h1>Username: {comment.commentUsername}</h1>
                    <h3> {comment.userComment}</h3>
                </div>
            ))}
            
        </div>
    );
};

export default Comments;