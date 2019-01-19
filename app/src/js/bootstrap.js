// jQuery
try {
    window.jQuery = window.$ = require('jquery');
}
catch(e){}


//UIKit
try {
    const UIKit = require("uikit");
    const Icons = require("uikit/dist/js/uikit-icons");

    UIKit.use(Icons);

    window.UIKit = UIKit;
}
catch(e) {}