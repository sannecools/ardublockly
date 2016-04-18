/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Block for the Microduino functions.
 *     The Arduino built in functions syntax can be found at:
 *     https://arduino.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.Blocks.md_actuator');

goog.require('Blockly.Blocks');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.md_actuator.HUE = 230;


Blockly.Blocks['mcookie_servo_setup'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("../media/MD/MDServo.png", 19, 19, "*"))
        .appendField("Servo Motor Type:")
        .appendField(new Blockly.FieldDropdown([["0~360 graden", "360DEGREES"], ["0~180 graden", "180DEGREES"]]), "SERVODEGREES");
    this.setOutput(true, "MD_SENSOR");
    this.setColour(230);
    this.setTooltip('Servo Motor Connector, een servo die volledig kan ronddraaien, maakt een hoek van 360 graden. Een servo die maar tot de helft kan draaien, maakt een hoek van 180 graden.');
    this.setHelpUrl('https://wiki.microduino.cc/index.php/Servo');
  }
};