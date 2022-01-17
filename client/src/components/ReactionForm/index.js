import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_REACTION } from '../../utils/mutations'


export default function ReactionForm({thoughtId}) {
    const [characterCount, setCharacterCount] = useState(0)
    const [reactionBody, setReactionBody] = useState('')
    const [addReaction, {error}] = useMutation(ADD_REACTION)

    function handleChange(e) {
        if (e.target.value.length <= 280) {
            setReactionBody(e.target.value)
            setCharacterCount(e.target.value.length)
        }
    }

    async function handleFormSubmit(e) {
        e.preventDefault()
        await addReaction({variables: {reactionBody, thoughtId}})
        setReactionBody('')
        setCharacterCount(0)
    }
    return (
        <div>
            <p className='m-0'>
                Character Count: {characterCount}
            </p>
            <form 
            className='flex-row justify-center justify-space-between-md align-stretch'
            onSubmit={handleFormSubmit}
            >
                <textarea
                    placeholder='What a reaction...'
                    className='form-input col-12 col-md-9'
                    onChange={handleChange}
                    value={reactionBody}
                ></textarea>

                <button className='btn col-12 col-md-3' type='submit'>
                    Submit
                </button>
                {error && <span className='ml-2'>Something went wrong...</span>}
            </form>
        </div>
    )
}