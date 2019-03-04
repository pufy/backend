import { OnModuleInit } from '@nestjs/common';
import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
  } from '@nestjs/websockets';

import { InjectEventEmitter } from 'nest-emitter';
import { QueueEmitter } from '../events/queue.event';
import { QueueService } from '../queue.service'
  
@WebSocketGateway({ namespace: 'queue' })
export class QueueGateway implements OnModuleInit {

  @WebSocketServer() server;

	constructor(
			@InjectEventEmitter() private readonly emitter: QueueEmitter,
			private queueService: QueueService
	){}

	onModuleInit() {
		this.emitter.on("queue_add", async data => await this.onQueueAdd(data));
	}
	
	private async onQueueAdd(data) {
		this.server.emit(`queue:${data.placeId}`, data.track);
	}

	async handleConnection(client) {
		let placeId = client.handshake.query.place;
		client.emit(`queue:${placeId}`, await this.queueService.getQueueByPlace(placeId))
  }
}