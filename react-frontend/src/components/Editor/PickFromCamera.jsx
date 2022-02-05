import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from '../Editor/Editor.module.css';

const PickFromCamera = () =>{

    var video = document.querySelector('video')
    , canvas;

    /**
     *  generates a still frame image from the stream in the <video>
     *  appends the image to the <body>
     */
    function takeSnapshot() {
        var img = document.querySelector('img') || document.createElement('img');
        var context;
        var width = video.offsetWidth
          , height = video.offsetHeight;
        canvas = canvas || document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, width, height);
        img.src = canvas.toDataURL('image/png');
        document.body.appendChild(img);
      }

      if (navigator.mediaDevices) {
        // access the web cam
        navigator.mediaDevices.getUserMedia({video: true})
        // permission granted:
          .then(function(stream) {
            video.srcObject = stream;
            video.addEventListener('click', takeSnapshot);
          })
          // permission denied:
          .catch(function(error) {
            document.body.textContent = 'Could not access the camera. Error: ' + error.name;
          });
      }
    

    return(
        <div>
            <video autoPlay={true} muted></video>
        </div>
        )
}
export default PickFromCamera;