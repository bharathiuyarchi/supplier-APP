import { Router, ActivatedRoute } from '@angular/router';
import {  Validators, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { managepostsservice } from '../manageplans.module';
import { Env } from 'src/app/environment';
declare let $: any;
@Component({
  selector: 'app-createposts',
  templateUrl: './createposts.component.html',
  styleUrls: ['./createposts.component.css']
})
export default class CreatepostsComponent implements OnInit {
  baseURL = Env.baseAPi;

  constructor(public api: managepostsservice, public router: Router, public route: ActivatedRoute) { }
  id: any;
  ngOnInit(): void {
    this.cet_category();
    this.route.queryParams.subscribe((params: any) => {
      this.id = params.id;
      if (this.id != null) {
        this.getpostDetails(this.id);
      }
    })
  }
  submited: any = false
  create_post() {
    this.submited = true;
    console.log(this.postForm.valid)
    if (this.postForm.valid && (this.selected_image.length != 0 && this.selected_video != null || this.id != null)) {
      let formData :any= new FormData();
      formData.append("productId", this.postForm.get("productId")?.value)
      formData.append("categoryId", this.postForm.get("categoryId")?.value)
      formData.append("quantity", this.postForm.get("quantity")?.value)
      formData.append("marketPlace", this.postForm.get("marketPlace")?.value)
      formData.append("offerPrice", this.postForm.get("offerPrice")?.value)
      formData.append("bookingAmount", this.postForm.get("bookingAmount")?.value)

      if (this.postForm.get("postLiveStreamingPirce")?.value != null) {
        formData.append("postLiveStreamingPirce", this.postForm.get("postLiveStreamingPirce")?.value)
      }
      formData.append("minLots", this.postForm.get("minLots")?.value)
      formData.append("incrementalLots", this.postForm.get("incrementalLots")?.value)
      formData.append("discription", this.postForm.get("discription")?.value)
      formData.append("location", this.postForm.get("location")?.value)
      formData.append("afterStreaming", this.postForm.get("afterStreaming")?.value)
      // formData.append("", this.postForm.get("location")?.value)
      const files: Array<File> = this.selected_image;
      for (let i = 0; i < files.length; i++) {
        formData.append("galleryImages", files[i], files[i]['name']);
      }
      if (this.id == null) {
        this.api.create_post(formData).subscribe((res: any) => {
          let video = new FormData();
          video.append("teaser", this.selected_video);
          this.api.create_post_teaser(video, res._id).subscribe((res: any) => {
            console.log(res)
            this.router.navigateByUrl("/manage-post")
          })
        })
      }
      else {
        this.api.update_one_post(this.id, formData).subscribe((res: any) => {
          if (this.selected_video != null) {
            let video = new FormData();
            video.append("teaser", this.selected_video);
            this.api.create_post_teaser(video, res._id).subscribe((res: any) => {
              console.log(res)
              this.router.navigateByUrl("/manage-post")
            })
          } else {
            this.router.navigateByUrl("/manage-post")

          }
        })
      }
    }
  }

  mouseover(classs: any) {
    $("." + classs).addClass('edit-image')
    $("." + classs + " label").text('Change')
  }
  mouseout(classs: any) {
    $("." + classs).removeClass('edit-image')
  }
  selected_image: any = [];
  selected_image_view: any = [];
  selected_video_view: any;
  selected_video: any;
  maxlimit: any = false;
  change_image(event: any) {
    console.log(event.target.files)
    if (event.target.files.length > 5) {
      this.maxlimit = true;
    }
    else {
      this.maxlimit = false;
    }
    this.selected_image = [];
    if (event.target.files.length != 0 && !this.maxlimit) {
      var filesAmount = event.target.files.length;
      let element: any = event.target.files;
      for (let i = 0; i < filesAmount; i++) {
        if (element[i].type == 'image/png' || element[i].type == 'image/jpg' || element[i].type == 'image/jpeg' || element[i].type == 'image/webp') {
          this.selected_image.push(element[i]);
          const filereader = new FileReader();
          filereader.onload = (e: any) => {
            this.selected_image_view.push(e.target.result);
          }
          filereader.readAsDataURL(element[i]);
        }
        else {
          this.selected_image = [];
        }
      }
    }

  }

  removeImageshop(url: any, index: any) {
    this.selected_image.splice(index, 1)
    this.selected_image_view = this.selected_image_view.filter((img: any) => (img != url));
    if (this.selected_image_view.length == 0) {
      this.selected_image = []
    }
    console.log(this.selected_image)
  }
  remove_video() {
    this.selected_video = null;
    this.selected_video_view = null;
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
  oldDetails: any;
  getpostDetails(id: any) {
    this.api.get_one_post(id).subscribe((res: any) => {
      this.get_products(res.categoryId);
      this.oldDetails = res;
      this.postForm.patchValue({
        productId: res.productId,
        categoryId: res.categoryId,
        quantity: res.quantity,
        marketPlace: res.marketPlace,
        offerPrice: res.offerPrice,
        postLiveStreamingPirce: res.postLiveStreamingPirce,
        minLots: res.minLots,
        incrementalLots: res.incrementalLots,
        location: res.location,
        discription: res.discription,
        afterStreaming: res.afterStreaming,
        bookingAmount: res.bookingAmount
      })
      if (this.postForm.get('afterStreaming')?.value == 'yes') {
        this.postForm.get('postLiveStreamingPirce')?.setErrors({ incorrect: true });
      } else {
        this.postForm.get('postLiveStreamingPirce')?.setErrors(null);
      }
    })
  }
  category_list: any;
  cet_category() {
    this.api.get_categorys().subscribe((res: any) => {
      console.log(res);
      this.category_list = res;
    })

  }
  change_cate(event: any) {
    this.get_products(event.target.value)

  }
  productList: any;
  get_products(id: any) {
    this.api.get_product_by_cat(id).subscribe((res: any) => {
      this.productList = res;
      console.log(res);

    })
  }

  postForm :any= new FormGroup({
    productId: new FormControl(null, Validators.required),
    categoryId: new FormControl(null, Validators.required),
    quantity: new FormControl(null, Validators.required),
    marketPlace: new FormControl(null, Validators.required),
    offerPrice: new FormControl(null, Validators.required),
    postLiveStreamingPirce: new FormControl(null, Validators.required),
    minLots: new FormControl(null, Validators.required),
    incrementalLots: new FormControl(null, Validators.required),
    discription: new FormControl(null, Validators.required),
    location: new FormControl(null, Validators.required),
    afterStreaming: new FormControl(null, Validators.required),
    bookingAmount: new FormControl(null, Validators.required),
  })
  afterStreaming(event: any) {
    let value = event.target.value;
    this.postForm.get('postLiveStreamingPirce')?.setValue(null)
    if (value == 'yes') {
      this.postForm.get('postLiveStreamingPirce')?.setErrors({ incorrect: true });
    } else {
      this.postForm.get('postLiveStreamingPirce')?.setErrors(null);
    }
  }
  delete_post() {
    this.api.delete_one_post(this.id).subscribe((res: any) => {
      this.router.navigateByUrl("/manage-post")
    });
  }

  maxlengths(element: any, maxvalue: any) {
    var q = element.target.value.length + 1;
    if (q > maxvalue) {
      var r = q - maxvalue;
      // alert("Sorry, you have input " + q + " words into the " +
      //   "text area box you just completed. It can return no more than " +
      //   maxvalue + " words to be processed. Please abbreviate " +
      //   "your text by at least " + r + " words");
      return false;
    }
    else {
      return true;
    }
  }
}
