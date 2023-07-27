import asyncio
import websockets
import json

connected = set()
listMessages = []
async def server(websocket, path):
    # Register.
    connected.add(websocket)
    try:
        async for message in websocket:
            for conn in connected:
                if  str(message) == "$_GETHIST" and conn == websocket:
                    await conn.send(f'{json.dumps(listMessages)}')
                    break
                if conn != websocket and str(message) != "$_GETHIST":
                    await conn.send(f'{message}')
                    listMessages.append(message)
    finally:
        # Unregister.
        connected.remove(websocket)
    

start_server = websockets.serve(server, "localhost", 9000)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()