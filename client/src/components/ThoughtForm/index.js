import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ADD_THOUGHT } from '../../utils/mutations'
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries'

export default function ThoughtForm() {
    const [thoughtText, setText] = useState('')
    const [characterCount, setCharacterCount] = useState(0)

    const [addThought, {error}] = useMutation(ADD_THOUGHT, {
        update(cache, { data: { addThought }}) {
            try {
                const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS, variables: {} })

                cache.writeQuery({
                    query: QUERY_THOUGHTS,
                    data: { thoughts: [addThought, ...thoughts ]}
                })
            } catch (e) {
                console.error(e)
            }
            const { me } = cache.readQuery({ query: QUERY_ME })
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, thoughts: [...me.thoughts, addThought] }}
            })
        }
    })

    function handleChange(e) {
        if(e.target.value.length <= 280) {
            setText(e.target.value)
            setCharacterCount(e.target.value.length)
        }
    }

    async function handleFormSubmit(e) {
        e.preventDefault()
        try {
            await addThought({
                variables: { thoughtText }
            })
            setText('')
            setCharacterCount(0)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <p className={`m-0 ${characterCount === 280 ? 'text-error': ''}`}>
                Character Count: {characterCount}/280
                {error && <span className='ml-2' style={{display: 'block'}}>Something went wrong...</span>}
            </p>
            <form 
                className='flex-row justify-center justify-space-between-md align-stretch'
                onSubmit={handleFormSubmit}
            >
                <textarea 
                    placeholder="here's a new thought..."
                    value={thoughtText}
                    className='form-input col-12 col-md-9'
                    onChange={handleChange}
                    ></textarea>
                    <button className='btn col-12 col-md-3' type='sumbmit'>
                        Submit
                    </button>
            </form>
        </div>
    )
}