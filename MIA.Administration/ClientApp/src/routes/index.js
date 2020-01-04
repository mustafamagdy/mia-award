// routes
import FormElements from './forms';
import Users from './users';
import Icons from './icons';
import ImageCropper from './image-cropper';
import VideoPlayer from './video-player';
import News from './news';


// // async component
// import {
//    AsyncAboutUsComponent,
//    AsyncChatComponent,
//    AsyncMailComponent,
//    AsyncTodoComponent,
// } from 'Components/AsyncComponent/AsyncComponent';

export default [
   
   {
      path: 'icons',
      component: Icons
   },
   {
      path: 'users',
      component: Users
   },
   {
      path: 'forms',
      component: FormElements
   },
   {
      path: 'image-cropper',
      component: ImageCropper
   },
   {
      path: 'video-player',
      component: VideoPlayer
   },
   {
      path: 'news',
      component: News
   }
]