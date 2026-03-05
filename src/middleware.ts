import { Elysia } from "elysia";
import { openapi } from "@elysiajs/openapi";

const app = new Elysia()
    .use(openapi());
    // Global Logger
    app.onRequest(({ request }) => {
        console.log("📥", request.method, request.url);
        console.log("🕒", new Date().toISOString());
    }
);

app.get("/", () => "Hello Middleware");

app.get("/admin", () => {
    return {
        stats: 99
    };
}, {
beforeHandle({ headers, set }) {
    if (headers.authorization !== "Bearer 123") {
        set.status = 401;
        return {
            success: false,
            message: "Unauthorized"
        };
    }}
});

app.get("/profile", () => {
    return {
        name: "Nama kamu"
    };
}, {
afterHandle({ response }) {
    return {
        success: true,
        data: response
    };
}
});

app.listen(3000);
console.log("Server running at http://localhost:3000");