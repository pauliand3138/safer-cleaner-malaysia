import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from 'react-redux';

import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const Upvotes = () => {
        if (post.upvotes.length > 0) {
            return post.upvotes.find((upvote) => upvote === (user?.result?.googleId || user?.result?._id))
            ? (
                <><ArrowDropUpIcon fontSize="medium"/>&nbsp;{post.upvotes.length > 2 ? `You and ${post.upvotes.length - 1} others` : `${post.upvotes.length} upvote${post.upvotes.length > 1 ? 's' : ''}`}</>
            ) : (
                <><ArrowDropUpIcon fontSize="small"/>&nbsp;{post.upvotes.length} {post.upvotes.length === 1 ? 'Upvote' : 'Upvotes'}</> 
            );
        }
        
        return <><ArrowDropUpIcon fontSize="small"/>&nbsp;Upvote</>;
    }

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <div className={classes.overlay2}>
                    <Button
                    style={{color: 'white'}}
                    size="small"
                    onClick={() => setCurrentId(post._id)}>
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
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                    <Upvotes/>
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
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