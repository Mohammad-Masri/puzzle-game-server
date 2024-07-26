import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { ChangeCellMessage } from './dto';
import { GameService } from 'src/services/game.service';

@WebSocketGateway({
  namespace: 'events',
  transports: ['websocket', 'polling'],
  cors: {
    origin: '*',
  },
})
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('GameGateway');

  constructor(private gameService: GameService) {}

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    client.join(client.id);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('change-cell')
  handleMessage(
    @MessageBody() data: ChangeCellMessage,
    @ConnectedSocket() client: Socket,
  ) {
    this.gameService.updateGameCell(data.gameId, data.i, data.j, data.value);

    this.server.to(client.id).emit('change-cell-result', {
      done: true,
    });
  }
}
