import adminRouter from './admin';
import appRouter from './app';

export default (app) => {
    'use strict';

    app.get('/api', (req, res, next) => {
        res.status(200).json({ message: "Default API route" });
    });

    app.use('/api/admin', adminRouter);

    app.use('/api', appRouter);
}