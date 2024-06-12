import { createContext, useState } from 'react'

interface Cycle {
  id: number
  task: string
  minutesAmount: string
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
}

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void //melhor criar uma função, do que usar o "setAlgumaCoisa"
  amountSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
  handleCreateNewCycle: (data: CreateCycleData) => void
  handleInterruptCycle: () => void
}

//precisa exportar para que os componentes possam usar
export const CyclesContext = createContext({} as CyclesContextType) //cria o contexto

export function CyclesContextProvider() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId)

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((c) => {
        if (c.id == activeCycleId) {
          return { ...c, finishedDate: new Date() }
        } else {
          return c
        }
      }),
    )
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function handleCreateNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    //volta os campos para o valor original, do "defaultValues", linha 27.
    reset()
  }

  function handleInterruptCycle() {
    setActiveCycleId(null)
    setCycles((state) =>
      state.map((c) => {
        if (c.id == activeCycleId) {
          return { ...c, interruptedDate: new Date() }
        } else {
          return c
        }
      }),
    )
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        handleCreateNewCycle,
        handleInterruptCycle
      }}
    ></CyclesContext.Provider>
  )
}
