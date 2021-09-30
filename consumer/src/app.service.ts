import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class AppService {
  async listen(){
    const kafka = new Kafka({
      clientId: 'poc-consumer',
      brokers: ['localhost:9092']
    })
    const consumer = kafka.consumer({ groupId: 'test-group' })  
    await consumer.connect()
    await consumer.subscribe({ topic: 'meu-topico', fromBeginning: true })    
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
        })
      },
    })
  }
}
