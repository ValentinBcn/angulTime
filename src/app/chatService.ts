import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { Observable } from 'rxjs';


@Injectable()
export class ChatService {
  private socket: SocketIOClient.Socket = io();

  constructor() {
    
  }

  askToUser(){
    this.socket.emit('askToUser', "lol")
  }
  toServer(data: string){
      this.socket.emit('derange',data)
  }
 
  sendUsername(username: string){
    this.socket.emit('username',username)
  }
  
  
  listenToData(){
    let observable = new Observable<string>(observer=>{
      this.socket.on('message',data=>{
        observer.next(data)
      })
    })
    return observable;
  }

  listenToUsers(){
    let observable = new Observable<string>(observer=>{
      this.socket.on('addUser', user=>{
        observer.next(user)
      })
    })
    return observable
  }

  sendAlertToServer(_id, _body){
    this.socket.emit('alertTo', {id: _id, body: _body})
  }

  listenToAlert(){
    let observable = new Observable<string>(observer=>{
      this.socket.on('alertToMe', msg=>{
        observer.next(msg)
      })
    })
   return observable
  }
}
