# Notes: Network Requests

A web app such as the Odoo web client would not be very useful if it was unable
to talk to the server. Loading data and calling model methods from the browser
is a very common need.

Roughly speaking, there are two different kind of requests:

- calling a controller (an arbitrary route)
- calling a method on a model (`/web/dataset/call_kw/some_model/some_method`). This
  will call the python code from the corresponding method, and return the result.

In odoo these two kind of requests are done with `XmlHTTPRequest`s, in `jsonrpc`.

## Calling a method on a model (orm service)

Let us first see the most common request: calling a method on a model. This is
usually what we need to do.

There is a service dedicated to do just that: `orm_service`, located in `core/orm_service.js`
It provides a way to call common model methods, as well as a generic `call` method:

```js
setup() {
    this.orm = useService("orm");
    onWillStart(async () => {
        // will read the fields 'id' and 'descr' from the record with id=3 of my.model
        const data = await this.orm.read("my.model", [3], ["id", "descr"]);
        // ...
    });
}
```

Here is a list of its various methods:

- `create(model, records, kwargs)`
- `nameGet(model, ids, kwargs)`
- `read(model, ids, fields, kwargs)`
- `readGroup(model, domain, fields, groupby, kwargs)`
- `search(model, domain, kwargs)`
- `searchRead(model, domain, fields, kwargs)`
- `searchCount(model, domain, kwargs)`
- `unlink(model, ids, kwargs)`
- `webReadGroup(model, domain, fields, groupby, kwargs)`
- `webSearchRead(model, domain, fields, kwargs)`
- `write(model, ids, data, kwargs)`

Also, in case one needs to call an arbitrary method on a model, there is:

- `call(model, method, args, kwargs)`

Note that the specific methods should be preferred, since they can perform some
light validation on the shape of their arguments.

## Calling a controller (rpc service)

Whenever we need to call a specific controller, we need to use the (low level)
`rpc` service. It only exports a single function that perform the request:

```
rpc(route, params, settings)
```

Here is a short explanation on the various arguments:

- `route` is the target route, as a string. For example `/myroute/`
- `params`, optional, is an object that contains all data that will be given to the controller
- `settings`, optional, for some advance control on the request (make it silent, or
  using a specific xhr instance)

For example, a basic request could look like this:

```js
setup() {
    this.rpc = useService("rpc");
    onWillStart(async () => {
        const result = await this.rpc("/my/controller", {a: 1, b: 2});
        // ...
    });
}
```
