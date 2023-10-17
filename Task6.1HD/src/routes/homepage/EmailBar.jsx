import { useState } from "react";
import "./EmailBar.css";
import axios from "axios"; // Import axios for making HTTP requests

const EmailBar = () => {
  const [showText, setShowText] = useState(true);
  const [email, setEmail] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

/* Code used for testing how the Email sending mechanism works */
/*            Given in the practical sheet in class            */
/* Works fine too simply remove/comment the axios lib functions*/
/*              And uncomment this part then run               */

//     try {
//       const response = await fetch("http://localhost:3007/api/email", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       });

//       if (response.ok) {
//         setShowText(false);
//         setTimeout(() => {
//           setShowText(true);
//           setEmail("");
//         }, 5000);
//       } else {
//         console.error("Error sending email");
//       }
//     } catch (error) {
//       console.error("Error sending email:", error);
//     }
//   };

/*          Done after reaseaching about the axios library from YouTube          */
        try {
            // Make a POST request to the "/api/email" endpoint with the email data
            await axios.post("http://localhost:3007/api/email", { email });

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

  return (
    <div id="myForm">
      <p>
        {showText
          ? "SIGN UP FOR OUR DAILY INSIDER:"
          : "Thank you for signing up"}
      </p>
      <iframe title="Sign Up" name="EmptyFrame" className="hidden" />
      <form
        id="EmailForm"
        action="/subscribe"
        target="EmptyFrame"
        method="POST"
        onSubmit={handleFormSubmit}
        className={showText ? null : "hidden"}
      >
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button name="submit" type="submit">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default EmailBar;
