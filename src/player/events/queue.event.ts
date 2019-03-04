import { EventEmitter } from 'events';
import { StrictEventEmitter } from 'nest-emitter';

interface QueueEvents {
  queue_add: (queue: any) => void;
  newRequest: (req: Express.Request) => void;
}

export type QueueEmitter = StrictEventEmitter<EventEmitter, QueueEvents>;