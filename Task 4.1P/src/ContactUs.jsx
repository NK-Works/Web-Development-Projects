/* This code is made by Anneshu Nag, Student ID- 2210994760  */
/*                    Dated- 26/08/2023                      */

// Import the CSS styles for this component
import "./ContactUs.css";

// Define a functional component called ContactUs
const ContactUs = () => {
  // Return JSX elements that make up the ContactUs component
  return (
    <div className="BlueArea">
      {/* Main section with horizontal cards */}
      <div className="HorizontalCards MainDivisions">
        {/* Division with header and list */}
        <div className="MainHeaders">
          <h1>Explore</h1>
          <ul className="ListItems">
            {/* List items with anchor tags */}
            <a>Home</a>
            <a>Questions</a>
            <a>Articles</a>
            <a>Tutorials</a>
          </ul>
        </div>
        {/* Division with header and list */}
        <div className="MainHeaders">
          <h1>Support</h1>
          <ul className="ListItems">
            {/* List items with anchor tags */}
            <a>FAQs</a>
            <a>Help</a>
            <a>Contact Us</a>
          </ul>
        </div>
        {/* Division with header and list */}
        <div className="MainHeaders">
          <h1>Stay Connected</h1>
          <ul className="HorizontalCards">
            {/* List items with anchor tags and images */}
            <a href="https://www.facebook.com/">
              <img width="50px" src={"./Facebook_icon.png"} alt="facebook"/>
            </a>
            <a href="https://www.instagram.com/">
              <img width="50px" src={"./Instagram_icon.png"} alt="insta"/>
            </a>
            <a href="https://twitter.com/">
              <img width="50px" src={"./Twitter_icon.png"} alt="x"/>
            </a>
          </ul>
        </div>
      </div>

      {/* Lower section with header and list */}
      <div className="LowerArea">
        <h1> <a href="#top">DEV@Deakin 2023</a></h1>
        <ul className="HorizontalCards LowerDivisions">
          {/* List items with anchor tags */}
          <a>Privacy Policy</a>
          <a>Terms</a>
          <a>Code of Conduct</a>
        </ul>
      </div>
    </div>
  );
};

// Export the ContactUs component as the default export
export default ContactUs;
