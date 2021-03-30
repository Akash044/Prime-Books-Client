import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Books from '../Books/Books'
import fakedata from '../../Data/fakedata.json'

const Home = () => {
    const [booksData, setBooksData] = useState([]);
    useEffect(() =>{
        // fetch('http://books.cloudfoundry.com/data/books')
        // .then(res => res.json())
        // .then(data =>{ 
        //     console.log(data);
        //     setBooks(data);
        // })
        setBooksData(fakedata);

    },[])
    return (
        <div>
            <div className="justify-content-center container row m-5">
            {
                booksData.map(book => <Books key={book.ISBN} details={book}></Books>)
            }
            </div>
            
            
        </div>
    );
};

export default Home;