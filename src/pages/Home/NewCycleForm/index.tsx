import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { useContext } from 'react'

import { CyclesContext } from '..'
import { useFormContext } from 'react-hook-form'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        disabled={!!activeCycle}
        list="taskSuggestions"
        placeholder="Dê um nome para o seu projeto"
        {...register('task')}
      />

      <datalist id="taskSuggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
        <option value="Projeto 4" />
      </datalist>
      <label htmlFor="">durante</label>
      <MinutesAmountInput
        type="number"
        disabled={!!activeCycle}
        id="minutesAmount"
        step={5}
        min={5}
        max={60}
        placeholder="00"
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
