import * as mongoose from 'mongoose'
import { addMessage } from './paper'

const { Schema, model } = mongoose
const messageSchema = new Schema(
	{
		senderId: String,
		paperId: String,
		content: String,
	},
	{
		versionKey: false, //remove __v
		timestamps: true, //add createdAt & updatedAt to db
	},
)

const Message = model('Message', messageSchema)

export const createMessage = async (
	senderId: string,
	paperId: string,
	content: string,
) => {
	const doc = new Message({ senderId, paperId, content })
	await doc.save()
	await addMessage(paperId, doc._id)
	return doc
}
