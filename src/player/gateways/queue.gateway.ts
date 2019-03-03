import { OnModuleInit } from '@nestjs/common';
import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
  } from '@nestjs/websockets';

import { InjectEventEmitter } from 'nest-emitter';
import { QueueEmitter } from '../events/queue.event';
import { PlayerService } from '../player.service'
  
@WebSocketGateway()
export class QueueGateway implements OnModuleInit {

  @WebSocketServer() server;

	constructor(
			@InjectEventEmitter() private readonly emitter: QueueEmitter,
			private playerService: PlayerService
	){}

	onModuleInit() {
		this.emitter.on('queue', async msg => await this.onNotification(msg));
		//this.emitter.on('newRequest', async req => await this.onRequest(req));
	}
    
	private async onNotification(queue) {
		console.log(queue);
		
		//this.server.emit(`queue:${queue.user_id}`, notification);
	}
	
	private async onRequest(req: Express.Request) {
		//console.log(`OnRequest from: ${req['ip']}`);
	}
}