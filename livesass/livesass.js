const selectors = [];

/**
 * Add new selector to selectors array
 * @param {string} selector: the new selector
**/
function addSelector(selector) {
    selectors.push(selector);
}

/**
 * Set up an interval that find the corresponding component by selector
 * When we found a component, call removeStyle function to remove its style from
 * in head
 * When all components' style have been removed, remove the interval
**/
function livesass() {
    if (selectors.length > 0) {
        var interval = setInterval(function () {
            compToRemoves = [];
            for (const selector of selectors) {
                var component = document.querySelector(selector);
                if (component !== null) {
                    compToRemoves.push({
                        component,
                        selector
                    });
                }
            }
            for (const comp of compToRemoves) {
                removeStyle(comp.component);
                selectors.splice(selectors.indexOf(comp.selector), 1);
            }
            if (selectors.length === 0) {
                clearInterval(interval);
            }
        }, 1000);
    }
}

/**
 * Find the encapsulation attribute of the input component
 * Find the styles that use this attribute and remove them from head tag
 * @param {object} component
**/
function removeStyle(component) {
    var encapsulationAttr = component.getAttributeNames().find(function (attr) {
        return attr.indexOf("_nghost") === 0;
    });
    var match = encapsulationAttr.match(/_nghost-(.*)/i);
    if (match) {
        var id = match[1];
        for (let stl of document.getElementsByTagName('style')) {
            if (stl.firstChild !== null && stl.firstChild.data.indexOf('_ngcontent-' + id) >= 0) {
                stl.parentNode.removeChild(stl);
            }
        }
    }
}
