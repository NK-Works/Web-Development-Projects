/* This code is made by Anneshu Nag, Student ID- 2210994760  */
/*                    Dated- 26/08/2023                      */

// Import the CSS styles for this component
import './SingleCard.css';

// Define a functional component called SingleCard
function SingleCard(props) {
  // Return JSX elements that make up the SingleCard component
  return (
    <div className="myCards">
      <img src={props.image} alt='Staff' />
      <br />
      <h3> {props.name} </h3>

      <div>
        <p>{props.description}</p>
      </div>

      <h3>-------------------------</h3>

      {/* Create a container for the rating information */}
      <div>
        {/* Display a star image */}
        <img
          width="20px"
          src={require('./images/star.png')} alt="ratingStar"
        />

        <label style={{ paddingLeft: "10px" }}>{props.ratings}</label>

        <label style={{ paddingLeft: "10px", fontWeight: "bold" }}>
          -{props.first_name} {props.last_name}
        </label>
      </div>
    </div>
  )
}

// Export the SingleCard component as the default export
export default SingleCard;
