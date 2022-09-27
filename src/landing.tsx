import { Link } from "react-router-dom"
import "./styles/landing.css"
export default function Landing() {
   return (
      <body>
         <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, viewport-fit=cover" />
         <link rel="preload" href={`${process.env.PUBLIC_URL}/images/bot-thinking.png`} as="image" type="image/png" />
         <a href="https://github.com/novoda/engineering-meeting">
            <img className="logo" src={`${process.env.PUBLIC_URL}/images/novoda.png`} alt="Novoda" />
         </a>
         <div className="welcome">
            <img className="meeting-logo" src={`${process.env.PUBLIC_URL}/images/structure.png`} alt="Engineering Meeting" />
            <button className="generate">
               <Link className="navigateTo" to="/randomiser">
                  <b>Generate Meeting</b>
               </Link>
            </button>
         </div>
      </body>
   )
}
