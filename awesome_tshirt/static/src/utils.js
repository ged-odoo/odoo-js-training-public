/** @odoo-module **/

const { onMounted, onWillUnmount, useRef } = owl;

export function useInterval(func, ms) {
    let intervalId;
    onMounted(() => {
        intervalId = setInterval(func, ms);
    });

    onWillUnmount(() => {
        clearInterval(intervalId);
    });
}

export function useAutofocus(name) {
    const ref = useRef(name);
    onMounted(() => ref.el && ref.el.focus());
}
