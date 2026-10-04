export default () => ({
    port: process.env.PORT,
    db: {
        url: process.env.DB_URL,
        username: process.env.DB_USER_NAME,
        password: process.env.PASSWORD,
    },
    tokenAccess: {},
    cloud: {
        apiKey: process.env.CLOUDINARY_API_KEY,
    },
    email: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    access: {
        jwt_secret: process.env.JWT_SECRET,
    },
});
