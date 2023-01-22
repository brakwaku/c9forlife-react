import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const motivationSchema = new Schema({
    quote: {
      type: String,
      required: true
    },
    author: {
        type: String,
        required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }, {
    timestamps: true
  });
  
  const Motivation = mongoose.model('Motivation', motivationSchema);
  
  export default Motivation;