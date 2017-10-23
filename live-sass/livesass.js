function livesass() {
    if (typeof(selector) !== 'undefined') {
        var interval = setInterval(function () {
            var component = document.querySelector(selector);
            if (component !== null) {
                removeStyle(component);
                clearInterval(interval);
            }
        }, 1000);
    }
}

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

livesass();
