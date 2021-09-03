import * as mongoose from 'mongoose'

const { Schema, model } = mongoose

const userSchema = new Schema(
	{
		userId: String,
		firstname: String,
		lastname: String,
		credit: Number,
		paperIds: [String],
	},
	{
		versionKey: false, //remove __v
		timestamps: true, //add createdAt & updatedAt to db
	},
)

const User = model('User', userSchema)

export const createUserById = async (
	userId: string,
	firstname: string,
	lastname: string,
	credit: number,
) => {
	const doc = new User({ userId, firstname, lastname, credit })
	await doc.save()
	return doc
}

export const getUserByUserId = (userId: string) =>
	User.findOne({ userId }).lean()

// export const getUserById = (_id: string) => User.findOne({ _id }).lean()
