/* This code is made by Anneshu Nag, Student ID- 2210994760  */
/*                    Dated- 01/10/2023                      */

import React from "react";
import { useState } from "react";
import QuestionList from "./QuestionList";
import './QuestionPage.css'

const SearchQuestion = () => {
    // State variable to store the search term entered by the user.
    const [searchTerm, setSearch] = useState('');

    // Event handler function to update the search term when the input changes.
    const handleChange = (event) => {
        setSearch(event.target.value);
    }

    return (
        <div>
            <div className="qPage">
                <h1>--- Questions Page ---</h1>
            </div>
            <div className="qSearcher">
                <form>
                    {/* Input field for entering the search term. */}
                    <input
                        className='searchText'
                        name="search"
                        id="search"
                        onChange={handleChange} // Attach the event handler to input changes.
                        value={searchTerm} // Bind the input value to the state.
                        placeholder="Filter Question by Title/Tags/Date">
                    </input>
                </form>
            </div>
            {/* Render the QuestionList component and pass the search term as a prop. */}
            <QuestionList
                searchQuestion={searchTerm}
            />
        </div>
    )
}

export default SearchQuestion;
