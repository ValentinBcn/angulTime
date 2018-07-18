import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ChatService } from './chatService';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { RouterModule, Routes } from '@angular/router';
import { UserPageComponent } from './user-page/user-page.component';



const appRoutes: Routes = [
  {path: '', component: AppComponent},
  {path: 'admin', component: AdminPageComponent},
  {path: 'user', component: UserPageComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    AdminPageComponent,
    UserPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
