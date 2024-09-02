import { reactive } from 'vue'

// Не придумал куда вставить дженерик, поэтому он здесь в виде хука
export function useForm<T extends object>(initialState: T) {
  const state = reactive({ ...initialState })

  const reset = () => {
    Object.assign(state, initialState)
  }

  return {
    state,
    reset
  }
}
