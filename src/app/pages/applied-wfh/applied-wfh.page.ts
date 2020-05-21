import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../core/api.service';

@Component({
  selector: 'app-applied-wfh',
  templateUrl: './applied-wfh.page.html',
  styleUrls: ['./applied-wfh.page.scss'],
})
export class AppliedWfhPage implements OnInit {

  notificationData: any;
  date = new Date();
  appliedWFH = [];

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.notificationData = [

      {
        "name": "Jake Beauliu",
        "comment": "added a new photo",
        "time": "2:00 am",
        "image": "../../assets/chat/user.jpeg",
      }, {
        "name": "Abubakar pagas",
        "comment": "also commented on your post",
        "time": "2:00 am",
        "image": "../../assets/chat/user1.jpeg",
      },
      {
        "name": "Lisa Tsjin",
        "comment": "and 10 others have birthday todays. Wish them the best!",
        "time": "2:00 am",
        "image": "../../assets/chat/user3.jpeg",
      },
      {
        "name": "Genalyn Arcojetas",
        "comment": "also commented on your post",
        "time": "2:00 am",
        "image": "../../assets/chat/user2.jpeg",
      },
      {
        "name": "Rehman Sazid",
        "comment": "also commented on your post",
        "time": "2:00 am",
        "image": "../../assets/chat/user4.jpeg",
      },


    ];

  }


}
