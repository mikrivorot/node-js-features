const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-consumer',
    brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'test-group' });

consumer.on('consumer.crash', (error) => {
    console.error('Consumer crashed:', error);
});

consumer.on('consumer.network.request_timeout', (error) => {
    console.error('Consumer network request timeout:', error);
});

const run = async () => {
    try {
        await consumer.connect();
        await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log({
                    partition,
                    offset: message.offset,
                    value: message.value.toString(),
                });
            },
        });
    } catch (error) {
        console.error('Error in consumer:', error);
    }
}

run().catch(console.error);
