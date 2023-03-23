import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Managelivestream } from '../managelivestream.module';
import { SocketioService } from '../socketio.service';
declare let $: any;
@Component({
  selector: 'app-streamchat',
  templateUrl: './streamchat.component.html',
  styleUrls: ['./streamchat.component.css']
})
export class StreamchatComponent implements OnInit {

  @Input("id") data: any;
  @Input("streamDetails") sub: any;

  constructor(public fb: FormBuilder, public api: SocketioService, public chat: Managelivestream) { }

  ngOnInit(): void {

    console.log(this.sub, this.data, "iddddd")
    if (this.data != null) {
      this.chat_now();
      this.chatmessages.patchValue({
        channel: this.sub._id
      })
      this.chat.get_old_chats(this.sub._id).subscribe((res: any) => {
        res.forEach((element: any) => {
          this.addLesson(element.text, this.sub._id == element.joinuser ? 'me' : 'others', element.userId, element.userName, element);
        });
        setTimeout(() => {
          this.scrollpage();
        }, 100)

      })
      // 
      this.api.romove_message_controls(this.sub._id).subscribe(msg => {
        console.log(msg, 'asas')
        // this.addLesson(msg.text, this.sub._id == msg.joinuser ? 'me' : 'others', msg.userId, msg.userName, msg);
        // this.scrollpage();
        let index = this.addpro.value.findIndex((addpro: any) => addpro._id === msg._id)
        if (index != -1) {
          this.addpro.removeAt(index)
        }

      });
      console.log(this.sub._id, 'asdas')
      this.api.getMessage_new_chat(this.sub._id).subscribe(msg => {
        console.log(msg, 'asas')
        this.addLesson(msg.text, this.sub._id == msg.joinuser ? 'me' : 'others', msg.userId, msg.userName, msg);
        this.scrollpage();
      });
    }
  }
  ban_user_now: any = false;
  baan_user(user: any, ban: any, remove: any) {
    this.ban_user_now = true;
    $(user).hide();
    $(remove).addClass('hide_remove')
    $(ban).show();
  }
  back_message(user: any, ban: any, remove: any) {
    this.ban_user_now = false;
    $(user).show();
    $(remove).removeClass('hide_remove')
    $(ban).hide();
  }
  remove_message(item: any) {
    console.log(item)
    this.api.romove_message(item)
  }
  ban_user_chat(user: any, ban: any, remove: any, item: any) {
    $(user).show();
    $(remove).removeClass('hide_remove')
    $(ban).hide();
    this.api.ban_user_chat(item)
  }
  chat_now() {
    if (this.data != null)
      console.log(this.data, this.sub, "iddddd")
  }
  type_message: any = new FormControl('', Validators.required);
  send_now() {
    if (this.type_message.valid) {
      // this.addLesson(this.type_message.value, "me", this.sub.uid);
      let send = {
        channel: this.chatmessages.get("channel").value,
        text: this.type_message.value,
        userId: this.sub.Uid,
        id: this.data
      }
      console.log(send, 'assad')
      console.log(this.api.send_message(send), send)
      this.type_message.reset();
      this.scrollpage();
      $("#chat-boxs").focus();
    }
  }
  chatmessages: any = this.fb.group({
    message: this.fb.array([], Validators.required),
    channel: new FormControl(),
  })
  get addpro() {
    return this.chatmessages.controls["message"] as FormArray;
  }
  addLesson(message: any, user: any, userId: any, userName: any, all: any) {
    const lessonForm = this.fb.group({
      type: user,
      text: message,
      userId: userId,
      userName: userName,
      _id: all._id,
      channel: all.channel,
      joinuser: all.joinuser
    });

    this.addpro.push(lessonForm);
  }

  scrollpage() {
    $('.contant-box ol').stop().animate({
      scrollTop: $(".contant-box").height() * 150
    }, 500);
  }


}
