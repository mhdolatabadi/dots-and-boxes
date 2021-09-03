import * as mongoose from 'mongoose'
import { getUserByUserId } from './user'

const { Schema, model } = mongoose
const playerSchema = new Schema(
	{
		userId: String,
		name: String,
		paperId: String,
		color: String,
		role: String,
		score: Number,
		hasPermission: Boolean,
		isConnected: Boolean,
		socketId: String,
	},
	{
		versionKey: false,
		timestamps: true,
	},
)

const Player = model('Player', playerSchema)

export const getPlayerByUserId = async (userId: string) => {
	const user = await getUserByUserId(userId)
	return Player.findOne({ user }).lean()
}

export const getPlayerById = (_id: string) => Player.findOne({ _id }).lean()

export const updatePlayer = async (
	userId: string,
	paperId: string,
	color: string,
	hasPermission: boolean,
	role: string,
	isConnected: boolean,
	socketId: string,
	score: number,
) => {
	await Player.updateOne(
		{ userId },
		{
			$set: {
				paperId,
				color,
				hasPermission,
				role,
				isConnected,
				socketId,
				score,
			},
		},
		{ upsert: true },
	)
}

export const updateScore = async (
	userId: string,
	paperId: string,
	score: number,
) => {
	await Player.updateOne({ userId, paperId }, { $inc: { score } })
}
