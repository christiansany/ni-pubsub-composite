# ni-pubsub-composite

Composite function to add the [publish–subscribe pattern](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) to an object.

## Install

### npm
```sh
$ npm install ni-pubsub-composite --save
```

## Usage

```js
// Import the Module
import pubsubComposite from 'ni-pubsub-composite'

// Create an object or have one already
const someObject = {};

// Add publish–subscribe pattern to object
pubsubComposite(someObject);

```

## API

* [.subscribe(topic, callback, [once])](#PubSub+subscribe) ⇒ <code>number</code>
* [.subscribeOnce(topic, callback)](#PubSub+subscribeOnce) ⇒ <code>number</code>
* [.publish(topic, [data])](#PubSub+publish) ⇒ <code>boolean</code>
* [.publishSync(topic, [data])](#PubSub+publishSync) ⇒ <code>boolean</code>
* [.unsubscribe(topic)](#PubSub+unsubscribe) ⇒ <code>boolean</code> &#124; <code>string</code>
* [.unsubscribeAll()](#PubSub+unsubscribeAll) ⇒ <code>[PubSub](#PubSub)</code>
* [.hasSubscribers([topic])](#PubSub+hasSubscribers) ⇒ <code>Boolean</code>
* [.subscribers()](#PubSub+subscribers) ⇒ <code>object</code>
* [.alias(aliasMap)](#PubSub+alias) ⇒ <code>[PubSub](#PubSub)</code>

<a name="new_PubSub_new"></a>

### new PubSub()
Creates a PubSub instance.

<a name="PubSub+subscribe"></a>

### pubSub.subscribe(topic, callback, [once]) ⇒ <code>number</code>
Subscribe to events of interest with a specific topic name and a
callback function, to be executed when the topic/event is observed.

**Kind**: instance method of <code>[PubSub](#PubSub)</code>
**Returns**: <code>number</code> - The topic's token
**this**: <code>{PubSub}</code>

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| topic | <code>string</code> |  | The topic's name |
| callback | <code>function</code> |  | Callback function to execute on event, taking two arguments:        - {*} data The data passed when publishing an event        - {object} The topic's info (name & token) |
| [once] | <code>boolean</code> | <code>false</code> | Checks if event will be triggered only one time |

**Example**
```js
var pubsub = new PubSub();

var onUserAdd = pubsub.subscribe('user_add', function (data, topic) {
  console.log('User added');
  console.log('user data:', data);
});
```
<a name="PubSub+subscribeOnce"></a>

### pubSub.subscribeOnce(topic, callback) ⇒ <code>number</code>
Subscribe to events of interest setting a flag
indicating the event will be published only one time.

**Kind**: instance method of <code>[PubSub](#PubSub)</code>
**Returns**: <code>number</code> - The topic's token
**this**: <code>{PubSub}</code>

| Param | Type | Description |
| --- | --- | --- |
| topic | <code>string</code> | The topic's name |
| callback | <code>function</code> | Callback function to execute on event, taking two arguments:        - {*} data The data passed when publishing an event        - {object} The topic's info (name & token) |

**Example**
```js
var onUserAdd = pubsub.subscribeOnce('user_add', function (data, topic) {
  console.log('User added');
  console.log('user data:', data);
});
```
<a name="PubSub+publish"></a>

### pubSub.publish(topic, [data]) ⇒ <code>boolean</code>
Publishes a topic, passing the data to its subscribers.

**Kind**: instance method of <code>[PubSub](#PubSub)</code>
**Returns**: <code>boolean</code> - Returns `true` if topic exists and event is published; otheriwse `false`
**this**: <code>{PubSub}</code>

| Param | Type | Description |
| --- | --- | --- |
| topic | <code>string</code> | The topic's name |
| [data] | <code>\*</code> | The data to be passed to its subscribers |

**Example**
```js
pubsub.publish('user_added', [{
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@gmail.com'
}]);
```

<a name="PubSub+unsubscribe"></a>

### pubSub.unsubscribe(topic) ⇒ <code>boolean</code> &#124; <code>string</code>
Unsubscribes from a specific topic, based on the topic name,
or based on a tokenized reference to the subscription.

**Kind**: instance method of <code>[PubSub](#PubSub)</code>
**Returns**: <code>boolean</code> &#124; <code>string</code> - Returns `false` if `topic` does not match a subscribed event; otherwise the topic's name
**this**: <code>{PubSub}</code>

| Param | Type | Description |
| --- | --- | --- |
| topic | <code>string</code> &#124; <code>number</code> | Topic's name or subscription reference |

**Example**
```js
// Unsubscribe using the topic's name.
pubsub.unsubscribe('user_add');

// Unsubscribe using a tokenized reference to the subscription.
pubsub.unsubscribe(onUserAdd);
```
<a name="PubSub+unsubscribeAll"></a>

### pubSub.unsubscribeAll() ⇒ <code>[PubSub](#PubSub)</code>
Clears all subscriptions whatsoever.

**Kind**: instance method of <code>[PubSub](#PubSub)</code>
**Returns**: <code>[PubSub](#PubSub)</code> - The PubSub instance.
**this**: <code>{PubSub}</code>
**Example**
```js
var pubsub = new PubSub();
...
...
pubsub.unsubscribeAll();
```
<a name="PubSub+hasSubscribers"></a>

### pubSub.hasSubscribers([topic]) ⇒ <code>Boolean</code>
Checks if there are subscribers for a specific topic.
If `topic` is not provided, checks if there is at least one subscriber.

**Kind**: instance method of <code>[PubSub](#PubSub)</code>
**Returns**: <code>Boolean</code> - Returns `true` there are subscribers; otherwise `false`
**this**: <code>{PubSub}</code>

| Param | Type | Description |
| --- | --- | --- |
| [topic] | <code>String</code> | The topic's name to check |

**Example**
```js
var pubsub = new PubSub();
pubsub.on('message', function (data) {
  console.log(data);
});

pubsub.hasSubscribers('message');
// -> true
```
<a name="PubSub+subscribers"></a>

### pubSub.subscribers() ⇒ <code>object</code>
Gets all the subscribers as a set of key value pairs that represent the topic's name and the event listener(s) bound.

**Kind**: instance method of <code>[PubSub](#PubSub)</code>
**Returns**: <code>object</code> - A readonly object with all subscribers.
**this**: <code>{PubSub}</code>
**Example**
```js
var pubsub = new PubSub();

pubsub.subscribe('message', listener);
pubsub.subscribe('message', listener);
pubsub.subscribe('another_message', listener);

pubsub.subscribers();
// -> Object { message: Array[2], another_message: Array[1] }
```
<a name="PubSub+alias"></a>

### pubSub.alias(aliasMap) ⇒ <code>[PubSub](#PubSub)</code>
Creates aliases for public methods.

**Kind**: instance method of <code>[PubSub](#PubSub)</code>
**Returns**: <code>[PubSub](#PubSub)</code> - The PubSub instance.
**this**: <code>{PubSub}</code>

| Param | Type | Description |
| --- | --- | --- |
| aliasMap | <code>object</code> | A plain object that maps the public methods to their aliases. |

**Example**
```js
var pubsub = new PubSub().alias({
  subscribe: 'on',
  subscribeOnce: 'once',
  publish: 'trigger',
  publishSync: 'triggerSync',
  unsubscribe: 'off',
  hasSubscribers: 'has'
});
```
