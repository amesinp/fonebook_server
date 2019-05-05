export default (app) => {
    app.get('/api', (req, res, next) => {
        res.status(200).json({ message: "Default API route" });
    });
}