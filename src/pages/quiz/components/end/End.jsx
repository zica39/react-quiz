import {useState} from "react";
import {formatTime} from "../../../../functions/tools";

const End = ({setCurrentTab,correctAnswer,setCorrectAnswer,timer,overAudio}) => {
const [time] = useState(timer);
     return <div className="popup-results">
         <div className='popup-text'>
             <h3>Game Over!</h3>
             <p>Time: {formatTime(time)}</p>
             <h3>You scored <span className="results-score">{correctAnswer}/10</span>!</h3>
             <button  onClick={()=>{overAudio.pause();setCorrectAnswer(0);setCurrentTab(0)}} className="button button-close">Play Again?</button>
         </div>
     </div>;
}

export default End;