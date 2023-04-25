// ==UserScript==
// @name         Stock Level Check for Canada Computers Website Ver 0.2
// @version      0.2
// @description  Stock Level Check for Canada Computers Website
// @author       Yunpeng
// @match        https://www.canadacomputers.com/index.php?cPath=*
// @match      https://www.canadacomputers.com/search/results_details.php?*
// ==/UserScript==

(function () {
    function getStockLevel() {
        // Find All Items Stock Level Elements
        var stockList = document.querySelectorAll("#product-list .stocklevel-pop")
        // Loop Each Item
        stockList.forEach((element, index) => {
            // Create Empty Container
            var container = document.createElement('div')
            container.innerHTML = ''
            var allStoreStockLevel = element.querySelectorAll(".item__avail__num")
            // Filter QC Stock Level (exclude Gatineau and Vanier)
            allStoreStockLevel.forEach(ele => {
                if (ele.className.includes("QC") && !ele.innerHTML.includes("Gatineau") && !ele.innerHTML.includes("Vanier")) {
                    container.innerHTML += ele.innerHTML
                }
            });
            // Shorten Store Name
            container.innerHTML = container.innerHTML.replace(/Marché Central/g, "MC")
            container.innerHTML = container.innerHTML.replace(/West Island/g, "WI")
            container.innerHTML = container.innerHTML.replace(/Montréal Downtown/g, "MTL")

            // Find All Insert Divs
            var insertDivs = document.querySelectorAll(
                "a[data-stocklevel-pop-id]"
            );
            // Change Style add Margin-top
            insertDivs[index].innerHTML = "<div style='margin-top:12px;'></div>"
            // Prevent Infinite Loop Add Text
            if (!insertDivs[index].innerHTML.includes("stocknumber")) {
                insertDivs[index].innerHTML += container.innerHTML
            }
        });
    }

    // When page load or scroll mouse, run target function.
    window.addEventListener("load", getStockLevel);
    window.addEventListener("scroll", getStockLevel);

    // When page send ajax request, run target function
    // (function (open) {
    //     XMLHttpRequest.prototype.open = function () {
    //         this.addEventListener("readystatechange", getStockLevel);
    //         open.apply(this, arguments);
    //     };
    // })(XMLHttpRequest.prototype.open);

})();
