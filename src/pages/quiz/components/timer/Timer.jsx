import {formatTime} from "../../../../functions/tools";


const Timer = ({timer}) =>{

    return  <h4 className="left">Time Left: <span>{formatTime(timer)}</span></h4>
}

export default Timer;