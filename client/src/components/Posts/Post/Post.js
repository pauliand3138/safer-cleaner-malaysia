import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();

    const Upvotes = () => {
        if (post.upvotes.length > 0) {
            return post.upvotes.find((upvote) => upvote === (user?.result?.sub || user?.result?._id))
            ? (
                <><PublishIcon style={{ marginTop:"-3px" }}fontSize="small"/>&nbsp;{post.upvotes.length > 2 ? `You and ${post.upvotes.length - 1} others` : `${post.upvotes.length} upvote${post.upvotes.length > 1 ? 's' : ''}`}</>
            ) : (
                <><PublishOutlinedIcon style={{ marginTop:"-3px" }} fontSize="small"/>&nbsp;{post.upvotes.length} {post.upvotes.length === 1 ? 'Upvote' : 'Upvotes'}</> 
            );
        }
        
        return <><PublishOutlinedIcon style={{ marginTop:"-3px" }} fontSize="small"/>&nbsp;Upvote</>;
    }

    const openPost = () => {
        history.push(`/posts/${post._id}`);
    };

    return (
        <Card className={classes.card} raised elevation={6}>
        <ButtonBase className={classes.cardAction} onClick={openPost}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
                <div className={classes.overlay2}>
                    <Button
                    style={{color: 'white'}}
                    size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        setCurrentId(post._id);
                    }}>
                        <MoreHorizIcon fontSize="medium"/>
                    </Button>
                </div>
            )}
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.category}</Typography>
            </div>
            <Typography className={classes.title} variant="h6" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                    <Upvotes/>
                </Button>
                {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small"/>
                            Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}

export default Post;