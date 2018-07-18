import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chatService';
import { Observable } from 'rxjs';
import * as $ from 'jquery';
import Push from 'push.js'

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  title: string;
  messageAffiche: string;
  messageEnvoie: string
  userName: string;
  alert: string
  constructor(private chatService: ChatService) { }

  ngOnInit() {
 
  
    this.userName = prompt('quel est votre nom ?');
    this.chatService.sendUsername(this.userName);
    this.chatService.listenToData().subscribe(res=>{
      console.log('je recois',res),
      // this.messageAffiche = res;
      $("ol").append("<li>" + res + "</li>")
    })

    this.chatService.listenToAlert().subscribe(res=>{
      console.log('res', res),
      Push.create(res['body']);
    })
  }

  sendToServer(){
    $("ol").append('<li class="line-text"> <b>' + this.messageEnvoie + '</b></li>')
    //this.messageAffiche = this.messageEnvoie;
    this.chatService.toServer(this.messageEnvoie)
    this.messageEnvoie = ''
  }

 
}
