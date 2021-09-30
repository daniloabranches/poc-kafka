import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class AppService {
    async sendMessage(message: string): Promise<void> {
        const kafka = new Kafka({
            clientId: 'poc-producer',
            brokers: ['localhost:9092']
        })
        const producer = kafka.producer({
            allowAutoTopicCreation: true
        })
        await producer.connect()
        await producer.send({
            topic: 'meu-topico',
            messages: [
                { value: message }
            ]
        })
        return await producer.disconnect()
    }
}
