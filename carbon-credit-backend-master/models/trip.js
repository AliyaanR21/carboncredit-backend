import { Schema, model, Types } from 'mongoose';

const tripSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'user',
    required: true
},
  tripDate: {
    type: String,
    required: true
},
  tripMode: {
    type: String,
    required: true
},
  tripDistance: {
    type: Number,
    required: true
},
  tripCredits: {
    type: Number,
    required: true
},
  tripStatus: {
    type: String,
  enum: ['pending', 'verified', 'rejected'], // Add 'rejected'
  default: 'pending'
},
  tripProof: {
    type: String
},
}, {
  timestamps: true,
  strict: false
});

const Trip = model('trip', tripSchema, 'trips');

export default Trip;
