import React, { useEffect } from 'react'
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';

import { getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';

const PostDetails = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPost(id));

    },[id]); 

    useEffect(() => {
        if (post) {
            dispatch(getPostsBySearch({ search: 'none', category: post?.category}));
        }
    }, [post]);

    if(!post) return null;

    if(isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em"/>
            </Paper>
        );   
    }

    const similarPosts = posts.filter(({ _id }) => _id !== post._id);

    const openPost = (_id) => {
        history.push(`/posts/${_id}`);
    };

    console.log(post.address);
    const mapAddress = post.address.replace(/ /g, "+");
    console.log(mapAddress);
    return (
        <Paper style={{padding: '20px', borderRadius: '15px' }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{post.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.category}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                    <Typography variant="h6" style={{ marginTop: '50px' }} >Created by: {post.name}</Typography>
                    <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="body1"><strong>Location</strong></Typography>
                    <iframe
                        width="750"
                        height="350"
                        frameBorder={0} style={{ border: "0" }}
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyB65pbvfcLtbLDv26720v5TbxE_WGpx3oc&q=${mapAddress}&zoom=16`}
                        allowFullScreen>
                    </iframe>
                    <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} elevation={6}/>
                </div>
        </div>
        {similarPosts.length && (
            <div className={classes.section}>
                <Typography gutterBottom variant="h5">Similar Reports: </Typography>
                <Divider/>
                <div className={classes.similarPosts}>
                    {similarPosts.slice(0, 5).map(({ title, message, name, upvotes, selectedFile, _id }) => {
                        return (
                            <div style={{ margin: '20px', cursor: "pointer" }} onClick={() => openPost(_id)} key={_id}>
                                <Typography gutterBottom variant="h6">{title}</Typography>
                                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                                <Typography gutterBottom variant="subtitle1">Upvotes: {upvotes.length}</Typography>
                                <img src={selectedFile} width="200px"/>
                            </div>
                        )
                    })}
                </div>
            </div>
        )}
      </Paper>
    ) 
}

export default PostDetails