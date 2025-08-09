import express from 'express';
import prisma from 'db/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'yy3uy3y8y8uhjehfegfy32ry9euqdjehfbiq927r932yr9';
export default JWT_SECRET;

function authenticateToken(req: any, res: any, next: any) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: "Access token is required" });
    }
    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
            return res.status(403).json({ error: "Invalid token" });
        }

        req.userId = decoded.userId;
        next();
    });
}

app.post("/todos", authenticateToken, async (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: "Title are required" });
    }
    if (!req.userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const todo = await prisma.todo.create({
            data: {
                title,
                userId: req.userId
            }
        });
        res.status(201).json(todo);
    } catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/todos", authenticateToken, async (req, res) => {
    if (!req.userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const todos = await prisma.todo.findMany({
            where: { userId: req.userId }
        });
        res.json(todos);
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Name, email, and password are required" });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token
        });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token
        });
    }
    catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});