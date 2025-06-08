import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    writer: { type: String, required: true },
    itemId: { type: String, required: true },
    itemCategory: { type: String, required: true },
    totalNumberOfRecruits: { type: String, required: true },
    numberOfRecruitedPersonnel: { type: String, required: true },
    totalPrice: { type: String, required: true },
    pricePerEachPerson: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Item = mongoose.models.Item || mongoose.model('ddip', itemSchema,'object');

export default Item;
