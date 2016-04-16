
/* BOOTSTRAP extra script 
 */

/*
 * Change the board 
 */
function setBoard(name) {
  console.log('setboard', name);
  Blockly.Arduino.Boards.changeBoard(Blockly.mainWorkspace, name);
}

jQuery("#action-setUno").click(function(event){
  //do something
  setBoard("uno");
  });
jQuery("#action-setMega").click(function(event){
  //do something
  setBoard("mega");
  });
jQuery("#action-setMD").click(function(event){
  //do something
  setBoard("microduino");
  });

/* 
 * Make sure bootstrap tooltips show
 */
$('.b4ard_tt').tooltip();

/* 
 * Update text in dropdown with selection
 */
$(".dropdown-menu li a").click(function(){
  var selText = $(this).text();
  $(this).parents('.btn-group').find('.ard_setting').html(selText+' <span class="caret"></span>');
});