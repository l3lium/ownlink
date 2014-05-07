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
            $(".column").css("background-color","#99ff99");
            $(".column").click(function() {Ownlink.ajout($(this))});
        });
        $( ".column" ).sortable({
            connectWith: ".column",
            placeholder: "ui-state-highlight"
        }).disableSelection();
        

    },
    
    ajout: function($column) {            
        $column.append("<div class='item'></div>");
        $(".column").css("background-color","#ffffff");
        $column = NULL;
        
    }
}; 

