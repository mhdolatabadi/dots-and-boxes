import * as mongoose from 'mongoose'

const { Schema, model } = mongoose
const paperSchema = new Schema(
	{
		paperId: String,
		playerIds: [String],
		subscriberIds: [String],
		histories: [{ type: Schema.Types.ObjectId, ref: 'Line' }],
		messageIds: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
		lastMoveId: String,
		turn: String,
		isEnded: Boolean,
		socketIds: [String],
		size: Number,
		winnerId: String,
	},
	{
		versionKey: false,
		timestamps: true,
	},
)

const Paper = model('Paper', paperSchema)

export const getUserByPaperId = (paperId: string) =>
	Paper.findOne({ paperId }).lean()

export const getPaperById = (_id: string) => Paper.findOne({ _id }).lean()

export const updatePaper = async (
	paperId: string,
	playerId: string,
	socketId: string,
	turn: string,
	size: number,
	isEnded: boolean,
) => {
	const doc = await Paper.updateOne(
		{ paperId },
		{
			$set: {
				turn,
				size,
				isEnded,
			},
			$push: {
				playerIds: playerId,
				socketIds: socketId,
			},
		},
		{ upsert: true },
	)
	return doc
}

export const addMessage = async (
	paperId: string,
	messageId: mongoose.Schema.Types.ObjectId,
) => {
	const doc = await Paper.updateOne(
		{ paperId },
		{
			$push: {
				messageIds: messageId,
			},
		},
	)
}

export const addLine = async (
	paperId: string,
	lineId: mongoose.Schema.Types.ObjectId,
) => {
	await Paper.updateOne(
		{ paperId },
		{
			$set: {
				lastMoveId: lineId,
			},
			$push: {
				histories: lineId,
			},
		},
	)
}
export const dbSetPaperEnd = async (paperId: string, userId: string) => {
	await Paper.updateOne(
		{ paperId },
		{
			$set: {
				isEnded: true,
				winnerId: userId,
			},
		},
	)
}
