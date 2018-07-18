import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chatService';



@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  usernames = []
  messageAEnvoyer: string;
  constructor(private chatService: ChatService) { }

  ngOnInit() {
     
    this.chatService.listenToUsers().subscribe((user)=>{
      this.usernames.push(user)
    }
      
    )
  }

  sendAlertTo(id: string, body: string){
    this.chatService.sendAlertToServer(id,body)
  }


}
