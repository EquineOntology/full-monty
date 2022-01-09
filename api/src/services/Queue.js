"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Queue_instances, _Queue_jobs, _Queue_load;
Object.defineProperty(exports, "__esModule", { value: true });
class Queue {
    constructor(priority) {
        _Queue_instances.add(this);
        _Queue_jobs.set(this, []);
        this.priority = priority;
        __classPrivateFieldGet(this, _Queue_instances, "m", _Queue_load).call(this);
    }
    dump() {
        // TODO: Implement queue dump mechanism;
        console.error("Queue.dump not implemented");
    }
    size() {
        return __classPrivateFieldGet(this, _Queue_jobs, "f").length;
    }
    push(job) {
        __classPrivateFieldGet(this, _Queue_jobs, "f").push(job);
    }
    work() {
        if (this.size() === 0)
            return;
        const job = __classPrivateFieldGet(this, _Queue_jobs, "f").pop();
        if (!job)
            return;
        try {
            job.run();
        }
        catch (e) {
            console.error(e);
        }
    }
}
exports.default = Queue;
_Queue_jobs = new WeakMap(), _Queue_instances = new WeakSet(), _Queue_load = function _Queue_load() {
    // TODO: Implement queue load mechanism.
    console.error("Queue.#load not implemented");
};
