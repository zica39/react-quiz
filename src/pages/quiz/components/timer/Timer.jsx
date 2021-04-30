import {formatTime} from "../../../../functions/tools";


const Timer = ({timer}) =>{

    return  <h4 className="left">Elapsed time: <span>{formatTime(timer)}</span></h4>
}

export default Timer;