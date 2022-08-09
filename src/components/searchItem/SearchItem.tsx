import React from "react";
import './styles.scss'

type SearchItemProps = {
    name: string
    img?: string
    firstRightParam: number
    secondRightParam?: number
    mode: 'repo' | 'user'
}

function SearchItem ({name, img, firstRightParam, secondRightParam, mode}: SearchItemProps) {

    if (mode === 'user') {
        return (
            <div className={'itemContainer'}>
                <div className={'userContainer'}>
                    {img && (
                        <img alt={'User avatar'} src={img}/>
                    )}
                    <p>{name}</p>
                </div>

                <p>Rep: {firstRightParam}</p>
            </div>
        )
    } else {
        return (
            <div className={'itemContainer'}>
                <div className={'userContainer'}>
                    <p>{name}</p>
                </div>
                <div>
                    <p>{firstRightParam} Forks</p>
                    {secondRightParam && (
                        <p>{secondRightParam} Stars</p>
                    )}

                </div>

            </div>
        )
    }

}

export default SearchItem