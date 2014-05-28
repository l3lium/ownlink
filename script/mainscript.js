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
         

    },
    
    ajout: function(column) {
        column.append("<div class='item'></div>");
        $(".column").css("background-color","#ffffff");
        $(".column").off("click");
        this.NewBlockCounter = 0;
        $("#add").text(this.NewBlockCounter);
    //column.unbind("click");
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