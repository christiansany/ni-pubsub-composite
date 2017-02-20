
/**
 * Publish-subscribe pattern composite
 *
 * @param {object} object to append the composite onto
 */
export default (object) => {
    const topics = {};
    const reservedKeys = [
        'subscribe',
        'unsubscribe',
        'unsubscribeAll',
        'publish',
        'subscribers'
    ];
    let uid = -1;

    // Fail initiation when a reserved key is already in use
    reservedKeys.forEach((value) => {
        if (object.hasOwnProperty(value)) {
            throw new Error('Can\'t apply composite, because a reserved key \'' + value + '\' is already in use', object);
        }
    });

    /**
     * Add a subscription
     *
     * @param {string} topic identifyer
     * @param {function} callback to add
     * @param {boolean} once if true, removes subscription after the callback call
     * @return {object} topicindex. unique id.
     */
    object.subscribe = (topic, callback, once) => {
        once = once || false;

        if (typeof topic !== 'string' || topic === '') {
            throw new Error('Given \'topic\' must be a of type \'string\' and can\'t be empty');
        }

        if (typeof callback !== 'function') {
            throw new Error('Given \'callback\' must be of type \'function\'');
        }

        if(typeof once !== 'boolean') {
            throw new Error('Given \'once\' must be of type \'boolean\'');
        }

        if (!topics[topic]) {
            topics[topic] = {queue: []};
        }

        // Add the callback to queue
        uid++;
        topics[topic].queue.push({
            uid: uid,
            callback: callback,
            once: once
        });

        return uid;
    };

    /**
     * Remove a subscription
     *
     * @param {integer} topicindex of the topic to be removed
     * @return {integer|boolean} topicindex, returns false if no index is found
     */
    object.unsubscribe = (topicindex) => {
        for (var h in topics) {
            if (topics.hasOwnProperty(h)) {
                for (var i = 0; i < topics[h].queue.length; i++) {
                    if (typeof topics[h].queue[i] === 'object' && topics[h].queue[i].hasOwnProperty('uid') && topics[h].queue[i].uid === topicindex) {
                        topics[h].queue[i] = null;
                        return topicindex;
                    }
                }
            }
        }

        return false;
    };

    /**
     * Remove all subscriptions
     *
     * @return {object} object
     */
    object.unsubscribeAll = () => {
        for (var h in topics) {
            if (topics.hasOwnProperty(h)) {
                for (var i = 0; i < topics[h].queue.length; i++) {
                    topics[h].queue[i] = null;
                }
            }
        }

        return object;
    };

    /**
     * Fire all callbacks from given topic
     *
     * @param {string} topic identifier
     * @param {array} args to be given the callback function
     * @param {any} scope for the callback. Default scope ist the given object.
     */
    object.publish = (topic, args, scope) => {
        scope = scope || object;

        // If the topic doesn't exist, or there's no listeners in queue, just return
        if (!topics[topic] || !topics[topic].queue.length) {
            return;
        };

        // Cycle through topics queue, fire!
        var items = topics[topic].queue;
        items.forEach((item) => {

            // Removed subscriptions are still in the array, but not an object
            if (typeof item === 'object') {

                // If subscriber should only be executed once, and the return of the callback is not false, the subscription will be removed
                if (item.callback.apply(scope, args || []) !== false && item.once === true) {
                    object.unsubscribe(item.uid);
                }
            }
        });
    };

    /**
     * Returns all subscribers
     *
     * @return {object} subscribers
     */
    object.subscribers = () => {
        const subscribers = {};

        for (var h in topics) {
            if (topics.hasOwnProperty(h)) {
                subscribers[h] = topics[h].queue;
            }
        }

        return subscribers;
    };
};
