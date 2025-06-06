import mongoose from 'mongoose';

const ObjectSchema = new mongoose.Schema({
    desc: { type: String, required: true },
    max: { type: Number, required: true },
    now: { type: Number, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true },
    value: { type: String, required: true },
}, { collection: 'object' }); // MongoDB의 컬렉션 이름

// ✅ 모델 이름은 명확하게 문자열로 지정하고, 재정의 방지
export default mongoose.models['Object'] || mongoose.model('Object', ObjectSchema);
