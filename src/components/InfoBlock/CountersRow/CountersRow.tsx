import { useNavigate } from "react-router-dom"
import CounterBlock from "../CounterBlock/CounterBlock"
import Divider from "../Divider/Divider"
import cl from './CountersRow.module.scss'

/* ------------- Types ------------- */
interface CountersRowProps {
  friendsAmount: number
}

/* ------------- Component ------------- */
const CountersRow: React.FC<CountersRowProps> = ({ friendsAmount }) => {
  const navigate = useNavigate()

  return (
    <>
      <Divider/>
      <div className={cl.countersRow}>
        <CounterBlock counterName={'friends'} amount={friendsAmount} callBack={() => navigate('/people/friends')} />
        <CounterBlock counterName={'followers'} amount={1} />
        <CounterBlock counterName={'gifts'} amount={2} />
        <CounterBlock counterName={'tracks'} amount={3} />
      </div>
    </>
  )
}

export default CountersRow