import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { TextField, Button, Typography, Paper, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost, getPosts } from '../../actions/posts';


// Get current post ID

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ title: '', address: '', message: '', category: 'Road', selectedFile: ''});
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
            dispatch(getPosts());
        }
        clear();
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please sign in to lodge your report or upvote other's reports.
                </Typography>
            </Paper>
        )
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', address: '', message: '', category: 'Road', selectedFile: ''});
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">{ currentId ? 'Edit' : 'Lodge' } a Report</Typography>
            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
            <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
            <Autocomplete>
                <TextField name="address" variant="outlined" label="Address" fullWidth value={postData.address} onChange={(e) => setPostData({ ...postData, address: e.target.value })}/>
            </Autocomplete> 
            <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={postData.category}
                        label="Category"
                        onChange={(e) => setPostData({ ...postData, category: e.target.value })}
                    >
                        <MenuItem value={"Road"}>Road</MenuItem>
                        <MenuItem value={"Drain"}>Drain</MenuItem>
                        <MenuItem value={"Trees"}>Trees</MenuItem>
                        <MenuItem value={"Others"}>Others</MenuItem>
                    </Select>
            </FormControl>
            <div className={classes.fileInput}>
                <FileBase
                    type="file"
                    multiple={false}
                    onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}/>
            </div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;