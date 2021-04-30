import React, {useState, useReducer} from 'react';
import Welcome from "./components/welcome/Welcome";
import End from "./components/end/End";
import Question from "./components/question/Question"
import "./Quiz.css";
import questions from "../../constants/questions";
import QuizData from "../../contexts/QuizData";
import {shuffle} from "../../functions/tools"
import over from "../../audio/over.mp3";

const Quiz = () => {

    const changeQuestions = (state, action) => {
        switch(action.type){
            case 'shuffle':
                return shuffle(state);
            default:
                return ;
        }
    }

 const [currentTab, setCurrentTab] = useState(0) // [0,1,2]
 const [questionsList, dispatch] = useReducer(changeQuestions, questions);

 const[correctAnswer,setCorrectAnswer] = useState(0);
 const [timer, setTimer] = useState(0);

 const [overAudio] = useState(new Audio(over));

 return<QuizData.Provider value={{
     list: questionsList,
     dispatch: (e) => dispatch(e)}
    }>

    <div className="overlay-fade">
   <div>

    {
     currentTab === 0 ?
         <Welcome setTime={setTimer} setCurrentTab={setCurrentTab}/>
         :
         currentTab === 1?
             <Question overAudio={overAudio} timer={[timer,setTimer]} correctAnswer={correctAnswer} setCorrectAnswer={setCorrectAnswer} setCurrentTab={setCurrentTab}/>:
             <End overAudio={overAudio} timer={timer} correctAnswer={correctAnswer} setCorrectAnswer={setCorrectAnswer} setCurrentTab={setCurrentTab}/>
    }
   </div>
  </div>
     </QuizData.Provider>
}

export default Quiz;