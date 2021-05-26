import React from 'react'
import "../css/FlexHorizontalComponents.css"
export default function AmazonAdvertisementCustom(divs) {
    return (
        <div className="flex-direction-horizontal flex-justify-content-center">
            { divs.divs.map((item, index) =>
                <div key={index} dangerouslySetInnerHTML={{ __html: item }} />
            )}

        </div>
    )
}
