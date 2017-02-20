
/**
 * Publish-subscribe patern composite
 *
 * @param {object} object to append the composite onto
 */
export default (object) => {
    let topics = {},
        uid = -1;

    // TODO: add a check, that the wanted methodnames are not used

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
     * @return {object} object
     */
    object.unsubscribe = (topicindex) => {
        for (var h in topics) {
            if (topics.hasOwnProperty(h)) {
                for (var i = 0; i < topics[h].queue.length; i++) {
                    if (topics[h].queue[i].uid === topicindex) {
                        topics[h].queue[i] = null;
                        return topicindex;
                    }
                }
            }
        }

        return object;
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
            item.callback.apply(scope, args || []);
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
