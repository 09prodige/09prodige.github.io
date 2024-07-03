var WEB_APP = "php/potato.php";   // URL of web app to contact
var nouveau = false;


document.observe("dom:loaded", function() {
    // set up listeners on all checkboxes
    var checkboxes = $$("#controls input");
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
        checkboxes[i].observe("change", toggleAccessory);
    }

    // reload saved initial state from web server ...
    new Ajax.Request(WEB_APP, {
        method: "get",
        onSuccess: ajaxGotState,
        onFailure: ajaxFailure,
        onException: ajaxFailure
    });
});

// called when state data arrives from Ajax request;
// sets up the appropriate checkbox / image state
function ajaxGotState(ajax) {
    var checkboxes = $$("#controls input");
    var reponse = ajax.responseText; //recupere reponse php
    $("status").innerHTML = reponse;

    var accessoires = getAccessoriesArray(reponse);

    checkboxes.forEach(elementos => {
        accessoires.forEach(element => {
            if(elementos.id == element && elementos.checked == false){
                elementos.checked = true;
                Effect.Appear(element+"_image");
            }
        });
    });
}

// called when any checkbox is checked/unchecked;
// toggles that accessory and sends the changes to the server
function toggleAccessory() {
    nouveau = true;
    var checkboxes = $$("#controls input");
    // make the accessory appear / disappear ...
    checkboxes.forEach(element => {
        if(element.checked){
            Effect.Appear(element.id+"_image");
        }
        else{
            Effect.Fade(element.id+"_image");
        }
    });
    
    
    // save the state to the server using Ajax ...
    acc = getAccessoriesString();
    
    new Ajax.Request("php/potato.php",
        {
            method : "post",
            
            parameters: { accessoires : acc,
                          nouv : nouveau,
            
                                    },
            onSuccess: ajaxGotState,
            onFailure: ajaxFailure,
            onException: ajaxFailure
        } 
        );
    
}

// converts a string of accessories such as "eyes ears moustache" into an array
// of strings such as ["eyes", "ears", "moustache"] and returns the array
function getAccessoriesArray(accessoriesString) {
    return accessoriesString.strip().split(" ");
}

// returns a string of all accessories that are currently selected on 
// mr. potato head, such as "eyes ears moustache"
function getAccessoriesString() {
    var accessories = [];
    var checkboxes = $$("#controls input");
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            accessories.push(checkboxes[i].id);
        }
    }
    return accessories.join(" ");
}

// standard provided Ajax error-handling function
function ajaxFailure(ajax, exception) {
    alert("Error making Ajax request:" + 
          "\n\nServer status:\n" + ajax.status + " " + ajax.statusText + 
          "\n\nServer response text:\n" + ajax.responseText);
    if (exception) {
        throw exception;
    }
}
