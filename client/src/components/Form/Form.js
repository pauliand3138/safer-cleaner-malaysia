import React, { useState } from 'react';
import FileBase from 'react-file-base64';
import { TextField, Button, Typography, Paper, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { createPost } from '../../actions/posts';

const Form = () => {
    const [postData, setPostData] = useState({creator: '', title: '', address: '', message: '', category: 'Road', selectedFile: ''});
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createPost(postData));
    }

    const clear = () => {

    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">Lodge a Report</Typography>
            <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })}/>
            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
            <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
            <TextField name="address" variant="outlined" label="Address" fullWidth value={postData.address} onChange={(e) => setPostData({ ...postData, address: e.target.value })}/>
            <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={postData.category}
                        label="Age"
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