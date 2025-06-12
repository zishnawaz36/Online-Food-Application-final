const roleBased = (...allowedroles) => {
    return (req, res, next) => {
        if (!allowedroles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        // ✅ yeh next() is condition ke bahar hona chahiye
        next();
    };
};
export default roleBased;
