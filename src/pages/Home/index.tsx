import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { NewCycleForm } from './NewCycleForm'
import { Countdown } from './Countdown'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { CyclesContext } from '../../contexts/CyclesContext'

const newCycleFormSchemaValidation = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60),
})

//define automaticacmente a tipagem do formulário
type NewCycleFormData = zod.infer<typeof newCycleFormSchemaValidation>

export function Home() {
const { activeCycle, handleCreateNewCycle, handleInterruptCycle } = useContext(CyclesContext)

  // register => recebe o nome do input, e retorna os métodos que usamos para trabalhar com fomulários
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchemaValidation),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle2(data: NewCycleFormData) {
 handleCreateNewCycle(data)
 reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  // controlled => armazena o valor em tempo real dos inputs (valores digitados), formulário, etc
  // pode ser um problema de desempenho

  // uncontrolled => somente busca a informação quando precisar dela

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle2)}>
        {/* Passa o contexto para os componentes que precisam das variáveis dele */}
        <FormProvider {...newCycleForm}>
          {' '}
          {/* Repassa cada uma das props que tem dentro dele */}
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountDownButton onClick={handleInterruptCycle} type="button">
            <HandPalm />
            Pausar
          </StopCountDownButton>
        ) : (
          <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
            <Play />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
