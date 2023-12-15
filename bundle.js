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
            // console.log(ele)
            var bundleLink = `<a href="https://www.canadacomputers.com/product_info.php?cPath=&item_id=${ele.dataset.bundlepid}" class="btn btn-primary cart bundlebtn">Bundle Link</a>`
            console.log(ele)
            ele.outerHTML += bundleLink
            console.log(ele.outerHTML)

        })
    }

    // window.addEventListener("load", getBundleList);
    setTimeout(() => {
        getBundleList()
    }, 2000);
    // window.addEventListener("scroll", getBundleList);

})();
