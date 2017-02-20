import test from 'tape';
import pubsub from '../src/index';

test('subscribe', (t) => {

    const object = {};

    pubsub(object);

    // uid starts with 0
    const uid0 = object.subscribe('topic', () => {});
    const uid1 = object.subscribe('topic', () => {});
    const uid2 = object.subscribe('topic', () => {}, true);

    if (uid0 === 0 && uid1 === 1 && uid2 === 2) {
        t.pass('Unique id is iterating up');
    }

    t.throws(() => {
        object.subscribe(123, () => {});
    }, 'Entering anything but a string as \'topic\' throws an exception');

    t.throws(() => {
        object.subscribe('', () => {});
    }, 'Entering an empty string as \'topic\' throws an exception');

    t.throws(() => {
        object.subscribe('topic', '');
    }, 'Entering anything but a function as \'callback\' throws an exception');

    t.throws(() => {
        object.subscribe('topic', () => {}, 'habibi');
    }, 'Entering anything but a boolean as \'once\' throws an exception');

    const subscribers = object.subscribers();

    if (subscribers.hasOwnProperty('topic') && Array.isArray(subscribers['topic'])) {
        t.pass('Adding a topic');

        if (subscribers['topic'].length === 3) {
            t.pass('All subscriptions added');



        } else {
            t.error('All subscriptions added');
        }

    } else {
        t.error('Adding a topic');
    }

    t.end();
});

test('unsubscribe', (t) => {
    t.end();
});

test('unsubscribeAll', (t) => {
    t.end();
});

test('publish', (t) => {
    t.end();
});

test('subscribers', (t) => {
    t.end();
});
