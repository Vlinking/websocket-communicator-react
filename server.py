import asyncio
import websockets
import random


connected_users = set()


class AnonymousUser:
    """
    Class that stores a connection handle and a randomly generated string username.
    Because I can.
    """
    ANON_USERNAME_PREFIX = "Anon_"
    ANON_USERNAME_RANGE_LOW = 100000
    ANON_USERNAME_RANGE_HIGH = 1000000

    def __init__(self, connection):
        self.connection = connection
        self.username = self.ANON_USERNAME_PREFIX + str(random.randint(
            self.ANON_USERNAME_RANGE_LOW,
            self.ANON_USERNAME_RANGE_HIGH
        ))

    def receive(self):
        return self.connection.recv()

    def send(self, sender, message):
        return self.connection.send("{0}: {1}".format(sender.username, message))


async def consumer_handler(anon_user):
    global connected_users
    while True:
        message = await anon_user.receive()
        await asyncio.wait([user.send(anon_user, message) for user in connected_users if anon_user is not user])


async def register_handler(websocket, path):
    """
    Send message to every client for now.
    """
    global connected_users
    anon_user = AnonymousUser(websocket)
    connected_users.add(anon_user)
    try:
        await(consumer_handler(anon_user))
    finally:
        connected_users.remove(anon_user)



if __name__ == "__main__":
    # our main event loop
    start_server = websockets.serve(register_handler, 'localhost', 8765)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()