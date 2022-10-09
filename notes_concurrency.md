# Notes: Concurrency

Concurrency is a huge topic in web application: a network request is asynchronous,
so there are a lot of issues/situations that can arises. One need to be careful
when writing asynchronous code.

Roughly speaking, there are two things that we should consider:

- writing efficient code, meaning that we want to parallelize as much as possible.
  Doing 3 requests sequentially takes longer than doing them in parallel
- writing robust code: at each moment, the internal state of the application
  should be consistent, and the resulting UI should match the user expectation,
  regardless of the order in which requests returned (remember that a request
  can take an arbitrary amount of time to return)

## Parallel versus sequential

Let's talk about efficiency. Assume that we need to load from the server two
(independant) pieces of information. We can do it in two different ways:

```js
async sequentialLoadData() {
    const data1 = await loadData1();
    const data2 = await loadData2();
    // ...
}

async parallelLoadData() {
    const [data1, data2] = await Promise.all([loadData1(), loadData2()]);
    // ...
}

```

The difference will be visible in the network tab: either the requests are fired
sequentially, or in parallel. Obviously, if the two requests are independant,
it is better to make them in parallel. If they are dependant, then they have to
be done sequentially:

```js
async sequentialDependantLoadData() {
    const data1 = await loadData1();
    const data2 = await loadData2(data1);
    // ...
}
```

Note that this has implications for the way we design (asynchronous) components:
each component can load its data with an asynchronous `onWillStart` method. But
since a child component is only rendered once its parent component is ready, this
means that all `onWillStart` will run sequentially. As such, there should ideally
only ever be one or two levels of components that load data in such a way. Otherwise,
you end up with a loading cascade, which can be slow.

A way to solve these issues may be to write a controller or a python model method to
gather all the data directly, so it can be loaded in a single round-trip to the
server.

## Avoiding corrupted state

A common concurrency issue is to update the internal state in a non atomic way.
This results in a period of time during which the component is inconsistent, and
may misbehave or crash if rendered. For example:

```js
async incorrectUpdate(id) {
    this.id = id;
    this.data = await loadRecord(id);
}
```

In the above example, the internal state of the component is inconsistent while
the load request is ongoing: it has the new `id`, but the `data` is from the
previous record. It should be fixed by updating the state atomically:

```js
async correctUpdate(id) {
    this.data = await loadRecord(id);
    this.id = id;
}
```

## Mutex

As we have seen, some operations have to be sequential. But in practice, actual
code is often hard to coordinate properly. An UI is active all the time, and various
updates can be done (almost) simultaneously, or at any time. In that case, it can become difficult to maintain integrity.

Let us discuss a simple example: imagine a `Model` that maintains the state of
a record. The user can perform various actions:

- update a field, which triggers a call to the server to apply computed fields (`onchange`),
- save the record, which is a call to the server `save` method,
- go to the next record

So, what happens if the user update a field, then clicks on save while the onchange is ongoing?
We obviously want to save the record with the updated value, so the code that
perform the save operation need to wait for the return of the onchange.

Another similar scenario: the user save the record, then go to the next record.
In that case, we also need to wait for the save operation to be completed before
loading the next record.

If you think about it, it becomes quickly difficult to coordinate all these
operations. Even more so when you add additional transformations (such as updating
relational fields, loading other data, grouping data, drilling down in some groups,
folding columns in kanban view, ...)

Many of these interactions can be coordinated with the help of a `Mutex`: it is
basically a queue which wait for the previous _job_ to be complete before executing
the new one. So, here is how the above example could be modelled (in pseudo-code):

```js
import { Mutex } from "@web/core/utils/concurrency";

class Model {
    constructor() {
        this.mutex = new Mutex();
    }
    update(newValue) {
        this.mutex.exec(async () => {
            this.state = await this.applyOnchange(newValue);
        });
    }
    save() {
        this.mutex.exec(() => {
            this._save();
        });
    }
    _save() {
        // actual save code
    }
    openRecord(id) {
        this.mutex.exec(() => {
            this.state = await this.loadRecord(id)
        });
    }
}
```

## KeepLast

As seen above, many user interactions need to be properly coordinated. Let us
imagine the following scenario: the user selects a menu in the Odoo web client.
Just after, the user changes her/his mind and select another menu. What should
happen?

If we don't do anything, there is a risk that the web client displays either of
the action, then switch immediately to the other, depending on the order in which
the requests ends.

We can solve this by using a mutex:

```js
// in web client

selectMenu(id) {
    this.mutex.exec(() => this.loadMenu(id));
}
```

This will make it determinist: each action from the user will be executed, then
the next action will take place. However, this is not optimal: we
probably want to stop (as much as possible) the first action, and start immediately
the new action, so the web client will only display the second action, and will
do it as fast as possible.

This can be done by using the `KeepLast` primitive from Odoo: it is basically
like a Mutex, except that it cancels the current action, if any (not really
cancelling, but keeping the promise pending, without resolving it). So, the
code above could be written like this:

```js
import { KeepLast } from "@web/core/utils/concurrency";
// in web client

class WebClient {
  constructor() {
    this.keepLast = new KeepLast();
  }

  selectMenu(id) {
    this.keepLast.add(() => this.loadMenu(id));
  }
}
```
