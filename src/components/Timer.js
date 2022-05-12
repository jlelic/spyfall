import clsx from 'clsx'

export default function Timer(props) {
    const { timeLeft, reveal, totalTime } = props
    const formatSeconds = (x) => {
        if (x < 0) {
            x = 0
        }
        if (x === 60) {
            const audio = new Audio('/sfx/warn60.wav')
            audio.play()
        } else if (x === 10) {
            const audio = new Audio('/sfx/warn10.wav')
            audio.play()
        }
        let sec_num = parseInt(x.toString(), 10) // don't forget the second param
        let hours = Math.floor(sec_num / 3600)
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60)
        let seconds = sec_num - (hours * 3600) - (minutes * 60)

        if (hours < 10) {
            hours = "0" + hours
        }
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        if (seconds < 10) {
            seconds = "0" + seconds
        }
        return hours + ':' + minutes + ':' + seconds
    }


    return <div className="timerWrapper">
        <div
            className={clsx(
                'progressBar',
                timeLeft <= 30 && 'barLow',
                timeLeft < 30 && timeLeft > 0 && 'barFlashing',
                timeLeft % 2 === 0 && 'barPhaseOut'
            )}
            style={{ width: `${Math.min(1 - timeLeft / 60 / totalTime, 1) * 100}%` }}/>
        <span className="timer">
            <div className="timerText">{formatSeconds(timeLeft)}</div>
            <div className="button" onClick={reveal}>Reveal</div>
        </span>
    </div>

}
