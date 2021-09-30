import { Injectable } from '@nestjs/common';
import { Kafka, RecordMetadata } from 'kafkajs';

@Injectable()
export class AppService {
    private kafka = new Kafka({
        clientId: 'poc-producer',
        brokers: ['localhost:9092']
    })

    private producer = this.kafka.producer({
        allowAutoTopicCreation: true
    })

    async sendSingleMessage(message: string): Promise<void> {
        await this.producer.connect()
        try {
            await this.sendMessage(message)
        } catch (error) {
            console.error(error)
        }
        return await this.producer.disconnect()
    }

    async sendEndlessMessages(): Promise<void> {
        await this.producer.connect()
        let index = 0
        setInterval(async() => {
            try {
                const message = `Message ${index}`                
                await this.sendMessage(message)                
                index++
            } catch (error) {
                console.error(error)
            }            
        }, 1000)
    }

    async sendMessage(message: string): Promise<RecordMetadata[]> {
        console.log(message)
        return await this.producer.send({
            topic: 'meu-topico',
            messages: [
                { value: message }
            ]
        })
    }
}
