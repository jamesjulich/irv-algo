import { Poll } from './poll';
import { Ballot } from './ballot';

//Test scenario: 

var choices : String[] = ["Option1", "Option2", "Option3", "Option4"];

var ballot1 = new Ballot("voter1", ["Option2", "Option3", "Option1", "Option4"]);
var ballot2 = new Ballot("voter2", ["Option2", "Option3", "Option4", "Option1"]);
var ballot3 = new Ballot("voter3", ["Option4", "Option3", "Option1", "Option2"]);
var ballot4 = new Ballot("voter4", ["Option4", "Option3", "Option1", "Option2"]);
var ballot5 = new Ballot("voter5", ["Option4", "Option3", "Option1", "Option2"]);
var ballot6 = new Ballot("voter6", ["Option3", "Option2", "Option1", "Option4"]);
var ballot7 = new Ballot("voter7", ["Option3", "Option2", "Option1", "Option4"]);
var ballot8 = new Ballot("voter8", ["Option1", "Option2", "Option3", "Option4"]);

var ballots = [ballot1, ballot2, ballot3, ballot4, ballot5, ballot6, ballot7, ballot8];

var poll = new Poll(choices, ballots);

var winner : String = poll.determineWinner();

console.log(winner);