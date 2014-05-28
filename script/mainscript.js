/* Main script Ownlink Project
 * Autors: OLIVEIRA Stéphane & BURTON Ian
 * Date: 21.05.2014
 */
$(document).ready(function() {
    var dada = new Ownlink();
    dada.init();
    
});

var Ownlink = function()
{
    this.newBlockCounter = 0;
    //this.isLocked = true;
    //Mode d'utilisation:
    //0 - Edit
    //1 - lock 
    this.mode = 0;
    
    this.columns = [];
    this.columns.push(new column(1)); 
    this.columns.push(new column(2));
    this.columns.push(new column(3));
}

Ownlink.prototype =
{
    init: function() {
        var localThis = this;
        $('#menu').hide();
        $("#add").click(function(){
            localThis.NewBlockCounter++;
            $("#add").text(localThis.NewBlockCounter);

            $(".column").css("background-color","#99ff99");                
            $(".column").click(function() {
                var columnClick =$(this);
                $('#menu').show();
                $( "input[name='ok']" ).click(function(){
                    for (var i=1;i<= localThis.columns.length ;i++){
                        localThis.columns[i].addItem($( "input[name='title']" ).val(), $( "input[name='linkInput']" ).val());
                    }
                    $('#menu').hide();
                });
                $( "input[name='cancel']" ).click(function(){
                    $('#menu').hide();
                });
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
}

var column = function(id)
{
    this.name = "Column "+id;
    this.element = $(".column:eq( "+id+" )");
    
}

column.prototype =
{
    changeName: function(name) {
        this.name = name;
    },
    
    addItem: function(name, url) {      
        var item = $("<div class='item'></div>").appendTo(this.element);
        $('<a>',{
            text: name,
            href: url
        }).appendTo(item);
    }
}
