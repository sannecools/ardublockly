/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Microduino code for procedure (function) blocks.
 *
 */
'use strict';

goog.provide('Blockly.Arduino.md_core');

goog.require('Blockly.Arduino');


/**
 * Code generator to add code into the setup() and loop() functions and a declare block, as well as list of used MD blocks.
 * Its use is not mandatory, but necessary to add manual code to setup() and upfront declare.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['md_functions_ext'] = function(block) {
  // Edited version of Blockly.Generator.prototype.statementToCode
  function statementToCodeNoTab(block, name) {
    var targetBlock = block.getInputTargetBlock(name);
    var code = Blockly.Arduino.blockToCode(targetBlock);
    if (!goog.isString(code)) {
      throw 'Expecting code from statement block "' + targetBlock.type + '".';
    }
    return code;
  }
  
  var MDblocksBranch = Blockly.Arduino.statementToCode(block, 'MD_BLOCKS');
  if (MDblocksBranch) {
    // blocks should only init data ... 
    console.log('Unexpected code in MDblocksBranch', MDblocksBranch)
  }

  var declareBranch = Blockly.Arduino.statementToCode(block, 'DECLARE_FUNC');
  if (declareBranch) {
    declareBranch = 'void declareUpFront() {\n' + declareBranch + '\n}'
    Blockly.Arduino.addDeclaration('userDeclareCode', declareBranch);
    Blockly.Arduino.addSetup('userDeclareCode', declareBranch);
  }

  var setupBranch = Blockly.Arduino.statementToCode(block, 'SETUP_FUNC');
  //var setupCode = Blockly.Arduino.scrub_(block, setupBranch); No comment block
  if (setupBranch) {
    Blockly.Arduino.addSetup('userSetupCode', setupBranch, true);
  }

  var loopBranch = statementToCodeNoTab(block, 'LOOP_FUNC');
  //var loopcode = Blockly.Arduino.scrub_(block, loopBranch); No comment block
  return loopBranch;
};


/**
 * The core MCookie block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['mcookie_coreusb'] = function(block) {  
  var code = '';
  return code;
};

/**
 * The Hub MCookie block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['mcookie_hub'] = function(block) {
  var code = '';
  return code;
};

/**
 * The BM-shield MCookie block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['mcookie_power'] = function(block) {
  //power only needs to be connected, no code needed
  var code = '';
  return code;
};

/**
 * The Audio setup MCookie block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['mcookie_audio_setup'] = function(block) {
  //audio block setup code:
  var volume =  Blockly.Arduino.valueToCode(
      block, 'VOLUME', Blockly.Arduino.ORDER_ATOMIC) || '10';
  var mode = block.getFieldValue('MODE');
  var audio_setup_code = 
' AUDIO.init(DEVICE_TF, ' + mode + ', ' + volume + ');\n' +
'  AUDIO.choose(1);\n' +
'  AUDIO.pause();\n';
  
  Blockly.Arduino.addInclude('MD_softwareserial', '#include <SoftwareSerial.h>');
  Blockly.Arduino.addInclude('MD_audio', '#include "Microduino_Audio.h"');
  
  Blockly.Arduino.addDeclaration('MD_softwareserial', 'SoftwareSerial MDSerial(2, 3);');
  Blockly.Arduino.addDeclaration('MD_audio', 'JQ6500 AUDIO(&MDSerial);');

  Blockly.Arduino.addSetup('MD_audio', audio_setup_code, true);
  
  var code = '';
  return code;
};

/**
 * The Amplifier MCookie block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['mcookie_audio_amplifier'] = function(block) {
  //power only needs to be connected, no code needed
  var code = '';
  return code;
};
