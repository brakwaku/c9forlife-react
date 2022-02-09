import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const activitySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dateAdded: {
    type: Date,
  },
  dateCompleted: {
    type: Date
  },
  dateArchived: {
    type: Date
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  suggestedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;