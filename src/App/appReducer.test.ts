import {AppReducer, InitialStateType, RequestStatusType, setError, setStatus} from './appReducer'

let startState:InitialStateType
beforeEach(()=>{
    startState = {
        status: RequestStatusType.Idle,
        error: null,
        isInitialized: false
    }
})
test('correct error message should be set',()=>{
    const endState = AppReducer(startState,setError({error:'some error'}))

    expect(endState.error).toBe('some error')

})

test('correct status should be set',()=>{
    const endState = AppReducer(startState,setStatus({status:RequestStatusType.Loading}))

    expect(endState.status).toBe('loading')

})


