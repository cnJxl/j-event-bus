let subscribers = new Map<string, any>()
/**
 * 订阅
 * @param key
 * @param callback
 * @param once
 */
const subscribe = (key: string, callback: Function, once = false) => {
    if (typeof key !== 'string' || typeof callback !== 'function') return
    subscribers.set(key, { callback, once })
}
/**
 * 订阅一个事件列表中所有事件
 * @param events
 */
const subscribeList = (events: [key: string, callback: Function, once?: boolean][] | {key: string, callback: Function, once?: boolean}[]) => {
    if (!Array.isArray(events)) return
    events.forEach(event => {
        if (!Array.isArray(event)) {
            if (typeof event !== 'object' || event === null) return
            subscribe(event.key, event.callback, Boolean(event.once))
        } else {
            subscribe(event[0], event[1], Boolean(event[2]))
        }
    })
}
/**
 * 取消订阅
 * @param keys
 */
const unsubscribe = (...keys: string[]) => {
    keys.forEach(item => {
        if (typeof item !== 'string') return
        subscribers.delete(item)
    })
}
/**
 * 清空订阅的事件
 * @example
 *  - clear()
 */
const clear = () => {
    subscribers.clear()
}
/**
 * 发送事件
 * @param key
 * @param args
 * @example
 *  - dispatch('eventName', ...[1, {name: 'Test'}, false])
 *  - dispatch('eventName', 1)
 */
const dispatch = (key: string, ...args: any[]) => {
    if (typeof key !== 'string') return
    const val = subscribers.get(key)
    if (val && val.callback) {
        val.callback(...args)
        val.once && unsubscribe(key)
    }

}
/**
 * 发送一个事件列表中的所有事件
 * @param events
 * @example
 *  - Object:
 *  - dispatchList([{key: 'eventName', args: [1, {name: 'Text', price: '1.00'}]}, {key: 'eventName', args: 'Hahaha'}])
 *  - Array:
 *  - dispatchList([['eventName', [1, {name: 'Text', price: '1.00'}]], ['eventName2', false]])
 */
const dispatchList = (events: [string, any[] | any][]|{key: string, args: any[] | any}[]) => {
    if (!Array.isArray(events)) return
    events.forEach(event => {
        if (!Array.isArray(event)) {
            if (typeof event !== 'object' || event === null) return
            if (Array.isArray(event.args)) dispatch(event.key, ...event.args)
            else dispatch(event.key, event.args)
        } else {
            if (Array.isArray(event[1])) dispatch(event[0], ...event[1])
            else dispatch(event[0], event[1])
        }
    })
}

/**
 * EventBus
 */
export function useEventBus() {
    return { subscribe, subscribeList, unsubscribe, clear, dispatch, dispatchList }
}
