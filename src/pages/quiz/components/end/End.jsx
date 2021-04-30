import {useState} from "react";
import {formatTime} from "../../../../functions/tools";

const End = ({setCurrentTab,correctAnswers,setCorrectAnswers,timer,overAudio}) => {
const [time] = useState(timer);
     return <div className="popup-results">
         <div className='popup-text'>
             <h3>Game Over!</h3>
             <p>Time: {formatTime(time)}</p>
             <h3>You scored <span className="results-score">{correctAnswers}/10</span>!</h3>
             <button  onClick={()=>{overAudio.pause();setCorrectAnswers(0);setCurrentTab(0)}} className="button button-close">Play Again?</button>
         </div>
     </div>;
}

export default End;