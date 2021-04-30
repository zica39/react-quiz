import React, {useContext, useEffect} from "react";
import QuizData from "../../../../contexts/QuizData";
import  "./Welcome.css";

const Welcome = ({setCurrentTab,setTime}) => {

    const {dispatch} = useContext(QuizData);
    useEffect(()=>{
        dispatch({type: 'shuffle'});
    },[]);

    return <div className="popup-box">
        <div className='popup-text'>
            <h2>Quiz Game</h2>
            <p>Test Your Basic General Knowledge With Quiz!</p>
            <p>10 questions and 4 offered answers!</p>
            <p>Unlimited time!</p>
            <p>How many points can you score in the shortest possible time?</p>
            <button className="button button-close" onClick={()=>{setTime(0);setCurrentTab(1)}}>Start Game!</button>
        </div>
    </div>
}

export default Welcome;