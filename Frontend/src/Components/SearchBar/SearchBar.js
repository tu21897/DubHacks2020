import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './SearchBar.css'

import Container from 'react-bootstrap/Container';

function SearchBar() {
    const [search, setSearch] = useState('');

    const changeSearch = (event) => {
        var newSearch = event.target.value;
        setSearch(newSearch);
    }


    return (
        <Container className="d-flex align-items-center" id="searchBar">
            <Form.Control id="input-search" placeholder="Search Streamer..." className="input" value={search} onChange={changeSearch} />
            <Button className="" type='search' id="search-button">Search</Button>
        </Container>
    )
}
export default SearchBar;