/* This code is made by Anneshu Nag, Student ID- 2210994760  */
/*                    Dated- 26/08/2023                      */

// Import the necessary dependencies
import { useState } from "react";
import "./EmailBar.css"; // Import the CSS styles for this component
import axios from "axios"; // Import axios for making HTTP requests

// Define a functional component called EmailBar
const EmailBar = () => {
    // Initialize state variables for showing text and storing email
    const [showText, setShowText] = useState(true);
    const [email, setEmail] = useState("");

    // Define a function to handle the form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to the "/api/email" endpoint with the email data
            await axios.post("/api/email", { email });

            // Hide the text and reset after a timeout
            setShowText(false);

            setTimeout(() => {
                setShowText(true);
                setEmail("");
            }, 5000);

        } catch (error) {
            console.error("Error sending email:", error);
        }
    };

    // Return JSX elements that make up the EmailBar component
    return (
        <div id="myForm">
            {/* Display different text based on 'showText' state */}
            <p>
                {showText ? "SIGN UP FOR OUR DAILY INSIDER:"
                    : "Thank you for signing up"}
            </p>

            {/* An iframe with class 'hidden' used as a target */}
            <iframe title='Sign Up' name="EmptyFrame" className="hidden" />

            {/* Form element for submitting email */}
            <form
                id="EmailForm"
                action="/subscribe"
                target="EmptyFrame"
                method="POST"
                onSubmit={handleFormSubmit}
                className={showText ? null : "hidden"} // Apply 'hidden' class when showText is false
            >
                {/* Input field for entering email */}
                <input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Submit button */}
                <button name="submit" type="submit">
                    Subscribe
                </button>
            </form>
        </div>
    );
};

// Export the EmailBar component as the default export
export default EmailBar;