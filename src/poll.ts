import { Ballot } from './ballot';

export class Poll {

    //TODO Features
    //Add optional print to console as part of constructor
    //Add export results to file.

    ballots : Ballot[];

    tally = new Map();

    remainingCandidates : String[];
    eliminatedCandidates: String[] = [];

    roundNumber : number = 0;

    constructor (choices : String[], ballots : Ballot[]) {
        this.remainingCandidates = choices;
        this.ballots = ballots;
    }

    determineWinner() : String {
        this.roundNumber = 0;

        console.log("Beginning round 0.");

        this.tallyVotes();

        //If it is completely tied, election ends.
        //TODO Find a solution for this.
        //Additionally, print out tied candidates instead of "tied."
        if (this.isCompletelyTied()) {
            return "tied";
        }

        //If the election is not tied at all, check to see if a candidate has won off the bat.
        if (!this.isPartiallyTied()) {
            var tallyNum = this.getTallyNumber(this.getHighestTallyCandidates()[0]);
            //TODO check that > is correct, and that it is not >=
            if (tallyNum > this.getVotesNeeded()) {
                return this.getHighestTallyCandidates()[0];
            }
        }
        return this.runoff();
    }

    runoff() : String {
        this.roundNumber++;

        console.log("Beginning round " + this.roundNumber + ".");

        //Eliminate the lowest scoring candidates.
        for (let candidate of this.getLowestTallyCandidates()) {
            this.eliminateCandidate(candidate);
        }

        this.tallyVotes();

        if (this.isCompletelyTied()) {
            return "tied";
        }

        if (this.remainingCandidates.length == 1) {
            console.log("1 candidate remaining, winner decided.");
            return this.remainingCandidates[0];
        }

        if (this.remainingCandidates.length == 2) {
            var cand1Tally = this.getTallyNumber(this.remainingCandidates[0]);
            var cand2Tally = this.getTallyNumber(this.remainingCandidates[1]);

            console.log("2 remaining candidates, winner decided.");
            return (cand1Tally > cand2Tally) ? this.remainingCandidates[0] : this.remainingCandidates[1];
        }

        if (this.getHighestTallyCandidates().length == 1) {
            var tallyNum = this.getTallyNumber(this.getHighestTallyCandidates()[0]);

            //TODO check that > is correct, and that it is not >=
            if (tallyNum > this.getVotesNeeded()) {
                console.log("Votes needed to win exceeded, winner decided.");
                return this.getHighestTallyCandidates()[0];
            }
        }

        return this.runoff();
    }

    tallyVotes() { //TODO Doesnt make sure candidate isnt eliminated
        this.tally.clear();
        
        for (let candidate of this.remainingCandidates) {
            this.tally.set(candidate, 0);
        }
        
        for (let ballot of this.ballots) {
            if (!this.tally.has(ballot.choices[0])){
                this.tally.set(ballot.choices[0], 1);
            }            
            else {
                this.tally.set(ballot.choices[0], this.tally.get(ballot.choices[0]) + 1);
            }
        }
    }

    getHighestTallyCandidates() : String[] {
        var highestTallyCandidates: String[] = [];
        var highestTallyValue : Number = 0;

        for (let [k, v] of this.tally.entries()) {
            //We dont do a check for == 0, because if there were no votes there are no winners.
            if (v > highestTallyValue) {
                highestTallyCandidates = [k];
                highestTallyValue = v;
            }
            else if (v == highestTallyValue) {
                highestTallyCandidates.push(k);
            }
        }
        return highestTallyCandidates;
    }

    getLowestTallyCandidates() : String[] {
        var lowestTallyCandidates: String[] = [];
        var lowestTallyValue : Number = -1;

        for (let [k, v] of this.tally.entries()) {
            //First, check if this is the first iteration. Tally will never be -1.
            if (lowestTallyValue == -1) { 
                lowestTallyCandidates = [k];
                lowestTallyValue = v;
            }
            else if (v < lowestTallyValue) {
                lowestTallyCandidates = [k];
                lowestTallyValue = v;
            }
            else if (v == lowestTallyValue) {
                lowestTallyCandidates.push(k);
            }
        }
        return lowestTallyCandidates;
    }

    getTallyNumber(candidate : String) : number {
        return this.tally.get(candidate);
    }

    eliminateCandidate(candidate : String) { 
        console.log("Eliminating candidate: " + candidate);

        this.eliminatedCandidates.push(candidate);

        var i : number;
        for (i=0; i < this.remainingCandidates.length; i++) {
            if (this.remainingCandidates[i] == candidate) {
                this.remainingCandidates.splice(i, 1);
            }
        }

        this.removeCandidateFromBallots(candidate);
    }

    removeCandidateFromBallots(candidate : String) {
        for (let ballot of this.ballots) {
            if (ballot.choices.indexOf(candidate) > -1) {
                ballot.choices.splice(ballot.choices.indexOf(candidate), 1);
            }

            if (this.ballotIsEmpty(ballot)) {
                console.log("Empty ballot found, removing " + ballot.owner + "'s ballot.");
                this.ballots.splice(this.ballots.indexOf(ballot), 1);
            }
        }
    }

    candidateIsEliminated(candidate : String) : boolean {
        return this.eliminatedCandidates.indexOf(candidate) >= 0;
    }

    ballotIsEmpty(ballot : Ballot) : boolean {
        //If all choices on a person's ballot are eliminated, it is empty.
        return ballot.choices.length <=0; 
    }

    //Example: 2 people tied, one person scores lower, so it's only partially tied.
    isPartiallyTied() : boolean {
        if (this.getHighestTallyCandidates().length > 1 && !this.isCompletelyTied()) {
            return true;
        }
        return false;
    }

    isCompletelyTied() : boolean {
        //If the length of the highest tally candidates array is the same as the remaining candidates array.
        return (this.getHighestTallyCandidates().length == this.remainingCandidates.length) && (this.remainingCandidates.length > 1);
    }

    getVotesNeeded() : number {
        return (this.ballots.length / 2); //TODO make sure this is correct
    }
}