/* Main script Ownlink Project
 * Autors: OLIVEIRA Stéphane & BURTON Ian
 * Date: 30.4.2014
*/
$(document).ready(function() {
    Ownlink.init();
    
});

var Ownlink = { 
    init: function() {
        $("#add").click(function(){
            Ownlink.ajout()
            });
        $( ".column" ).sortable({
            connectWith: ".column",
            placeholder: "ui-state-highlight"
        }).disableSelection();
        

    },
    
    ajout: function() {
        $("#divLeft").append("<div class='item'></div>");  
    }
}; 

