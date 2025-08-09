import prismaClient from "db/client";

Bun.serve({
    port: 8081,
    fetch(req, server) {
      if (server.upgrade(req)) {
        return; 
      }
      return new Response("Upgrade failed", { status: 500 });
    },
    websocket: {
        async message(ws, message) {
            await prismaClient.user.create({
                data: {
                    name: Math.random().toString(),
                    email: Math.random().toString() + "@example.com",
                    password: Math.random().toString()
                }
            })
            ws.send(message);
        },
    },
});