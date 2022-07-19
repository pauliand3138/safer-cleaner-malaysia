import React, { useState, useEffect, useRef } from 'react';
import FileBase from 'react-file-base64';
import { TextField, Button, Typography, Paper, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost, getPosts } from '../../actions/posts';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";



const apiKey = "AIzaSyDjaU6eyW5mXcO5IuJArDAhvCY5POG68AM";
const mapApiJs = 'http://maps.googleapis.com/maps/api/js';

//load google map api js

function loadAsyncScript(src) {
    return new Promise(resolve => {
        const script = document.createElement("script");
        Object.assign(script, {
            type: "text/javascript",
            async: true,
            src
        })
        script.addEventListener("load", () => resolve(script));
        document.head.appendChild(script);
    })
}
const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ title: '', address: '', message: '', category: 'Road', selectedFile: ''});
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    //const [address, setAddress] = useState("");

    let searchInput = "";   
    
    const initMapScript = () => {
        if (window.google) {
            return Promise.resolve();
        }
        const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
    
        return loadAsyncScript(src);
    }

    const onChangeAddress = (autocomplete) => {
        const location = autocomplete.getPlace();
        console.log(location.address_components);
        const addressArray = location.address_components.map((component) => {
            return component.long_name;
        });
        const addressText = addressArray.join(", ");
        console.log(addressText);
        setPostData(prevPostData => {
            return {
                ...prevPostData,
                address: addressText
            }
        });
    }

    const initAutocomplete = () => {    
        if (!searchInput) {
            console.log("Input not found");
            return;
        }
        
        const options = {
            componentRestrictions: { country: "my" },
        };

        const autocomplete = new window.google.maps.places.Autocomplete(searchInput, options);
        autocomplete.setFields(["address_component", "geometry"]);
        autocomplete.addListener("place_changed", () => onChangeAddress(autocomplete));
    }

    // load map script after mounted
    useEffect(() => {
        setTimeout(function() {
            initMapScript().then(() => initAutocomplete())
        }, 500);
        searchInput = document.getElementById("address-input");
    }, []);


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
    
    //const handleSelect = async (value) => {}
    
    return (
        
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">{ currentId ? 'Edit' : 'Lodge' } a Report</Typography>
            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
            <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
            <TextField id="address-input" name="address" variant="outlined" label="Address" autoComplete="nope" fullWidth value={postData.address} onChange={(e) => setPostData({ ...postData, address: e.target.value })}/>
            
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
            {/* <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
            {({ getInputProps, suggestions, getSuggestionItemProps, loading}) => 
                <div>
                    <TextField {...getInputProps({label: "Type address"})} autoComplete='off'/>
                    <div>
                        {loading ? <div>...loading</div> : null}

                        {suggestions.map((suggestion) => {
                            const style = {
                                backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                            };
                            return (
                                <div {...getSuggestionItemProps(suggestion, { style })}>
                                    {suggestion.description}
                                </div>
                            );
                        })}
                    </div>
                </div> 
            }
            </PlacesAutocomplete> */}
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;