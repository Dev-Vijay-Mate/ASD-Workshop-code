const cache = new Map();

const TTL = 60 * 1000;

function getCache(key) {
    const entry = cache.get(key);

    if (!entry) {
        return undefined;
    }

    const currentTime = Date.now();
    const age = currentTime - entry.createdAt;

    if (age > TTL) {
        cache.delete(key);
        return undefined;
    }

    return entry.data;
}

function setCache(key, data) {
    cache.set(key, {
        data: data,
        createdAt: Date.now()
    });
}

function clearCache() {
    cache.clear();
}

module.exports = {
    getCache,
    setCache,
    clearCache
};