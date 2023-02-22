import { Env } from './../../environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { managerequestservice } from '../managestream.module';
import { formatDate } from '@angular/common';
declare let $: any
@Component({
  selector: 'app-createrequest',
  templateUrl: './createrequest.component.html',
  styleUrls: ['./createrequest.component.css']
})
export class CreaterequestComponent implements OnInit {
  $event: any;
  baseURL: any = Env.baseAPi
  constructor(public api: managerequestservice, public router: Router, private route: ActivatedRoute) { }
  id: any;
  expire_date: any;
  now_date: any;
  ngOnInit(): void {
    this.get_posts();
    this.route.queryParams.subscribe((params: any) => {
      this.id = params.id;
      if (params.id != null) {

        this.get_requrement(this.id);
      }
      else {
        this.get_purchasePlans();

      }
    })
    this.now_date = formatDate(new Date(), 'yyyy-MM-dd', 'en-IN') + "T" + formatDate(new Date(), 'HH:mm', 'en-IN');
    console.log(this.now_date, 1271)


  }
  stepOne: any;
  myplans: any;
  get_purchasePlans() {
    this.api.get_purchasePlans().subscribe((res: any) => {
      console.log(res)
      this.myplans = res;
      if (res.length != 0) {
        this.postRequest.get("planId").setValue(res[0]._id)
        this.selectPlan = res[0];
        console.log(this.selectPlan, 298218)
        this.expire_date = formatDate(new Date(this.selectPlan.expireDate), 'yyyy-MM-dd', 'en-IN') + "T" + formatDate(new Date(this.selectPlan.expireDate), 'HH:mm', 'en-IN');
        // expire_date
        this.change_allot_stream()

      }
    })
  }

  change_allot_stream() {
    if (this.selectPlan.no_of_host == 1) {
      this.postRequest.get('allot_host_1')?.addValidators(Validators.required);
    } else {
      this.postRequest.get('allot_host_1')?.clearValidators();
    }
  }
  get_requrement(id: any) {
    this.api.get_one_request(id).subscribe((res: any) => {
      console.log(res)
      this.stepOne = res;
      this.selectPlan = res.purchasedplans
      this.postRequest.get('post').setErrors(null)
      this.postRequest.get('planId').setErrors(null)
      this.postRequest.patchValue({
        streamName: res.streamName,
        primarycommunication: res.primarycommunication,
        secondarycommunication: res.secondarycommunication,
        streamingDate: res.streamingDate,
        streamingTime: res.streamingTime,
        discription: res.discription,
        streamingDate_time: res.streamingDate_time,
        chat_need: res.chat_need,
        allot_host_1: res.allot_host_1,
        allot: res.allot,
        allot_chat: res.allot_chat
      })
      if (this.selectPlan.max_post_per_stream == res.post.length) {
        this.used_max_post = true;
      }
      this.change_allot_stream()
    })


  }
  postRequest: any = new FormGroup({
    post: new FormControl([], Validators.required),
    primarycommunication: new FormControl(null, Validators.required),
    secondarycommunication: new FormControl(null, Validators.required),
    streamingDate: new FormControl(null, Validators.required),
    streamingTime: new FormControl(null, Validators.required),
    discription: new FormControl(null, Validators.required),
    streamName: new FormControl(null, Validators.required),
    planId: new FormControl(null, Validators.required),
    streamingDate_time: new FormControl(null, Validators.required),
    chat_need: new FormControl('no', Validators.required),
    allot_chat: new FormControl('my self'),
    allot: new FormControl(null),
    allot_host_1: new FormControl('my self'),

  })
  selectPlan: any;
  removeImageshop() {
    this.selected_image = null;
    this.selected_image_view = null;
  }
  removevideohop() {
    this.selected_video = null;
    this.selected_video_view = null;
  }
  mouseover(classs: any) {
    $("." + classs).addClass('edit-image')
    $("." + classs + " label").text('Change')
  }
  mouseout(classs: any) {
    $("." + classs).removeClass('edit-image')
  }
  chat_need(event: any) {
    this.postRequest.get('allot_chat')?.setValue(null)
    let value = event.target.value;
    if (value == 'yes') {
      this.postRequest.get('allot_chat')?.addValidators(Validators.required);
    } else {
      this.postRequest.get('allot_chat')?.clearValidators();
    }

    console.log(this.postRequest.get('allot_chat')?.invalid)
    this.postRequest.get('allot_chat')?.setValue('my self')
  }
  allot_host_1(event: any) {
    let value = event.target.value;
    if (value == 'subhost') {
      this.postRequest.get('allot')?.setValue(false)
    }
    else {
      this.postRequest.get('allot')?.setValue(true)
    }
  }
  change_plan(event: any) {
    let id = event.target.value;
    let index = this.myplans.findIndex((e: any) => e._id == id);
    if (index != -1) {
      let max_post_per_stream = this.myplans[index].max_post_per_stream;
      this.selectPlan = this.myplans[index];
      if (this.postRequest.get('post')?.valid) {
        if (max_post_per_stream < this.postRequest.get('post')?.value.length) {
          this.postRequest.get('post').setValue([])
          $("input[type='checkbox']").prop('checked', false);

        }
        if (this.selectPlan.max_post_per_stream <= this.postRequest.get('post')?.value.length) {
          $("input[type='checkbox']").not(":checked").prop('disabled', true)
        }
        else {
          $("input[type='checkbox']").not(":checked").prop('disabled', false)
        }
      }
    }
    this.expire_date = formatDate(new Date(this.selectPlan.expireDate), 'yyyy-MM-dd', 'en-IN') + "T" + formatDate(new Date(this.selectPlan.expireDate), 'HH:mm', 'en-IN');
    this.postRequest.get('chat_need')?.setValue('no')
    this.change_allot_stream()


  }
  open_preview() {
    this.submited = true;
    console.log(this.postRequest.get('chat_need').valid)
    console.log(this.postRequest.get('allot_chat').valid)

    if (this.id == null) {
      if (this.postRequest.valid && this.selected_image != null && this.selected_image != 'invalid' && this.selected_video != null && this.selected_video != 'invalid') {
        this.submited = false;
        $("#preview-form").modal('show');
      }
    }
    else {
      this.create_stream_request()
    }
  }

  get_streamTitle(item: any) {
    let index = this.post_list.findIndex((val: any) => val._id == item);

    return this.post_list[index].productName;
  }

  getTime(item: any) {
    if (item != null) {
      item = item.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [item];
      if (item.length > 1) {
        item = item.slice(1);
        item[5] = +item[0] < 12 ? ' AM' : ' PM';
        item[0] = +item[0] % 12 || 12;
      }
      return item.join('');
    }
    return '';

  }
  create_stream_request() {
    this.submited = true;
    if (this.id == null) {
      if (this.postRequest.valid && this.selected_image != null && this.selected_image != 'invalid' && this.selected_video != null && this.selected_video != 'invalid') {
        this.submited = false;
        this.api.create_request_one(this.postRequest.value).subscribe((res: any) => {
          console.log(res)
          this.id = res._id;
          var image = new FormData();
          image.append('image', this.selected_image, this.selected_image['name']);
          this.api.create_request_one_image(image, res._id).subscribe((res: any) => {
            console.log(res, 'image')

          })
          var video = new FormData();
          video.append('teaser', this.selected_video, this.selected_video['name']);
          this.api.create_request_one_video(video, res._id).subscribe((res: any) => {
            console.log(res, 'video')
            $("#preview-form").modal('hide');
            this.router.navigateByUrl("/streamrequest")
          })
        })
      }
    }
    else {
      console.log(this.postRequest.valid)
      if (this.postRequest.valid && (this.selected_image != null && this.selected_image != 'invalid' && this.selected_video != null && this.selected_video != 'invalid' || this.id != null)) {
        let date = {
          addpost: this.postRequest.get('post')?.value,
          primarycommunication: this.postRequest.get('primarycommunication')?.value,
          secondarycommunication: this.postRequest.get('secondarycommunication')?.value,
          streamingDate: this.postRequest.get('streamingDate')?.value,
          streamingTime: this.postRequest.get('streamingTime')?.value,
          discription: this.postRequest.get('discription')?.value,
          streamName: this.postRequest.get('streamName')?.value,
          chat_need: this.postRequest.get('chat_need')?.value,
        }
        this.api.update_request_one(date, this.id).subscribe((res: any) => {
          this.router.navigateByUrl("/streamrequest")
        })
        if (this.selected_image != null) {
          var image = new FormData();
          image.append('image', this.selected_image, this.selected_image['name']);
          this.api.create_request_one_image(image, this.id).subscribe((res: any) => {
            console.log(res, 'image')
            this.router.navigateByUrl("/streamrequest")
          })
        }
        if (this.selected_video != null) {
          var video = new FormData();
          video.append('teaser', this.selected_video, this.selected_video['name']);
          this.api.create_request_one_video(video, this.id).subscribe((res: any) => {
            console.log(res, 'video')
            $("#preview-form").modal('hide');
            this.router.navigateByUrl("/streamrequest")
          })
        }
      }
    }
  }
  post_list: any;

  change_post(event: any) {
    let oldpost = this.id == null ? 0 : this.stepOne.post.length
    let post: any = [];
    if (this.postRequest.get('post')?.value != null) {
      post = this.postRequest.get('post')?.value;
    }
    let index = post.findIndex((a: any) => a == event.target.value)
    if (index != -1) {
      post.splice(index, 1)
    }
    else {
      if (this.selectPlan.max_post_per_stream <= (post.length + oldpost)) {
        $(event.target).prop('checked', false)
      }
      else {
        post.push(event.target.value);
      }
    }
    console.log(post)
    if (this.selectPlan.max_post_per_stream <= (post.length + oldpost)) {
      $("input[type='checkbox']").not(":checked").prop('disabled', true)
    }
    else {
      $("input[type='checkbox']").not(":checked").prop('disabled', false)
    }
    this.postRequest.get('post')?.setValue(post)
    // return false;
  }
  used_max_post: any = false;
  change_communication(event: any) {

    let post: any = [];
    if (this.postRequest.get('communicationMode')?.value != null) {
      post = this.postRequest.get('communicationMode')?.value;
    }
    let index = post.findIndex((a: any) => a == event.target.value)
    if (index != -1) {
      post.splice(index, 1)
    }
    else {
      post.push(event.target.value);
    }
    console.log(post)
    this.postRequest.get('communicationMode')?.setValue(post)
  }
  submited: any = false;
  delete_stream() {

  }
  get_posts() {
    this.api.get_all_post().subscribe((res: any) => {
      console.log(res)
      this.post_list = res;
    })
  }
  selected_image: any;
  selected_video: any;
  selected_image_view: any;
  selected_video_view: any;
  change_image(event: any) {
    console.log(event.target.files)
    this.selected_image = null;
    if (event.target.files.length != 0) {
      if (event.target.files[0].type == 'image/png' || event.target.files[0].type == 'image/jpg' || event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'image/webp') {
        this.selected_image = event.target.files[0];
        const filereader = new FileReader();
        filereader.onload = (e: any) => {
          this.selected_image_view = e.target.result;
        }
        filereader.readAsDataURL(this.selected_image);
      }
      else {
        this.selected_image = 'invalid';
      }

    }
  }
  change_video(event: any) {
    console.log(event.target.files)
    this.selected_video = null;
    if (event.target.files.length != 0) {
      if (event.target.files[0].type == 'video/mp4') {
        this.selected_video = event.target.files[0];
        const filereader = new FileReader();
        filereader.onload = (e: any) => {
          this.selected_video_view = e.target.result;
        }
        filereader.readAsDataURL(this.selected_video);
      }
      else {
        this.selected_video = 'invalid';
      }
    }
  }
  change_date() {
    // let data = this.postRequest.get('streamingDate')?.value
    // let time = this.postRequest.get('streamingTime').value;

    let streamingDate_time = this.postRequest.get('streamingDate_time').value;

    let date: any = new Date(streamingDate_time);
    let year: any = date.getFullYear();
    let month: any = date.getMonth() + 1;
    let dt: any = date.getDate();
    let hours: any = date.getHours();
    let minutes: any = date.getMinutes();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    this.postRequest.get('streamingDate')?.setValue(year + '-' + month + '-' + dt)
    this.postRequest.get('streamingTime')?.setValue(hours + ':' + minutes)
    console.log(this.postRequest?.value)
  }

  maxlengths(element: any, maxvalue: any) {
    var q = element.target.value.length + 1;
    if (q > maxvalue) {
      return false;
    }
    else {
      return true;
    }
  }

}
