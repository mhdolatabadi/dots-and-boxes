import * as mongoose from 'mongoose'
import { addLine } from './paper'

const { Schema, model } = mongoose
const lineSchema = new Schema(
	{
		i: Number,
		j: Number,
		color: String,
		paperId: String,
	},
	{
		versionKey: false, //remove __v
		timestamps: true, //add createdAt & updatedAt to db
	},
)

const Line = model('Line', lineSchema)

export const createLine = async (
	paperId: string,
	i: number,
	j: number,
	color: string,
) => {
	const doc = new Line({ i, j, color, paperId })
	await doc.save()
	await addLine(paperId, doc._id)
	return doc
}
