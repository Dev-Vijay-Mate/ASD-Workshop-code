const cacheService = require('../services/cacheService');

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl;
    const cachedData = cacheService.getCache(key);

    if (cachedData !== undefined) {
        res.set('X-Cache', 'HIT');
        return res.json(cachedData);
    }
    req.cacheKey = key;
    res.set('X-Cache', 'MISS');
    next();
}

module.exports = cacheMiddleware;
