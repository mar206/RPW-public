// Segment update: updating setTimeout functions
/*
This service updates the setTimeout functions for all
segments when the server is restarted
*/

const db = require('../models');
const VOTING_WINDOW = 8.64e7; //24hrs - 8.64e7

const SegmentUpdate = function() {
  console.log('SegmentUpdate service started...');

  const updateTimeouts = async function() {
    try {
      const segments = await db.Segment.find({status: 'voting'});
      segments.forEach(segment => {
        const {_id, story, createdAt} = segment;
        const timeLapsed = Date.now() - new Date(createdAt).getTime();

        if (timeLapsed < VOTING_WINDOW) {
          const newVotingWindow = VOTING_WINDOW - timeLapsed;
          setTimeout(() => updateSegment(_id, story), newVotingWindow);
        } else {
          updateSegment(_id, story);
        }

        //Message for check
        console.log('Segment updated: ', _id, 'Time to update: ', VOTING_WINDOW - timeLapsed);

      });

    } catch (err) {
      console.log(err);
    }
  }

  const updateSegment = async function(segmentId, storyId) {
    try {
      const foundSegment = await db.Segment.findOne({_id: segmentId});
      const foundStory = await db.Story.findOne({_id: storyId});

      const totalVotes = foundSegment.votes.length;
      const positives = foundSegment.votes.filter(val => val.choice === 'positive');
      const passed = (totalVotes > 0) ? positives.length / totalVotes > 0.5 : true;

      foundSegment.status = (passed) ? 'accepted' : 'rejected';
      foundStory.status = 'open';
      foundSegment.save();
      foundStory.save();

    } catch (err) {
      console.log(err);
    }
  }

  //Call update function
  updateTimeouts();

}();

//Export
module.exports = SegmentUpdate;
