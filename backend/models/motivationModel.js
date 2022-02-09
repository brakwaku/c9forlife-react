import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const motivationSchema = new Schema({
    // image: {
    //   type: String,
    //   required: true
    // },
    // cloudinaryId: {
    //   type: String,
    //   required: true
    // },
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