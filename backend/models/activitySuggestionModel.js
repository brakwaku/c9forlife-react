import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const activitySuggestionSchema = new Schema({
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
  }
}, {
  timestamps: true
});

const ActivitySuggestion = mongoose.model('ActivitySuggestion', activitySuggestionSchema);

export default ActivitySuggestion;