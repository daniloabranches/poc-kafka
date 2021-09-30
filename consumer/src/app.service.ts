import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class AppService {
  private kafka = new Kafka({
    clientId: 'poc-consumer',
    brokers: ['localhost:9092']
  })
  
  private consumer = this.kafka.consumer({ groupId: 'meu-grupo' })

  private errors = []

  async listen(){  
    await this.consumer.connect()
    await this.consumer.subscribe({ topic: 'meu-topico', fromBeginning: true })    
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(`Mensagem: ${message.value.toString()}`)
        if (message.value.toString().includes('erro')){
          if (this.errors.length > 0) {
            this.errors.pop()
            return
          }
          this.errors.push(message.offset)
          throw Error('Erro ao processar a mensagem')
        }
      }
    })
  }
}
