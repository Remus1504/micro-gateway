import { config } from '../configuration';
import { GatewayCache } from '../RedisCache/GatewayCache';
import {
  IMessageDocument,
  IEnrolmentDocument,
  IEnrolmentNotifcation,
  winstonLogger,
} from '@remus1504/micrograde';
import { Server, Socket } from 'socket.io';
import { io, Socket as SocketClient } from 'socket.io-client';
import { Logger } from 'winston';

const log: Logger = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  'gatewaySocket',
  'debug',
);
let chatSocketClient: SocketClient;
let enrolmentrSocketClient: SocketClient;

export class SocketIOAppHandler {
  private io: Server;
  private gatewayCache: GatewayCache;

  constructor(io: Server) {
    this.io = io;
    this.gatewayCache = new GatewayCache();
    this.chatSocketServiceIOConnections();
    this.orderSocketServiceIOConnections();
  }

  public listen(): void {
    this.chatSocketServiceIOConnections();
    this.orderSocketServiceIOConnections();
    this.io.on('connection', async (socket: Socket) => {
      socket.on('getLoggedInUsers', async () => {
        const response: string[] =
          await this.gatewayCache.getLoggedInUsersFromCache('loggedInUsers');
        this.io.emit('online', response);
      });

      socket.on('loggedInUsers', async (username: string) => {
        const response: string[] =
          await this.gatewayCache.saveLoggedInUserToCache(
            'loggedInUsers',
            username,
          );
        this.io.emit('online', response);
      });

      socket.on('removeLoggedInUser', async (username: string) => {
        const response: string[] =
          await this.gatewayCache.removeLoggedInUserFromCache(
            'loggedInUsers',
            username,
          );
        this.io.emit('online', response);
      });

      socket.on('category', async (category: string, username: string) => {
        await this.gatewayCache.saveUserSelectedCategory(
          `selectedCategories:${username}`,
          category,
        );
      });
    });
  }

  private chatSocketServiceIOConnections(): void {
    chatSocketClient = io(`${config.MESSAGE_BASE_URL}`, {
      transports: ['websocket', 'polling'],
      secure: true,
    });

    chatSocketClient.on('connect', () => {
      log.info('ChatService socket connected');
    });

    chatSocketClient.on(
      'disconnect',
      (reason: SocketClient.DisconnectReason) => {
        log.log('error', 'ChatSocket disconnect reason:', reason);
        chatSocketClient.connect();
      },
    );

    chatSocketClient.on('connect_error', (error: Error) => {
      log.log('error', 'ChatService socket connection error:', error);
      chatSocketClient.connect();
    });

    // custom events
    chatSocketClient.on('message received', (data: IMessageDocument) => {
      this.io.emit('message received', data);
    });

    chatSocketClient.on('message updated', (data: IMessageDocument) => {
      this.io.emit('message updated', data);
    });
  }

  private orderSocketServiceIOConnections(): void {
    enrolmentrSocketClient = io(`${config.ORDER_BASE_URL}`, {
      transports: ['websocket', 'polling'],
      secure: true,
    });

    enrolmentrSocketClient.on('connect', () => {
      log.info('EnrolmentService socket connected');
    });

    enrolmentrSocketClient.on(
      'disconnect',
      (reason: SocketClient.DisconnectReason) => {
        log.log('error', 'EnrolmentSocket disconnect reason:', reason);
        enrolmentrSocketClient.connect();
      },
    );

    enrolmentrSocketClient.on('connect_error', (error: Error) => {
      log.log('error', 'EnrolmentService socket connection error:', error);
      enrolmentrSocketClient.connect();
    });

    // custom event
    enrolmentrSocketClient.on(
      'enrolment notification',
      (order: IEnrolmentDocument, notification: IEnrolmentNotifcation) => {
        this.io.emit('Enrolment notification', order, notification);
      },
    );
  }
}
