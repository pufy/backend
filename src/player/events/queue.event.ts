import { EventEmitter } from 'events';
import { StrictEventEmitter } from 'nest-emitter';

interface QueueEvents {
  queue: (queue: any) => void;
  newRequest: (req: Express.Request) => void;
}

export type QueueEmitter = StrictEventEmitter<EventEmitter, QueueEvents>;