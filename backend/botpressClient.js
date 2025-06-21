import { Client } from '@botpress/client'
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
    token: process.env.BOTPRESS_TOKEN,
    botId: process.env.BOTPRESS_BOT_ID,
    workspaceId: process.env.BOTPRESS_WORKSPACE_ID
})


export default client
