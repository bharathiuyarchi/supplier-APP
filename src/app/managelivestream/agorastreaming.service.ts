import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { BehaviorSubject } from 'rxjs';
import { Env } from '../environment';
import { IUser } from './models';

@Injectable({
  providedIn: 'root',
})
export class AgorastreamingService {
  constructor(public http: HttpClient) { }
  baseURL = Env.baseAPi;

  rtc: any = {
    client: AgoraRTC.createClient({ mode: 'rtc', codec: 'h264' }),

  };
  localAudioTrack: any;
  localVideoTrack: any;
  options = {
    appId: '1ba2592b16b74f3497e232e1b01f66b0',
    channel: 'test',
  };

  remoteUsers: IUser[] = [];
  updateUserInfo = new BehaviorSubject<any>(null);
  liveUsersList: any = [];

  agoraServerEvents(rtc: any) {
    rtc.client.on("user-published", async (user: any, mediaType: any) => {
      console.log(user, mediaType, 'user-published');
      let id = user.uid;
      let index = this.remoteUsers.findIndex((a: any) => a.uid == user.uid)
      if (index != -1) {
      }
      else {
        this.remoteUsers.push({ 'uid': +id, audio: user._audio_muted_, video: user._video_muted_ });
        this.updateUserInfo.next(id);

      }
      await rtc.client.subscribe(user, mediaType);
      if (mediaType === "video") {
        const remoteVideoTrack = user.videoTrack;
        setTimeout(() => {
          remoteVideoTrack.play('remote-playerlist' + user.uid);
        }, 500);
      }
      if (mediaType === "audio") {
        const remoteAudioTrack = user.audioTrack;
        remoteAudioTrack.play();
      }
      // alert(mediaType)
      let index_new = this.remoteUsers.findIndex((a: any) => a.uid == user.uid)
      if (index_new != -1) {
        this.remoteUsers[index].audio = user._audio_muted_;
        this.remoteUsers[index].video = user._video_muted_;
      }

    });
    rtc.client.on("user-left", (user: any) => {
      let index = this.remoteUsers.findIndex((a: any) => a.uid == user.uid)
      if (index != -1) {
        this.remoteUsers.splice(index, 1)
      }
    });
    rtc.client.on("user-info-updated", (uid: any, msg: any) => {
      let index = this.remoteUsers.findIndex((a: any) => a.uid == uid)
      if (index != -1) {
        if (msg == 'mute-audio') {
          this.remoteUsers[index].audio = true;
        }
        if (msg == 'mute-video') {
          this.remoteUsers[index].video = true;
        }
        if (msg == 'unmute-audio') {
          this.remoteUsers[index].audio = false;
        }
        if (msg == 'unmute-video') {
          this.remoteUsers[index].video = false;
        }
      }
    });

    rtc.client.on("user-joined", (user: any) => {

      console.log("user-joined", user, this.remoteUsers, 'event1');
    });
  }

  async localUser(token: any, uuid: any, type: any, channel: any) {
    console.log(this.rtc.client, 'asdasasdas')
    await this.rtc.client.join(this.options.appId, channel, token, uuid);
    if (type != 'live') {
      this.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      this.localVideoTrack = await AgoraRTC.createCameraVideoTrack({
        encoderConfig: '1080p_3',
      });

      this.localVideoTrack.play('local-player');
      await this.rtc.client.publish([this.localAudioTrack, this.localVideoTrack]);
    }
  }
  async leaveCall() {
    this.localAudioTrack.close();
    this.localVideoTrack.close();
    this.rtc.client.remoteUsers.forEach((user: any) => {
      const playerContainer = document.getElementById('remote-playerlist' + user.uid.toString());
      playerContainer && playerContainer.remove();
    });
    await this.rtc.client.leave();
    this.remoteUsers = [];
  }

  async pause_all(type: any) {
    this.localAudioTrack.setEnabled(type)
    this.localVideoTrack.setEnabled(type)
    this.audioPass = type;
    this.videoPass = type;

  }

  async switch_cam(deviceId: any) {
    const cams = await AgoraRTC.getCameras();
    console.log(cams)
    let active: any = cams.findIndex((a: any) => a.label == this.localVideoTrack._deviceName)
    if (deviceId != '') {
      active = cams.findIndex((a: any) => a.deviceId == deviceId.__zone_symbol__value)
    }
    let index = active;
    if (cams.length > active + 1 && active != cams.length) {
      index++;
    }
    else {
      index = 0;
    }
    this.localVideoTrack.setDevice(cams[index].deviceId);
    return cams[index].deviceId;
  }

  async togglePlay() {
    console.log(this.localVideoTrack.setEnabled(!this.videoPass))
    this.videoPass = !this.videoPass
  }

  audioPass: any = true
  videoPass: any = true
  async togglePlay_audio() {
    console.log(this.localAudioTrack.setEnabled(!this.audioPass))
    this.audioPass = !this.audioPass
  }


}
