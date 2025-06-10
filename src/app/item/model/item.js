import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    writer: { type: String, required: true },
    itemCategory: { type: String, required: true },
    totalNumberOfRecruits: { type: Number, required: true },
    numberOfRecruitedPersonnel: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    pricePerEachPerson: { type: Number, required: true },
    tradeType: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});


const Item = mongoose.models.Item || mongoose.model('ddip', itemSchema,'item');

export default Item;
