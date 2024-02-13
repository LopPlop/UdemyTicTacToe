const Log = ({ turn }) => {
    return (
            <ol id='log'>
                {turn.map(item => <li key={`${item.square.row}${item.square.col}`}>
                       {item.player} selected {item.square.row}, {item.square.col}     
                    </li>
                )}
            </ol>
    )
}

export default Log 