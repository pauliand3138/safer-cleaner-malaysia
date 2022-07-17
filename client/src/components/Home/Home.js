import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom'; 

import { getPosts, getPostsBySearch } from '../../actions/posts';
import Pagination from '../Pagination';
import useStyles from './styles';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () =>  {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    // useEffect(() => {
    //     dispatch(getPosts());
    // }, [currentId]);

    const searchReport = () => {
        if (search.trim() || category) {
            dispatch(getPostsBySearch({search, category}));
            history.push(`/posts/search?searchQuery=${search || 'none'}&category=${category}`);
        } else {
            history.push('/');
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) { //Enter key
            searchReport();
        }
    }
    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                    <AppBar className={classes.appBarSearch} position="static" color="inherit">
                        <TextField 
                            name="search" 
                            variant="outlined" 
                            label="Search Reports"
                            onKeyPress={handleKeyPress}
                            fullWidth
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <FormControl style={{ margin: '10px 0' }} variant="outlined" fullWidth>
                            <InputLabel id="demo-simple-select-label">Search Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={category}
                                    label="Category"
                                    onChange={(e) => setCategory(e.target.value)}
                                >      
                                    <MenuItem value={""}>None</MenuItem>
                                    <MenuItem value={"Road"}>Road</MenuItem>
                                    <MenuItem value={"Drain"}>Drain</MenuItem>
                                    <MenuItem value={"Trees"}>Trees</MenuItem>
                                    <MenuItem value={"Others"}>Others</MenuItem>
                                    
                                </Select>
                        </FormControl>
                        <Button onClick={searchReport} className={classes.searchButton} color="primary" variant="contained">Search</Button>
                    </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        {(!searchQuery && !category.length) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination page={page}/>
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}
    

export default Home;