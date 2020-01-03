// routes
import FormElements from 'Routes/forms';
import Users from 'Routes/users';
import Icons from 'Routes/icons';
import ImageCropper from 'Routes/image-cropper';
import VideoPlayer from 'Routes/video-player';
import News from 'Routes/news';


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