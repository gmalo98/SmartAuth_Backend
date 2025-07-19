const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const globalErrorHandler = require('./controller/errorController');
const AppError = require("./utils/AppError");
const userRouter =require("./routes/userRouter");
const app = express();

app.use(cookieParser());

app.use(cors({
    origin: ['http://localhost:5173','https://smartauthapp.vercel.app'],
    credentials: true,
    
}));

app.use(express.json({ limit: "10kb" }));

app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

app.use('/api/v1/users',userRouter);


app.use((req, res, next) => {
    next(new AppError(`Can't find the ${req.originalUrl} on the server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
