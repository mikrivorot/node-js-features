const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-producer',
    brokers: ['localhost:9092']
});

const producer = kafka.producer();

producer.on('producer.disconnect', (error) => {
    console.error('Producer disconnected:', error);
});

producer.on('producer.network.request_timeout', (error) => {
    console.error('Producer network request timeout:', error);
});

const run = async () => {
    try {
        await producer.connect();
        await producer.send({
            topic: 'test-topic',
            messages: [{ value: 'Hello KafkaJS user!' }],
        });
        await producer.disconnect();
    } catch (error) {
        console.error('Error in producer:', error);
    }
}

run().catch(console.error);
