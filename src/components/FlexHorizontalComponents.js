import React from 'react'
import "../css/FlexHorizontalComponents.css"
export default function FlexHorizontalComponents(divs) {
    return (
        <div class="FlexHorizontal">
            { divs.divs.map(item =>
                <div dangerouslySetInnerHTML={{ __html: item }} />
            )}

        </div>
    )
}
