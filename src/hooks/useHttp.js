import React from 'react'

const defaultValue = {
    data: null,
    status: null,
    error: null
}

const httpReducer = (state, action) => {

    if (action.type === 'SEND') {
        return {
            data: null,
            status: 'loading',
            error: null
        }
    }

    if (action.type === 'SUCCESS') {
        return {
            data: action.responseData,
            status: 'completed',
            error: null
        }
    }

    if (action.type === 'ERROR') {
        return {
            data: null,
            status: 'completed',
            error: action.errorMessage
        }
    }

    return state
}


const useHttp = (requestFunction) => {

    const [httpState, dispatch] = React.useReducer(httpReducer, defaultValue)


    const sendRequest = React.useCallback(async (requestData) => {

        dispatch({
            type: 'SEND'
        })

        try {
            const responseData = await requestFunction(requestData)
            dispatch({
                type: 'SUCCESS',
                responseData
            })
        }
        catch (error) {
            dispatch({
                type: 'ERROR',
                errorMessage: error.message || "Something went wrong!"
            })
        }

    }, [requestFunction])


    return {
        sendRequest,
        ...httpState
    }
}

export default useHttp