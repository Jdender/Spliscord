import Event from '../interfaces/event';

const test: Event = {
    name: 'ready',
    execute(client) {
        console.log('test')
    },
}

export default test;