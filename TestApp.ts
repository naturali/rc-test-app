import {
    IAppAccessors,
    IHttp,
    ILogger,
    IModify,
    IPersistence,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import {
    ILivechatMessage,
    ILivechatRoom ,
    IPostLivechatRoomClosed,
} from '@rocket.chat/apps-engine/definition/livechat';
import { IPostMessageSent } from '@rocket.chat/apps-engine/definition/messages';

import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { PostMessageSentHandler } from './handler/PostMessageSentHandler';
import { PostRoomDeletedHandler } from './handler/PostRoomDeletedHandler';

export class TestApp extends App implements IPostMessageSent, IPostLivechatRoomClosed {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    public async executePostMessageSent(
        message: ILivechatMessage,
        read: IRead,
        http: IHttp,
        persis: IPersistence,
        modify: IModify): Promise<void> {
        const handler = new PostMessageSentHandler(this, message, read, http, persis, modify);
        await handler.run();
    }

    public async executePostLivechatRoomClosed(
        room: ILivechatRoom,
        read: IRead,
        http: IHttp,
        persistence: IPersistence): Promise<void> {
            const handler = new PostRoomDeletedHandler(room, read, http, persistence);
            await handler.run();
    }
}
