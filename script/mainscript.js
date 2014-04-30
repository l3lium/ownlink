/* Main script Ownlink Project
 * Autors: OLIVEIRA Stéphane & BURTON Ian
 * Date: 30.4.2014
*/
$(document).ready(function() {
    Ownlink.init();
});

var Ownlink = { 
    init: function() {
        $( ".column" ).sortable({
            connectWith: ".column"
        }).disableSelection();
    }
}; 

