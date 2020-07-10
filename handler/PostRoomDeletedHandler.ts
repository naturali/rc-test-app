
import { IHttp, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ILivechatRoom } from '@rocket.chat/apps-engine/definition/livechat';

export class PostRoomDeletedHandler {
    constructor(private readonly room: ILivechatRoom,
                private readonly read: IRead,
                private readonly http: IHttp,
                private readonly persis: IPersistence) {}

    public async run() {
        console.log('========================Room deleted============================');
        console.log('room:');
        console.log(this.room);
        console.log('read:');
        console.log( this.read);
        console.log('http:');
        console.log(this.http);
        console.log('persis:');
        console.log(this.persis);
        console.log('================================================================');
    }
}
