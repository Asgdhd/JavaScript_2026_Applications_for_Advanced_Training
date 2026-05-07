const cardState = new Map();


export function initCardState(courseId) {
    if (!cardState.has(courseId)) {
        cardState.set(courseId, { value: 0, promise: null });
    }
}


export function getCardValue(courseId) {
    return cardState.get(courseId)?.value ?? 0;
}


export function setCardValue(courseId, newValue) {
    if (cardState.has(courseId)) {
        cardState.get(courseId).value = newValue;
    }
}


export function startRequest1(courseId) {
    const state = cardState.get(courseId);
    if (!state) return null;

    const promise = new Promise((resolve) => {
        setTimeout(() => {
            state.value = 7;
            state.promise = null;
            resolve();
        }, 50000);
    });

    state.promise = promise;
    return promise;
}

export function startRequest2(courseId) {
    setCardValue(courseId, 4);
    return Promise.resolve();
}


export function getAllPendingPromises() {
    const promises = [];
    for (const [, state] of cardState) {
        if (state.promise) {
            promises.push(state.promise);
        }
    }
    return promises;
}


export function getTotalSum() {
    let sum = 0;
    for (const [, state] of cardState) {
        sum += state.value;
    }
    return sum;
}
