import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Pipe, PipeTransform, OnDestroy, DoCheck } from '@angular/core';
import { Managelivestream } from '../managelivestream.module';
import { AgorastreamingService } from '../agorastreaming.service';
import { HostserviceService } from '../hostservice.service';
import { Subscription, timer } from 'rxjs';
import { SocketioService } from '../socketio.service';
declare let $: any;
@Component({
  selector: 'app-golivestream',
  templateUrl: './golivestream.component.html',
  styleUrls: ['./golivestream.component.css']
})
export class GolivestreamComponent implements OnInit, OnDestroy, DoCheck {
  constructor(public route: ActivatedRoute, public api: Managelivestream, public stream: AgorastreamingService, public router: Router, public agora: HostserviceService, public web: SocketioService) { }

  id: any;
  token: any;
  participents: any;
  innerWidth: any;

  ngOnInit(): void {
    if (window.innerWidth < 600) {
      this.innerWidth = 'mobile'
    }
    else if (window.innerWidth > 600 && window.innerWidth < 1200) {
      this.innerWidth = 'tab'
    }
    else {
      this.innerWidth = 'lap'
    }
    console.log(this.innerWidth)
    this.route.queryParams.subscribe((params: any) => {
      this.id = params.id;
      this.get_token(this.id);

    })
    console.log(this.id, 998876867867)
    this.web.getMessage_userCount(this.id).subscribe(msg => {
      this.participents = msg
    });
    this.web.leave_live(this.id).subscribe(msg => {
      console.log(msg)
      this.leave_host();
    });
    this.get_user_participents(this.id)
    setTimeout(() => {
      // $("#local-player div").css('border-radius', "10px")
      // $("#local-player div").css('box-shadow', "0px 0px 8px rgba(0, 0, 0, 0.25)")

    }, 1500)
  }
  targetDate: any;
  streamDetails: any;
  pause_button() {
    // this.stream.pause_button();
  }
  get_token(id: any) {
    this.api.create_cloude_recording({ streamId: id }).subscribe((res: any) => {
      this.token = res;
      if (res.recoredStart == "Pending") {
        this.start_recording();
      }
    })
    this.api.get_token_details(id).subscribe((res: any) => {
      console.log(res)
      this.targetTime = res.endTime;
      this.streamDetails = res
      // this.targetDate = new Date(2023, 5, 11);
      // this.targetTime = this.targetDate.getTime();
      this.tickTock();
      res = res.temptokens;
      this.start_call_now(res, res.chennel);
      this.userId = res.Uid;
      console.log(this.token, 2131231)
      this.web.mainhost_remove_live(this.id, this.userId).subscribe(msg => {
        console.log(msg)
        this.leave_host();
      });

    })
  }
  get_user_participents(id: any) {
    this.agora.get_user_participents(id).subscribe((res: any) => {
      this.participents = res
    })
  }
  async start_call_now(res: any, channel: any) {
    this.stream.agoraServerEvents(this.stream.rtc);
    await this.stream.localUser(res.token, res.Uid, '', channel);
    this.toggle_controls();
  }

  async leave_host() {
    this.logout();
    this.agora.leave_host(this.id).subscribe((res: any) => {
      console.log(res)
    })
    this.stop_recording();
    this.countDown.unsubscribe();
    this.back_button();
  }
  async logout() {
    await this.stream.leaveCall();
    this.stream.remoteUsers = [];
  }
  ngOnDestroy(): void {
    this.logout();
    console.log("log out")
    this.agora.leave_host(this.id).subscribe((res: any) => {
      console.log(res)
    })
    this.stop_recording();
    this.countDown.unsubscribe();
  }

  ngDoCheck(): void {
    // console.log(this.countDown,'asdas')
  }
  userId: any;
  deviceId: any = '';
  switch_cam() {
    this.deviceId = this.stream.switch_cam(this.deviceId);
  }
  back_button() {
    window.history.back();
  }
  leave_subhost(uid: any) {
    let data = {
      streamId: this.streamDetails._id,
      uid: uid
    }
    this.web.leave_subhost(data)
  }

  expiered: any = false;
  expiered_message(res: any) {
    console.log(res, 'sdcss dcs ds')
    console.log()
    let ex = new Date(res.expDate).getTime() - new Date().getTime();
    setTimeout(() => {
      this.expiered = true;
      this.logout();
      this.router.navigate(['host'])
    }, ex)
  }
  recording_api: any;
  start_recording() {
    this.agora.acquire_recording(this.token._id).subscribe((acquire: any) => {
      console.log(acquire, 'acquire');
      setTimeout(() => {
        this.agora.start_recording({ ...acquire, ...{ id: this.token._id } }).subscribe((start: any) => {
          this.recording_api = start
          setTimeout(() => {
            console.log(start, 'start')
            this.agora.query_recording({ ...start, ...{ id: this.token._id } }).subscribe((query: any) => {
              console.log(query, 'query')
            })
          }, 1000)
        })
      }, 6000)
    })
  }
  stop_recording() {
    if (this.stream.remoteUsers.length == 0) {
      this.agora.stop_recording({ id: this.token._id }).subscribe((res: any) => {
        this.recording_api = res
      })
    }
  }
  targetTime: any;
  tickTock() {
    var startDate = new Date();
    var endDate = new Date(this.targetTime);
    var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    this.counter = Math.floor(seconds) + 2;
    this.countDown = timer(0, 1000).subscribe(() => --this.counter);

  }
  countDown: any;
  counter: any;
  playStatus_video: any = true;
  playStatus_audio: any = true;
  pause_play() {
    this.playStatus_video = !this.playStatus_video;
    if (this.playStatus_video) {
      this.stream.togglepause()
    }
    else {
      this.stream.togglePlay()
    }
    this.toggle_controls();
  }
  pause_play_audio() {
    this.playStatus_audio = !this.playStatus_audio;
    if (this.playStatus_audio) {
      this.stream.togglepause_audio()
    }
    else {
      this.stream.togglePlay_audio()
    }
    this.toggle_controls();
  }
  hide_chat: any = false;
  toggle_chat() {
    if (this.hide_chat) {
      this.hide_chat = false;
      $(".chat-list").fadeIn(500)
    }
    else {
      this.hide_chat = true;
      $(".chat-list").fadeOut(100)
    }
    $(".video-player").toggleClass('chat-size-increase')

  }
  toggle_controls() {
    this.web.toggle_controls({ channel: this.id, audio: this.playStatus_audio, video: this.playStatus_video })
  }
}
@Pipe({
  name: "formatTime"
})
export class FormatTimePipe implements PipeTransform {
  constructor(public router: Router,) {

  }
  transform(value: number): string {
    // console.log(value)
    const hours: number = Math.floor(value / 3600);
    const minutes: number = Math.floor((value % 3600) / 60);
    if (value > 0) {
      return (
        ("00" + hours).slice(-2) +
        ":" +
        ("00" + minutes).slice(-2) +
        ":" +
        ("00" + Math.floor(value - minutes * 60)).slice(-2)
      );
    }
    else {
      this.router.navigateByUrl('livestream')
      return (
        ("00") +
        ":" +
        ("00") +
        ":" +
        ("00")
      );
    }
  }


}
