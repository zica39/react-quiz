import {useContext,useState,useEffect,useRef} from "react";
import QuizData from "../../../../contexts/QuizData";
import {shuffle,formatTime} from "../../../../functions/tools";
import './Question.css';

import correct from "../../../../audio/correct.mp3";
import wrong from "../../../../audio/incorrect.mp3";
import bg from "../../../../audio/background.mp3";


const Question = ({setCurrentTab,setCorrectAnswer,correctAnswer,timer,overAudio}) => {
    const divElement = useRef(null);
    const [wrongAnswers,setWrongAnswers] = useState(0);
    const[questionNumber,setQuestionNumber] = useState(1);
    const[shuffleArray] = useState(shuffle([1,2,3,4]))

    const [correctSound] = useState(new Audio(correct));
    const [wrongSound] = useState(new Audio(wrong));
    const [bgAudio] = useState(new Audio(bg));


    useEffect(() => {
        const t = setTimeout(() => {
            timer[1](prev=>prev+1)
        }, 1000);
        return ()=>{clearTimeout(t);}
    },[timer]);


    const[currentQuestion,setCurrentQuestion] = useState(Math.floor(Math.random() * 10) + 1);
    const {list} = useContext(QuizData);

    useEffect(()=>{
        correctSound.volume=0.4;
        wrongSound.volume = 0.5;
        correctSound.volume = 0.5;
    },[]);

    const nextQuestion = () =>{
        setQuestionNumber(prev=>prev+1);
        divElement.current.style.pointerEvents = '';
        divElement.current.querySelectorAll('button').forEach(el=>el.className='answer');
        correctSound.pause();
        wrongSound.pause();
        bgAudio.play().then();
    }

    useEffect(()=>{
        if(questionNumber === 1) bgAudio.play().then();

        if(questionNumber > 1 && questionNumber<20){
            setCurrentQuestion(prevState=>prevState+1);
        }
        if(questionNumber === 11){
            bgAudio.pause();
            setCurrentTab(2);
            overAudio.currentTime = 0;
            overAudio.play().then();
        }
    },[questionNumber]);

    return <div  ref={divElement} className="container">
        <div className="feedback">
            <h4 className="left">Time Left: <span>{formatTime(timer[0])}</span></h4>
            <div className="right" style={{display:'flex',justifyContent:'space-around'}} ><h4>Score:  ✔️{correctAnswer} ❌  {wrongAnswers}</h4>
                <button style={{float:'right',width:80,height:40,padding:0,fontSize:'1em'}} onClick={()=>{bgAudio.pause();setCorrectAnswer(0);setCurrentTab(0)}}>Quit</button>
            </div>
        </div>
        <h3>{questionNumber}.) {list[currentQuestion].question}</h3>
        <div className="grid">
            {shuffleArray.map(item =>
                <button id={'button'+item} className='answer' onClick={(e)=> {
                    if(item === list[currentQuestion].correct){
                        e.target.className = 'correct blink_me';
                        correctSound.currentTime = .5;
                        correctSound.play().then();
                        bgAudio.pause();
                        setCorrectAnswer(prevState=>prevState+1);
                        divElement.current.style.pointerEvents = 'none';
                        setTimeout(nextQuestion,1000)
                    }else{
                        e.target.className = 'wrong blink_me';
                        wrongSound.currentTime = 0.8;
                        wrongSound.play().then();
                        bgAudio.pause();
                        divElement.current.querySelector('#button'+list[currentQuestion].correct).className='correct';
                        setWrongAnswers(prevState=>prevState+1);
                        divElement.current.style.pointerEvents = 'none';
                        setTimeout(nextQuestion,1000);

                    }
                } } key={item}>
                    {list[currentQuestion][item]}
                </button>)}
        </div>
    </div>;
}

export default Question;