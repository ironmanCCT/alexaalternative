import React, { useEffect } from 'react'
import '../css/AmazonAdvertisement.css'

export default function AmazonAdvertisement() {
    var loadScript = function (src) {
        var tag = document.createElement('script');
        tag.async = false;
        tag.src = src;
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(tag);
    }

    useEffect(() => {
        loadScript('//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=f1660539-dbf6-4794-9a93-ff5c90518b38');
    }, [])


    return (
        <div className="amazon-advertisement">
            <div id="amzn-assoc-ad-f1660539-dbf6-4794-9a93-ff5c90518b38"></div>
        </div>
    )
}
