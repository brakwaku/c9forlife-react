import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    photoURL: {
      type: String,
    },
    cloudinaryId: {
      type: String,
      required: true,
    },
    resetToken: String,
    resetTokenExpiration: Date,
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    bucket: {
      items: [
        {
          activityId: {
            type: Schema.Types.ObjectId,
            ref: "Activity",
            required: true,
          },
        },
      ],
    },
    toDoList: {
      toDos: [
        {
          toDoId: {
            type: Schema.Types.ObjectId,
            ref: "Activity",
            required: true,
          },
        },
      ],
    },
    completed: {
      comps: [
        {
          compId: {
            type: Schema.Types.ObjectId,
            ref: "Activity",
            required: true,
          },
          quantity: {type: Number}
        },
      ],
    },
    archive: {
      archs: [
        {
          archId: {
            type: Schema.Types.ObjectId,
            ref: "Activity",
            required: true,
          },
          quantity: {type: Number}
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password before saving new user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.addToToDo = function (activity) {
  const toDoActivityIndex = this.toDoList.toDos.findIndex((cp) => {
    return cp.toDoId.equals(activity._id);
  });

  if (toDoActivityIndex >= 0) {
    throw new Error("Activity already added to your to-dos.");
  } else {
    this.toDoList.toDos.push({toDoId: activity._id});
  }

  // let newQuantity = 1;
  // const updatedToDoItems = [...this.toDoList.toDos];

  // if (toDoActivityIndex >= 0) {
  //   newQuantity = this.toDoList.toDos[toDoActivityIndex].quantity + 1;
  //   updatedToDoItems[toDoActivityIndex].quantity = newQuantity;
  // } else {
  //   updatedToDoItems.push({
  //     toDoId: activity,
  //     quantity: newQuantity,
  //   });
  // }
  // const updatedToDo = {
  //   toDos: updatedToDoItems,
  // };
  // this.toDoList = updatedToDo;
  return this.save();
};

userSchema.methods.removeFromToDo = function (toDoId) {
  const updatedToDoItems = this.toDoList.toDos.filter((toDo) => {
    return toDo.toDoId.toString() !== toDoId.toString();
  });
  this.toDoList.toDos = updatedToDoItems;
  return this.save();
};

userSchema.methods.addToCompleted = function (activityId) {
  const compActivityIndex = this.completed.comps.findIndex((cp) => {
    return cp.compId.equals(activityId);
    // return cp.compId.toString() === activityId.toString();
  });
  let newQuantity = 1;
  const updatedCompItems = [...this.completed.comps];

  if (compActivityIndex >= 0) {
    newQuantity = this.completed.comps[compActivityIndex].quantity + 1;
    updatedCompItems[compActivityIndex].quantity = newQuantity;
  } else {
    updatedCompItems.push({
      compId: activityId,
      quantity: newQuantity,
    });
  }
  const updatedComp = {
    comps: updatedCompItems,
  };
  this.completed = updatedComp;
  return this.save();
};

userSchema.methods.removeFromCompleted = function (compId) {
  const updatedCompItems = this.completed.comps.filter((comp) => {
    return comp.compId.toString() !== compId.toString();
  });
  this.completed.comps = updatedCompItems;
  return this.save();
};

userSchema.methods.addToArchive = function (activityId) {
  const archActivityIndex = this.archive.archs.findIndex((cp) => {
    return cp.archId.equals(activityId);
    // return cp.archId.toString() === activity.toString();
  });
  let newQuantity = 1;
  const updatedArchItems = [...this.archive.archs];

  if (archActivityIndex >= 0) {
    newQuantity = this.archive.archs[archActivityIndex].quantity + 1;
    updatedArchItems[archActivityIndex].quantity = newQuantity;
  } else {
    updatedArchItems.push({
      archId: activityId,
      quantity: newQuantity,
    });
  }
  const updatedArch = {
    archs: updatedArchItems,
  };
  this.archive = updatedArch;
  return this.save();
};

userSchema.methods.addToBucket = function (activity) {
  const bucketActivityIndex = this.bucket.items.findIndex((cp) => {
    return cp.activityId.equals(activity._id);
  });

  if (bucketActivityIndex >= 0) {
    throw new Error("Activity already in your bucket.");
  } else {
    this.bucket.items.push({activityId: activity._id});
  }

  return this.save();
};

// userSchema.methods.addToBucket = function (activity) {
//   const bucketActivityIndex = this.bucket.items.findIndex((cp) => {
//     return cp.activityId.toString() === activity._id.toString();
//   });
//   let newQuantity = 1;
//   const updatedBucketItems = [...this.bucket.items];

//   if (bucketActivityIndex >= 0) {
//     newQuantity = this.bucket.items[bucketActivityIndex].quantity + 1;
//     updatedBucketItems[bucketActivityIndex].quantity = newQuantity;
//   } else {
//     updatedBucketItems.push({
//       activityId: activity._id,
//       quantity: newQuantity,
//     });
//   }
//   const updatedBucket = {
//     items: updatedBucketItems,
//   };
//   this.bucket = updatedBucket;
//   return this.save();
// };

userSchema.methods.removeFromBucket = function (activityId) {
  const updatedBucketItems = this.bucket.items.filter((item) => {
    return item.activityId.toString() !== activityId.toString();
  });
  this.bucket.items = updatedBucketItems;
  return this.save();
};

userSchema.methods.clearBucket = function () {
  this.bucket = { items: [] };
  return this.save();
};

const User = mongoose.model("User", userSchema);

export default User;
