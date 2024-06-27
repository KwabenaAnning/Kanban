// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import sinon from 'sinon';
// import 'mocha';
// import * as mongoose from 'mongoose';
// import App from '../../src/server';

// chai.use(chaiHttp);

// const expect = chai.expect;

// describe('Board Service Tests', () => {
//     let BoardModel: sinon.SinonStubbedInstance<typeof mongoose.Model<any>>;

//     beforeEach(() => {
//         BoardModel = sinon.stub(mongoose.model('Board')); // Replace with your actual Board model
//     });

//     afterEach(() => {
//         sinon.restore();
//     });

//     it('should edit a board successfully', async () => {
//         const mockBoardId = new mongoose.Types.ObjectId(); // Create a new ObjectId for testing
//         const boardName = 'Updated Board';
//         const existingBoard = {
//             _id: mockBoardId,
//             boardName: 'Old Board',
//         };

//         BoardModel.findById.withArgs(mockBoardId).resolves(existingBoard);
//         BoardModel.findByIdAndUpdate.withArgs(mockBoardId, { boardName }).resolves({
//             _id: mockBoardId,
//             boardName,
//         });

//         const res = await chai.request(App)
//             .put(`/api/v1/board/create`)
//             .send({ boardName });

//         expect(res).to.have.status(200);
//         expect(res.body).to.have.property('boardName', boardName);
//         expect(BoardModel.findById).to.have.been.calledOnceWith(mockBoardId);
//         expect(BoardModel.findByIdAndUpdate).to.have.been.calledOnceWith(mockBoardId, { boardName }, { new: true, runValidators: true });
//     });
// });
