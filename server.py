import asyncio
import websockets


async def receiver(websocket, path):
    """
    Connect to server, say hello. Basic of the basics boilerplate example.
    """
    name = await websocket.recv()
    print("< {}".format(name))

    greeting = "Hello {}!".format(name)
    await websocket.send(greeting)
    print("> {}".format(greeting))


start_server = websockets.serve(receiver, 'localhost', 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()