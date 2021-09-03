import * as mongoose from 'mongoose'

const { Schema, model } = mongoose

const userSchema = new Schema(
	{
		userId: String,
		credit: Number,
	},
	{
		versionKey: false, //remove __v
		timestamps: true, //add createdAt & updatedAt to db
	},
)

const User = model('User', userSchema)

export const createUserById = async (userId: string, credit: number) => {
	const doc = new User({ userId, credit })
	await doc.save()
	return doc
}

export const getUserByUserId = (userId: string) =>
	User.findOne({ userId }).lean()
