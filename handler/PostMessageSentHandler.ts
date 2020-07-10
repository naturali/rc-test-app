import {
    IHttp,
    IHttpRequest,
    IModify,
    IPersistence,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { IApp } from '@rocket.chat/apps-engine/definition/IApp';
import { ILivechatMessage } from '@rocket.chat/apps-engine/definition/livechat';
// import { createHttpRequest } from '../lib/http';

export class PostMessageSentHandler {
    constructor(private readonly app: IApp,
                private readonly message: ILivechatMessage,
                private readonly read: IRead,
                private readonly http: IHttp,
                private readonly persis: IPersistence,
                private readonly modify: IModify) {}

    public async run() {
        const { text, editedAt, room, token, sender, visitor } = this.message;
        console.log('========================message sent============================');
        console.log('text:');
        console.log(text);
        console.log('editedAt:');
        console.log( editedAt);
        console.log('room:');
        console.log(room);
        console.log('token:');
        console.log(token);
        console.log('sender:');
        console.log(sender);
        console.log('sender roles');
        console.log(sender.roles);
        console.log('visitor');
        console.log(visitor);
        console.log('================================================================');

        const visitorToken = visitor && visitor.token;
        const url = `https://xxx/${visitorToken}`;
        const httpRequestContent: IHttpRequest = createHttpRequest(
            { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            { message: text },
        );

        const response = await this.http.post(url, httpRequestContent);
        console.log('Message sent:%s', JSON.stringify(response, undefined, 2));
        return response;
    }
}

const createHttpRequest = (headers, data) => {
    return {
        headers: {
            ...headers,
        },
        data: {
            ...data,
        },
    };
};
