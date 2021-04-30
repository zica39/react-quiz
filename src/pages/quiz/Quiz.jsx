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

    //Shuffle action - mix questions before the quiz starts
    const changeQuestions = (state, action) => {
        switch(action.type){
            case 'shuffle':
                return shuffle(state);
            default:
                return ;
        }
    }

    //0-welcome tab, 1-questions , 2-show result
 const [currentTab, setCurrentTab] = useState(0) // [0,1,2]
 const [questionsList, dispatch] = useReducer(changeQuestions, questions);

 const[correctAnswers,setCorrectAnswers] = useState(0);
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
             <Question overAudio={overAudio} timer={[timer,setTimer]} correctAnswers={correctAnswers} setCorrectAnswers={setCorrectAnswers} setCurrentTab={setCurrentTab}/>:
             <End overAudio={overAudio} timer={timer} correctAnswers={correctAnswers} setCorrectAnswers={setCorrectAnswers} setCurrentTab={setCurrentTab}/>
    }
   </div>
  </div>
     </QuizData.Provider>
}

export default Quiz;