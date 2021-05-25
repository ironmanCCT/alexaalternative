import React from 'react'
import "../css/FlexHorizontalComponents.css"
export default function AmazonAdvertisementCustom(divs) {
    return (
        <div className="FlexHorizontal">
            { divs.divs.map((item, index) =>
                <div key={index} dangerouslySetInnerHTML={{ __html: item }} />
            )}

        </div>
    )
}
