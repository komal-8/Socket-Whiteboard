import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization;

    // Check if token is present
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: Token missing" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, 'fdufgbrftiir767846');

        // Attach the user data to the request object
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
};
