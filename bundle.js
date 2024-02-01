// ==UserScript==
// @name         Show Bundle Link
// @namespace    http://tampermonkey.net/
// @version      2023-12-14
// @description  Show Bundle Link
// @author       Yunpeng
// @match        https://www.canadacomputers.com/product_info.php?cPath=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=canadacomputers.com
// @grant        none
// ==/UserScript==

(function() {
    function getBundleList(){
        var bundleList = document.querySelectorAll(".bundlebtn")
        // console.log(bundleList)
        bundleList.forEach(ele => {
            if (ele.dataset.bundlepid){
                var bundleLink = `<a href="https://www.canadacomputers.com/product_info.php?cPath=&item_id=${ele.dataset.bundlepid}" class="btn btn-primary cart bundlebtn">Bundle Link</a>`
            } else {
                var bundleLink = `<a href="javascript:;" class="btn btn-primary cart bundlebtn">Auto Dedect Bundle</a>`
            }
            ele.outerHTML += bundleLink
        })
    }

    function getCoupon(){
        var couponEle = document.querySelector("#coupondata")
        var couponCode = `<div style="margin-top:12px; margin-bottom:12px; padding:4px; font-size:18px; font-weight:600; border:2px solid red;">Coupon Code: ${couponEle.dataset.coupcode}</div>`
        couponEle.outerHTML = couponCode;
    }

    // window.addEventListener("load", getBundleList);
    setTimeout(() => {
        getBundleList()
        getCoupon()
    }, 2000);
    // window.addEventListener("scroll", getBundleList);

})();
