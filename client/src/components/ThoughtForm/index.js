import { useState } from 'react'

export default function ThoughtForm() {
    const [thoughtText, setText] = useState('')
    const [characterCount, setCharacterCount] = useState(0)

    function handleChange(e) {
        if(e.target.value.length <= 280) {
            setText(e.target.value)
            setCharacterCount(e.target.value.length)
        }
    }

    async function handleFormSubmit(e) {
        e.preventDefault()
        setText('')
        setCharacterCount(0)
    }

    return (
        <div>
            <p className={`m-0 ${characterCount === 280 ? 'text-error': ''}`}>
                Character Count: {characterCount}/280
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