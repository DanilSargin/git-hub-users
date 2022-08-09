import React, {ChangeEventHandler} from "react";
import './styles.scss'

type SearchInputProps = {
    value: string | number | readonly string[] | undefined
    onValueChange: ChangeEventHandler<HTMLInputElement>
    placeholder: string
}

function SearchInput ({value, onValueChange, placeholder}: SearchInputProps) {
    return (
        <div className={'searchBlock'}>
            <input className={'textInput'} placeholder={placeholder} value={value} type={'text'} onChange={onValueChange} />
        </div>
    )
}

export default SearchInput