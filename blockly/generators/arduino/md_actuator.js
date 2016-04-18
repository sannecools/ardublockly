/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Microduino code for procedure (function) blocks.
 *
 */
'use strict';

goog.provide('Blockly.Arduino.md_actuator');

goog.require('Blockly.Arduino');


/**
 * Value for defining a servo type.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['mcookie_servo_type'] = function(block) {
  var code = block.getFieldValue('SERVOTYPE');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * The servo setup block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['mcookie_servo_setup'] = function(block) {
  var servoNames = block.getServoSetupInstance();
  var topType = Blockly.Arduino.valueToCode(
      block, 'SERVOTOPTYPE', Blockly.Arduino.ORDER_ATOMIC) || 'NOSERVO';
  var bottomType = Blockly.Arduino.valueToCode(
      block, 'SERVOBOTTOMTYPE', Blockly.Arduino.ORDER_ATOMIC) || 'NOSERVO';
  
  //the hub saved the connector in the attached block
  var hubconnector = block['connector']
  //compute the pins, normally only possible to attach at valid pins
  var pintop = (parseInt(hubconnector,10) -3) *2;
  var pinbottom = pintop + 1;
  
  if (topType != 'NOSERVO') {
    var servoName = 'myServo' + servoNames[0];
    var pin = pintop;
    //Blockly.Arduino.reservePin(block, pintop, Blockly.Arduino.PinTypes.SERVO, 'Servo Write');
    Blockly.Arduino.addInclude('servo', '#include <Servo.h>');
    Blockly.Arduino.addDeclaration('servo_' + servoName, 'Servo ' + servoName + ';');
    Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.SERVO, 'Servo Microduino Use');
    var setupCode = servoName + '.attach(' + pin + ');';
    Blockly.Arduino.addSetup('servo_' + servoName, setupCode, true);
  }
  if (bottomType != 'NOSERVO') {
    var servoName = 'myServo' + servoNames[1];
    var pin = pinbottom;
    //Blockly.Arduino.reservePin(block, pintop, Blockly.Arduino.PinTypes.SERVO, 'Servo Write');
    Blockly.Arduino.addInclude('servo', '#include <Servo.h>');
    Blockly.Arduino.addDeclaration('servo_' + servoName, 'Servo ' + servoName + ';');
    Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.SERVO, 'Servo Microduino Use');
    var setupCode = servoName + '.attach(' + pin + ');';
    Blockly.Arduino.addSetup('servo_' + servoName, setupCode, true);
  }

  return '';
};


/**
 * Code generator to set an angle (Y) value to a servo PWM pin (X).
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['mcookie_servo_write'] = function(block) {
  var servoInstanceName = block.getFieldValue('SERVO_NAME');
  var servoAngle = Blockly.Arduino.valueToCode(
      block, 'SERVO_ANGLE', Blockly.Arduino.ORDER_ATOMIC) || '90';
  var servoName = 'myServo' + servoInstanceName;

  var code = servoName + '.write(' + servoAngle + ');\n';
  return code;
};

/**
 * Code generator to read an angle value from a servo PWM pin (X).
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['mcookie_servo_read'] = function(block) {
  var servoInstanceName = block.getFieldValue('SERVO_NAME');
  var servoName = 'myServo' + servoInstanceName;

  var code = servoName + '.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

