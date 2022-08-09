import './globalStyles.scss'
import React from "react";


function Wrapper (props: any) {
    return (
        <div className={'container'}>
            <p className={'pageName'}>GitHub Searcher</p>
            {props.children}
        </div>
    )

}

export default Wrapper