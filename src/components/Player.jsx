import { useState } from 'react'


const Player  = ({ initialName, symbol, isActive, onPlayerChangeName}) => {

    const [isChanging, setIsChanging] = useState(false);
    const onClickHandle = () => {
        if(isChanging)
            initialName = playerName
        setIsChanging((item) => !item)
        if(isChanging){
            onPlayerChangeName(symbol, playerName)
        }
    }

    const [playerName, setPlayerName] = useState(initialName);
    const onHandleChange = (event) =>{
        setPlayerName(event.target.value)
    }

    let playerNameContent = <span className="players-name">{playerName}</span>


    if(isChanging){
        playerNameContent = <input type="text" required defaultValue={playerName} onChange={onHandleChange}/>;
    }


    return (
        <li className={isActive ? 'active' : undefined}>
                <span className="player">
                {playerNameContent}
                <span className="players-symbol">{symbol}</span>
              </span>
              <button onClick={onClickHandle}>{isChanging ? 'Save' : 'Edit'}</button>
        </li>
    )
}

export default Player;