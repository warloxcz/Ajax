$(document).ready(function(){

    function loadUsers(){
        var formItem = $(".form-users");
        $.get("http://ajax1.lmsoft.cz/procedure.php?cmd=getPeopleList", function(data, status){
            $.each(data, function(k,v) {
                var html = '<div><input type="radio" name="user" id="'+v["name"]+'" class="user" value="'+v["ID"]+'" required><label>'+v["name"]+'</label></div>';
                var radio = $(html);
                formItem.append(radio);
              });
          });
    }

    function loadDrinks(){
        var formItem = $(".form-drinks");
        $.get("http://ajax1.lmsoft.cz/procedure.php?cmd=getTypesList", function(data, status){
            $.each(data, function(k,v) {
                var html = '<div class="drink-wrap"><lasbel>'+v["typ"]+' </label><div class="range-wrap"><label id="r'+v["ID"]+'">0</label><input type="range" name="type[]" class="drink-type" value="0" id="'+v["ID"]+'"></div></div>';
                var item = $(html);
                formItem.append(item);
              });
          });
    }

    loadUsers();
    loadDrinks();

    $("form").submit(function(e){
      var submit = false;       
        var userID = $(".user:checked").attr('id'); 
        var drinks = $(".drink-type");
        drinksList = [];
        $.each(drinks, function(k,v) {
           if(v.value > 0){
                drinksList.push([v.id]);
            }
          });
        if(drinksList.length > 0 && userID != undefined){
          submit = true;
        }
        if(submit == false){
          e.preventDefault();
          return;
        }
    });

    $("#list-btn").click(function(){
      var output = "";
      $.get("http://ajax1.lmsoft.cz/procedure.php?cmd=getSummaryOfDrinks", function(data, status){
        console.log(data);
            $.each(data, function(k,v) {
                output += v[0]+ ": "+ v[1]+ " ("+ v[2]+ ")\n";
              });
              alert(output);
          }); 
    });

    $(document).on('input', '.drink-type', function() {
      $("#r"+ this.id).text(this.value);
  });
  });