import cl from './CounterBlock.module.scss'

/* ------------- Types ------------- */
interface CounterBlockProps {
  counterName: string
  amount: number
  callBack?: () => void
}

/* ------------- Component ------------- */
const CounterBlock: React.FC<CounterBlockProps> = ({ counterName, amount, callBack }) => {
  return (
    <div onClick={callBack} className={cl.counterBlock}>
      <div className={cl.counter}>{amount}</div>
      <div className={cl.counterName}>{counterName}</div>
    </div>
  )
}

export default CounterBlock