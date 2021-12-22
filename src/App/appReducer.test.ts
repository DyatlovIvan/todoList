import {AppReducer, InitialStateType, setError, setStatus} from './appReducer'

let startState:InitialStateType
beforeEach(()=>{
    startState = {
        status:'idle',
        error:null
    }
})
test('correct error message should be set',()=>{
    const endState = AppReducer(startState,setError('some error'))

    expect(endState.error).toBe('some error')

})

test('correct status should be set',()=>{
    const endState = AppReducer(startState,setStatus('loading'))

    expect(endState.status).toBe('loading')

})


