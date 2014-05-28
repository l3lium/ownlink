/* Main script Ownlink Project
 * Autors: OLIVEIRA Stéphane & BURTON Ian
 * Date: 30.4.2014
 */
$(document).ready(function() {
    Ownlink.init();
});
var Ownlink = {
    NewBlockCounter: 0,
    IsLocked: true,
    modification: false,
    init: function() {
        var localThis = this;
        $("#add").click(function(){
            localThis.NewBlockCounter++;
            $("#add").text(localThis.NewBlockCounter);
            $(".column").css("background-color","#99ff99");
            $(".column").click(function() {
                Ownlink.ajout($(this))
            });

        });
        $("#add").bind("contextmenu",function(){ 
            localThis.NewBlockCounter = 0;
            $("#add").text(localThis.NewBlockCounter);
            $(".column").css("background-color","#ffffff");
            $(".column").off("click");
        });
             
        $("#lock").click(function(){
            if(this.IsLocked == false){ 
                $( ".column" ).sortable("option", "cancel", "false");
                $("#lock").text('Lock');
                this.IsLocked = true;
            }else{
                $( ".column" ).sortable({
                    cancel : ".item"
                });
                $("#lock").text('Unlock');
                this.IsLocked = false;    
            }
            
        });
        $( ".column" ).sortable({
            connectWith: ".column",
            placeholder: "ui-state-highlight"
        }).disableSelection();
         
        $("#add").disableSelection();
        
        $("#changetitle").click(function(){
            if(this.modification == true){
                $("#lefttitle").text($("#edtleft").val());
                $("#middletitle").text($("#edtmiddle").val());
                $("#righttitle").text($("#edtright").val());
                this.modification = false;
                $("#changetitle").text("Change title");
            }else{
                $("#lefttitle").html("<div id='lefttitle'><input type='text' value='"+$("#lefttitle").text()+"' class='edittitle' id='edtleft'/></div>"); 
                $("#middletitle").html("<div id='middletitle'><input type='text' value='"+$("#middletitle").text()+"' class='edittitle' id='edtmiddle'/></div>"); 
                $("#righttitle").html("<div id='righttitle'><input type='text' value='"+$("#righttitle").text()+"' class='edittitle' id='edtright'/></div>");
                this.modification = true;
                $("#changetitle").text("Validation");
            }
        });
        
    },
    
    ajout: function(column) {            
        column.append("<div class='item'></div>");
        $(".column").css("background-color","#ffffff");
        $(".column").off("click");
        this.NewBlockCounter = 0;
        $("#add").text(this.NewBlockCounter);
    }
}; 

