import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Pipe, PipeTransform, OnDestroy, DoCheck } from '@angular/core';
import { Managelivestream } from '../managelivestream.module';
import { AgorastreamingService } from '../agorastreaming.service';
import { HostserviceService } from '../hostservice.service';
import { retry, Subscription, timer } from 'rxjs';
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
    }, 1500)

    this.stream.updateUserInfo.subscribe((res: any) => {
      if (this.streamDetails != null) {
        let index = this.streamDetails.temptokens_sub.findIndex((a: any) => a.Uid == res);

        if (index == -1) {
          this.api.get_token_details(this.id).subscribe((res: any) => {
            this.streamDetails.temptokens_sub = res.temptokens_sub;
          })
        }

      }
      if (this.tokenValues != null) {
        this.screen_view()
      }

    })
    this.stream.unpublished.subscribe((res: any) => {
      if (this.tokenValues != null) {
        this.screen_view()
      }
    })
  }
  targetDate: any;
  streamDetails: any;
  tokenValues: any;

  localvideo: any = 'medium';
  screen_view() {
    let bissize: any = this.tokenValues.bigSize;
    let biguser: any = this.tokenValues.Uid
    this.streamDetails.temptokens_sub.forEach((element: any) => {
      if (element.bigSize) {
        let index = this.stream.remoteUsers.findIndex((e: any) => e.uid == element.Uid);
        if (index != -1) {
          bissize = true;
          biguser = element.Uid;
        }
      }
    });
    console.log(bissize)
    if (bissize) {
      if (this.tokenValues.Uid == biguser) {
        this.localvideo = 'big-screen';
        let i = 1;
        this.stream.remoteUsers.forEach((a: any) => {
          let index = this.stream.remoteUsers.findIndex((e: any) => e.uid == a.uid);
          if (index != -1) {
            this.stream.remoteUsers[index].class = 'small-screen' + i;
            i++;
          }
        })
      }
      else {
        let userId = this.stream.remoteUsers.findIndex((e: any) => e.uid == biguser);
        if (userId != -1) {
          this.localvideo = 'small-screen1';
          this.streamDetails.temptokens_sub.forEach((element: any) => {
            let index = this.stream.remoteUsers.findIndex((e: any) => e.uid == element.Uid);
            if (index != -1) {
              if (biguser != element.Uid) {
                this.stream.remoteUsers[index].class = 'small-screen2';
              }
              else {
                this.stream.remoteUsers[index].class = 'big-screen';
              }
            }
          });
        }
        else {
          this.stream.remoteUsers.map((a: any) => {
            return a.class = 'medium';
          })
          this.localvideo = 'medium';
        }
      }
      console.log(this.stream.remoteUsers, '23232_2342342')
    }
    else {
      this.stream.remoteUsers.map((a: any) => {
        return a.class = 'medium';
      })
      this.localvideo = 'medium';
      console.log(this.stream.remoteUsers, '23232_2342342_SA')
    }
  }
  change_view_sub(item: any) {
    this.tokenValues.bigSize = false;
    let i = 0;
    console.log(this.streamDetails.temptokens_sub)
    this.streamDetails.temptokens_sub.forEach((element: any) => {
      if (item.Uid != element.Uid) {
        this.streamDetails.temptokens_sub[i].bigSize = false;
      }
      else {
        this.streamDetails.temptokens_sub[i].bigSize = !this.streamDetails.temptokens_sub[i].bigSize
      };
      i++;
    })
    let data = {
      streamId: this.streamDetails._id,
      uid: item.Uid,
      tokenId: item._id,
      bigSize: item.bigSize

    }
    this.web.stream_view_change(data);
    // this.screen_view();
  }
  open_menus_sub_menus: any = false;
  open_menus_sub(val: any) {
    this.open_menus_sub_menus = val
  }
  bigscreen: any = false;
  change_view() {
    this.streamDetails.temptokens_sub.map((a: any) => {
      return a.bigSize = false;
    })
    this.tokenValues.bigSize = !this.tokenValues.bigSize;
    let data = {
      streamId: this.streamDetails._id,
      uid: this.tokenValues.Uid,
      tokenId: this.tokenValues._id,
      bigSize: this.tokenValues.bigSize
    }
    this.web.stream_view_change(data);
    // this.screen_view();
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
      console.log(this.streamDetails, 2312312312312)
      // this.targetDate = new Date(2023, 5, 11);
      // this.targetTime = this.targetDate.getTime();
      this.tickTock();
      res = res.temptokens;
      this.tokenValues = res;
      this.media_controls(res);
      if (!res.mainhostLeave) {
        this.start_call_now(res, res.chennel);
      }
      this.userId = res.Uid;
      console.log(this.token, 2131231)
      this.web.mainhost_remove_live(this.id, this.userId).subscribe(msg => {
        console.log(msg)
        this.leave_host();
      });
    })
  }

  media_controls(res: any) {

    this.web.media_controls_audio(res._id, res.Uid).subscribe((res: any) => {
      console.log(res, 11231232)
      this.playStatus_audio = res.req.audio;
      this.stream.togglePlay_audio(res.req.audio)
    })

    this.web.media_controls_video(res._id, res.Uid).subscribe((res: any) => {
      console.log(res, 112312)
      this.playStatus_video = res.req.video
      this.stream.togglePlay(res.req.video)
    })
    this.web.allow_stream_controls(res._id, res.Uid).subscribe((res: any) => {
      this.tokenValues.mainhostLeave = false;
      this.start_call_now(this.tokenValues, this.tokenValues.chennel);
      this.userId = this.tokenValues.Uid;

    })
    this.web.stream_view_change_controls(res.chennel).subscribe((res: any) => {
      console.log(res, 123123)
      if (res.req.uid == this.tokenValues.Uid) {
        this.tokenValues.bigSize = res.req.bigSize;
        this.streamDetails.temptokens_sub.map((a: any) => {
          return a.bigSize = false;
        })
      }
      else {
        this.tokenValues.bigSize = false;
        let i = 0;
        this.streamDetails.temptokens_sub.forEach((element: any) => {
          if (res.req.uid != element.Uid) {
            this.streamDetails.temptokens_sub[i].bigSize = false;
          }
          else {
            this.streamDetails.temptokens_sub[i].bigSize = res.req.bigSize
          };
          i++;
        })
      }
      this.screen_view();
    })
    this.web.media_controls_all(res._id, res.Uid).subscribe((res: any) => {
      console.log(res, 11231234232)
      console.log(res)
      // alert("asda")
      if (res.req.allMedia) {
        this.pauseAll = true;
        this.pause_all()
      }
      else {
        this.pauseAll = false;
        this.pause_all()
      }
    })
  }
  get_user_participents(id: any) {
    this.agora.get_user_participents(id).subscribe((res: any) => {
      this.participents = res
    })
  }
  async start_call_now(res: any, channel: any) {
    this.stream.agoraServerEvents(this.stream.rtc);
    await this.stream.localUser(res.token, res.Uid, '', channel, res);
    this.toggle_controls();
  }
  end_stream() {
    this.agora.end_stream(this.streamDetails._id).subscribe((res: any) => {
      console.log(res);
      this.leave_host();
    })
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
    // window.history.back();
    window.location.href = "/livestream"
  }
  leave_subhost(item: any) {
    let data = {
      streamId: this.streamDetails._id,
      uid: item.Uid,
      tokenId: item._id
    }
    let index = this.streamDetails.temptokens_sub.findIndex((a: any) => a.Uid == item.Uid);
    if (index != -1) {
      this.streamDetails.temptokens_sub[index].mainhostLeave = !item.mainhostLeave
    }
    this.controlsView = 'setting';
    // 
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
  pauseAll: any = false;

  pause_all() {
    console.log(this.pauseAll)
    this.stream.pause_all(this.pauseAll);
    this.pauseAll = !this.pauseAll;
    this.playStatus_audio = true;
    this.playStatus_video = true;
    console.log(this.pauseAll)

  }
  openMenus: any = false;
  open_menus(type: any) {
    this.openMenus = type;
  }
  countDown: any;
  counter: any;
  playStatus_video: any = true;
  playStatus_audio: any = true;
  pause_play() {
    this.playStatus_video = !this.playStatus_video;
    this.stream.togglePlay(this.playStatus_video)
    // this.toggle_controls();
  }
  pause_play_audio() {
    this.playStatus_audio = !this.playStatus_audio;
    this.stream.togglePlay_audio(this.playStatus_audio)
    // this.toggle_controls();
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
    console.log({ channel: this.id, audio: this.playStatus_audio, video: this.playStatus_video })
    this.web.toggle_controls({ channel: this.id, audio: this.playStatus_audio, video: this.playStatus_video })
  }
  check_status(type: any, Uid: any) {
    if (this.streamDetails != null) {
      let index = this.streamDetails.temptokens_sub.findIndex((a: any) => a.Uid == Uid);
      if (index != -1) {
        if (type == 'video') {
          return this.streamDetails.temptokens_sub[index].video
        }
        if (type == 'audio') {
          return this.streamDetails.temptokens_sub[index].audio;

        }
        if (type == 'allMedia') {
          return this.streamDetails.temptokens_sub[index].allMedia
        }
      }
      else {
        return false;
      }
    }
    return false;
  }
  mute_video(item: any) {

    let data = {
      tokenId: this.tokenValues._id,
      userId: item.Uid,
      video: !item.video
    }
    let index = this.streamDetails.temptokens_sub.findIndex((a: any) => a.Uid == item.Uid);
    if (index != -1) {
      this.streamDetails.temptokens_sub[index].video = !item.video
    }
    this.web.host_controll_video(data)
  }
  mute_audio(item: any) {
    let data = {
      tokenId: this.tokenValues._id,
      userId: item.Uid,
      audio: !item.audio
    }
    let index = this.streamDetails.temptokens_sub.findIndex((a: any) => a.Uid == item.Uid);
    if (index != -1) {
      this.streamDetails.temptokens_sub[index].audio = !item.audio
    }
    this.web.host_controll_audio(data)
  }
  mute_all(item: any) {
    let data = {
      tokenId: this.tokenValues._id,
      userId: item.Uid,
      allMedia: !item.allMedia

    }
    let index = this.streamDetails.temptokens_sub.findIndex((a: any) => a.Uid == item.Uid);
    if (index != -1) {
      this.streamDetails.temptokens_sub[index].allMedia = !item.allMedia
      this.streamDetails.temptokens_sub[index].audio = true
      this.streamDetails.temptokens_sub[index].video = true
    }
    console.log(data)
    this.web.host_controll_all(data)
  }
  allow_subhost(item: any) {
    let data = {
      tokenId: this.tokenValues._id,
      userId: item.Uid,
      subhost: item._id,
    }
    this.web.allow_subhost(data)
    let index = this.streamDetails.temptokens_sub.findIndex((a: any) => a.Uid == item.Uid);
    if (index != -1) {
      this.streamDetails.temptokens_sub[index].mainhostLeave = !item.mainhostLeave
    }
    this.controlsView = this.subhost_view;
  }

  controlsView: any = 'me';
  chanage_coltrols(type: any) {
    this.controlsView = type
  }
  select_Subhost: any;
  subhost_view: any;
  choose_subhost(type: any, sub: any) {
    this.select_Subhost = sub;
    console.log(sub)
    if (!sub.mainhostLeave) {
      this.controlsView = type;
    }
    else {
      this.controlsView = 'allow';
      this.subhost_view = type;
    }
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
