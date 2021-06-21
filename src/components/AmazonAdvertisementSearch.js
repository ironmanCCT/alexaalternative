import React from 'react'

export default function AmazonAdvertisementSearch() {
  
  
  <script type="text/javascript">
amzn_assoc_placement = "adunit0";
amzn_assoc_search_bar = "true";
amzn_assoc_tracking_id = "amazonmaxist-20";
amzn_assoc_search_bar_position = "bottom";
amzn_assoc_ad_mode = "search";
amzn_assoc_ad_type = "smart";
amzn_assoc_marketplace = "amazon";
amzn_assoc_region = "US";
amzn_assoc_title = "Shop Related Products";
amzn_assoc_default_search_phrase = "Apple Watch";
amzn_assoc_default_category = "All";
amzn_assoc_linkid = "48e96f19fb1312016ce549db65c65f49";
</script>
<script src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US"></script>
 var loadScript = function (src) {

    var tag = document.createElement('script');
    tag.async = false;
    tag.src = src;
    // tag.defer = true;
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(tag);
}

useEffect(() => {
    loadScript('//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=f1660539-dbf6-4794-9a93-ff5c90518b38');
}, [])

return (

    <div>
        <center>
            <div id="amzn-assoc-ad-f1660539-dbf6-4794-9a93-ff5c90518b38"></div>
        </center>
    </div>


)
}