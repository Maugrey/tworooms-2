Cards = new Mongo.Collection("Cards");
Players = new Mongo.Collection("Players");
Games = new Mongo.Collection("Games");



var Schema = {};

Schema.Card = new SimpleSchema({
    name: {
        type: String,
        optional: false
    },
    description: {
        type: String,
        optional: true
    },
    team: {
        type: String,
        optional: false
    }
});

Schema.Player = new SimpleSchema({
    name: {
        type: String,
        optional: false
    },
    game: {
        type: SimpleSchema.Game,
        optional: false
    },
    card: {
        type: SimpleSchema.Card,
        optional: true
    }
});

Schema.Game = new SimpleSchema({
    players: {
        type: [String],
        autoValue: function() {
            if(this.isInsert) {
                return [];
            }
        }
    },
    stage: {
        type: String,
        optional: false,
        allowedValues: ['Lobby', 'Round 1', 'Round 2', 'Round 3', 'Game Over']
    },
    createdOn: {
        type: Date,
        autoValue: function() {
            if(this.isInsert) {
                var createdOn = new Date();
                return createdOn;
            }
        }
    },
    timerLength: {
        type: Number,
        autoValue: function() {
            if(this.isInsert) {
                return 3
            }
        }
    },
    timerEndTime: {
        type: Date,
        optional: true
    },
    timerPaused: {
        type: Boolean,
        optional: true
    },
    timerPausedTime: {
        type: Date,
        optional: true
    }
    //create methods that set an end time, and retrieve the time remaining
});

Cards.attachSchema(Schema.Card);
Players.attachSchema(Schema.Player);
Games.attachSchema(Schema.Game);