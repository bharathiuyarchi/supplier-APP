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
    localAudioTrack: null,
    localVideoTrack: null,
  };
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
        // this.remoteUsers.splice(index, 1)
      }
      else {
        this.remoteUsers.push({ 'uid': +id });
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
    });
    rtc.client.on("user-unpublished", (user: any) => {
      // alert(user.uid)
      let index = this.remoteUsers.findIndex((a: any) => a.uid == user.uid)
      if (index != -1) {
        this.remoteUsers.splice(index, 1)
      }
    });


    rtc.client.on("user-joined", (user: any) => {
      // let id = user.uid;
      // console.log(user, 12312312312312)
      // let index = this.remoteUsers.findIndex((a: any) => a.uid == user.uid)
      // if (index != -1) {
      //   // this.remoteUsers.splice(index, 1)
      // }
      // else {
      //   this.remoteUsers.push({ 'uid': +id });
      //   this.updateUserInfo.next(id);

      // }
      console.log("user-joined", user, this.remoteUsers, 'event1');
    });
  }

  async localUser(token: any, uuid: any, type: any, channel: any) {
    console.log(this.rtc.client, 'asdasasdas')
    await this.rtc.client.join(this.options.appId, channel, token, uuid);
    if (type != 'live') {
      this.rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      this.rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack({
        encoderConfig: '1080p_3',
      });
      this.rtc.localVideoTrack.play('local-player');
      await this.rtc.client.publish([this.rtc.localAudioTrack, this.rtc.localVideoTrack]);
    }
  }

  pause_button() {
    this.rtc.localVideoTrack.setEnabled(false);
  }


  async leaveCall() {
    this.rtc.localAudioTrack.close();
    this.rtc.localVideoTrack.close();
    this.rtc.client.remoteUsers.forEach((user: any) => {
      const playerContainer = document.getElementById('remote-playerlist' + user.uid.toString());
      playerContainer && playerContainer.remove();
    });
    await this.rtc.client.leave();
    this.remoteUsers = [];
  }


  async switch_cam(deviceId: any) {
    const cams = await AgoraRTC.getCameras();
    console.log(cams)
    let active: any = cams.findIndex((a: any) => a.label == this.rtc.localVideoTrack._deviceName)
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
    this.rtc.localVideoTrack.setDevice(cams[index].deviceId);
    return cams[index].deviceId;
  }

  async togglePlay() {
    if (!this.rtc.localVideoTrack) {
      return;
    }
    console.log(await this.rtc.client)
    if (await this.rtc.client) {
      await this.rtc.client.unpublish([this.rtc.localVideoTrack]);
    }
  }
  async togglepause() {
    if (!this.rtc.localVideoTrack) {
      return;
    }
    console.log(await this.rtc.client)
    if (await this.rtc.client) {
      await this.rtc.client.publish([this.rtc.localVideoTrack]);
    }
  }
  async togglePlay_audio() {
    if (!this.rtc.localVideoTrack) {
      return;
    }
    console.log(await this.rtc.client)
    if (await this.rtc.client) {
      await this.rtc.client.unpublish([this.rtc.localAudioTrack]);
    }
  }
  async togglepause_audio() {
    if (!this.rtc.localVideoTrack) {
      return;
    }
    console.log(await this.rtc.client)
    if (await this.rtc.client) {
      await this.rtc.client.publish([this.rtc.localAudioTrack]);
    }
  }

}
