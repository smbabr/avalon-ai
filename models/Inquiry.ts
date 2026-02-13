import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInquiry extends Document {
    name: string;
    email: string;
    institution?: string;
    message: string;
    timestamp: Date;
}

const InquirySchema = new Schema<IInquiry>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    institution: { type: String },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

// Prevent model overwrite in hot-reload mode
const Inquiry: Model<IInquiry> = mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);

export default Inquiry;
