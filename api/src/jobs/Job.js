"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Job_instances, _Job_end, _Job_start;
Object.defineProperty(exports, "__esModule", { value: true });
class Job {
    constructor() {
        _Job_instances.add(this);
        this.id = "job";
        this.priority = 1;
        this.started_at = null;
        this.ended_at = null;
    }
    handle() {
        throw new Error(`[job:${this.id}] Handling logic has not been defined`);
    }
    onEnd() {
        __classPrivateFieldGet(this, _Job_instances, "m", _Job_end).call(this);
    }
    report(message, level = "info") {
        console[level](`[job:${this.id}] ${message}`);
    }
    run() {
        __classPrivateFieldGet(this, _Job_instances, "m", _Job_start).call(this);
        this.handle();
    }
}
exports.default = Job;
_Job_instances = new WeakSet(), _Job_end = function _Job_end() {
    this.ended_at = new Date();
    this.report(`Ended at ${this.ended_at}`);
}, _Job_start = function _Job_start() {
    this.started_at = new Date();
    this.report(`Starting at ${this.started_at}`);
};
